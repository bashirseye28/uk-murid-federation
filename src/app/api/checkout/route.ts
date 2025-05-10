// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ✅ Initialize Stripe (reads API version from your Stripe Dashboard)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { itemName, amount, donor } = await req.json();

    if (!itemName || !amount || !donor) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const metadata: Record<string, string> = {
      donor_name: donor.isAnonymous ? 'Anonymous' : donor.name,
      donor_email: donor.email,
    };

    if (donor.phone) {
      metadata.donor_phone = donor.phone;
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: donor.isAnonymous
        ? 'anonymous@mouride.uk'
        : donor.email, // ✅ Pre-fill email on checkout

      payment_intent_data: {
        metadata,
      },

      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: itemName },
            unit_amount: amount * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe session creation failed:', err);
    return NextResponse.json(
      { error: 'Stripe session creation failed.' },
      { status: 500 }
    );
  }
}