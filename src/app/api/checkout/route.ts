// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// ✅ Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming checkout request:', body);

    const { itemName, amount, donor } = body;

    // ✅ RELAXED validation: only require email if NOT anonymous
    if (
      !itemName ||
      !donor ||
      typeof itemName !== 'string' ||
      typeof donor.isAnonymous === 'undefined' ||  // ✅ must have this flag
      (!donor.isAnonymous && !donor.email) ||      // ✅ require email only if NOT anonymous
      (typeof amount !== 'number' && isNaN(Number(amount)))
    ) {
      console.error('❌ Missing or invalid required fields:', { itemName, amount, donor });
      return NextResponse.json(
        { error: 'Missing or invalid required fields.' },
        { status: 400 }
      );
    }

    // ✅ Prepare metadata (ALWAYS include donation_cause)
    const donorName = donor.isAnonymous ? 'Anonymous' : donor.name || 'N/A';
    const donorEmail = donor.isAnonymous ? 'donation@anonymous.com' : donor.email;
    const donorPhone = donor.phone || 'N/A';

    const metadata: Record<string, string> = {
      donor_name: donorName,
      donor_email: donorEmail,
      donor_phone: donorPhone,
      donation_cause: itemName,
    };

    // ✅ Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: donorEmail,  // ✅ always use the right email here

      payment_intent_data: {
        metadata,
      },

      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: itemName },
            unit_amount: Math.round(Number(amount) * 100),  // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url: `${req.headers.get('origin')}/success?donor_name=${encodeURIComponent(
        donorName
      )}&donor_email=${encodeURIComponent(
        donorEmail
      )}&donor_phone=${encodeURIComponent(
        donorPhone
      )}&cause=${encodeURIComponent(itemName)}&amount=${encodeURIComponent(amount)}`,

      cancel_url: `${req.headers.get('origin')}/cancel`,
    });

    console.log('✅ Stripe session created:', session.id);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('❌ Stripe session creation failed:', err.message || err);
    return NextResponse.json(
      { error: 'Stripe session creation failed.' },
      { status: 500 }
    );
  }
}