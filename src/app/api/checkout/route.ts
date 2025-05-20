// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // stable API version
});

type CheckoutBody = {
  item: { id: number; title: string; price: number; campaign: string };
  donor: { name?: string; email: string; phone?: string; isAnonymous: boolean };
};

export async function POST(req: NextRequest) {
  try {
    /* 1️⃣ parse & validate ------------------------------------------------ */
    const { item, donor } = (await req.json()) as CheckoutBody;

    if (
      !item?.title ||
      !(item?.price > 0) ||
      donor?.isAnonymous === undefined ||
      !donor.email?.trim() // require email for all donors
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid fields.' },
        { status: 400 }
      );
    }

    /* 2️⃣ build metadata -------------------------------------------------- */
    const donorName  = donor.isAnonymous ? 'Anonymous' : donor.name?.trim() || 'N/A';
    const donorEmail = donor.email.trim();
    const donorPhone = donor.phone?.trim() || '';

    // Format current date as DD/MM/YYYY
    const now = new Date();
    const donationDate = `${String(now.getDate()).padStart(2, '0')}/${
      String(now.getMonth() + 1).padStart(2, '0')
    }/${now.getFullYear()}`;

    const metadata = {
      donor_name: donorName,
      donor_email: donorEmail,
      donor_phone: donorPhone,
      is_anonymous: donor.isAnonymous ? 'true' : 'false',
      item_id: String(item.id),
      item_title: item.title,
      campaign: item.campaign,
      amount_gbp: String(item.price),
      donation_date: donationDate, // e.g. "20/05/2025"
    };

    /* 3️⃣ create Checkout Session ---------------------------------------- */
    const origin = req.headers.get('origin') ?? req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: donorEmail,
      payment_intent_data: { metadata },

      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: item.title },
            unit_amount: Math.round(item.price * 100), // convert £ → pence
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Stripe session creation failed.' },
      { status: 500 }
    );
  }
}