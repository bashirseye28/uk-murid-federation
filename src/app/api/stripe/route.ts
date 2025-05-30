// import { NextRequest } from 'next/server';
// import Stripe from 'stripe';
// import { buffer } from 'micro';
// import { saveDonationToFirebase } from '@/lib/firebaseDonations';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-04-30.basil',
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: NextRequest) {
//   try {
//     const rawBody = await req.text(); // App Router uses req.text(), not buffer()
//     const sig = req.headers.get('stripe-signature')!;

//     const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);

//     if (event.type === 'payment_intent.succeeded') {
//       const intent = event.data.object as Stripe.PaymentIntent;
//       const md = intent.metadata;

//       if (md?.formType === 'donation') {
//         await saveDonationToFirebase({
//           name: md.donor_name || 'Anonymous',
//           email: md.donor_email || '',
//           amount: Number(md.amount_gbp || 0),
//           campaign: md.campaign || 'Unknown',
//           cause: md.item_title || 'Donation',
//           isAnonymous: md.is_anonymous === 'true',
//           dahiraCity: md.dahira_city,
//           childrenUnder16: Number(md.children_under_16 || 0),
//           createdByStripe: true,
//         });
//       }
//     }

//     return new Response('Webhook received', { status: 200 });
//   } catch (err: any) {
//     console.error('Webhook error:', err.message);
//     return new Response(`Webhook error: ${err.message}`, { status: 400 });
//   }
// }