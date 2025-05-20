// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { generateReceiptPDF } from '@/lib/receipt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  // 1️⃣ Retrieve Stripe signature header
  const sig = req.headers.get('stripe-signature')!;
  // 2️⃣ Read the raw request body as a Buffer
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  let event: Stripe.Event;
  try {
    // 3️⃣ Verify the signature against the raw payload
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature mismatch', err);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  // Only handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Guard: skip if no payment_intent
    const piId = session.payment_intent as string | undefined;
    if (!piId) {
      console.log('⚠️ No payment_intent on session, skipping.');
      return NextResponse.json({ received: true });
    }

    // Retrieve PaymentIntent for metadata
    const pi = await stripe.paymentIntents.retrieve(piId);
    const meta = pi.metadata;

    // Guard: skip if no customer email
    const email = session.customer_details?.email;
    if (!email) {
      console.log('⚠️ No customer email on session, skipping email send.');
      return NextResponse.json({ received: true });
    }

    // Generate the PDF receipt
    const pdfBuffer = await generateReceiptPDF({
      donorName:  meta.donor_name  || 'Anonymous',
      donorEmail: email,
      donorPhone: meta.donor_phone || '',
      cause:      meta.item_title  || meta.campaign || 'Donation',
      amount:     ((session.amount_total ?? 0) / 100).toFixed(2),
      date:       meta.donation_date || new Date().toLocaleDateString('en-GB'),
    });

    // Send email via Resend with correct attachment keys
    await resend.emails.send({
      from:    'no-reply@ukmouride.co.uk',
      to:      email,
      subject: 'Your Donation Receipt from UK Murid Federation',
      text: `
Assalamu alaikum,

JazakAllah khair for your generous donation of £${((session.amount_total ?? 0) / 100).toFixed(2)} towards ${meta.item_title}.

Please find your official receipt attached.

UK Murid Federation
      `.trim(),
      attachments: [
        {
          filename:    'donation-receipt.pdf',       // correct key
          contentType: 'application/pdf',            // MIME type
          content:     pdfBuffer.toString('base64'), // base64 payload
        },
      ],
    });
  }

  // Acknowledge receipt of the webhook
  return NextResponse.json({ received: true });
}