// src/app/api/stripe/webhook/route.ts

import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { saveDonationToFirebase } from '@/lib/firebaseDonations';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    console.log('📥 Stripe webhook triggered');
    console.log('📦 Event type:', event.type);

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const md = intent.metadata;
      console.log('🧾 Metadata received:', md);

      if (md?.formType === 'donation') {
        console.log('✅ Saving donation to Firestore...');
        await saveDonationToFirebase({
          name: md.donor_name || 'Anonymous',
          email: md.donor_email || '',
          amount: Number(md.amount_gbp || 0),
          campaign: md.campaign || 'General',
          cause: md.item_title || 'Donation',
          isAnonymous: md.is_anonymous === 'true',
          dahiraCity: md.dahira_city || '',
          childrenUnder16: Number(md.children_under_16 || 0),
          createdByStripe: true,
        });
      } else {
        console.log('⚠️ Not a donation formType — skipping.');
      }
    }

    return new Response('Webhook received successfully.', { status: 200 });
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }
}