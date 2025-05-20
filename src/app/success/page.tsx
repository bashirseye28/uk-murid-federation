// app/donate/success/page.tsx
import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import SuccessPage from './SuccessPage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  if (!sessionId) {
    redirect('/donate');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId as string, {
    expand: ['payment_intent'],
  });

  const pi = session.payment_intent as Stripe.PaymentIntent;
  const meta = pi.metadata;

  const donorName  = meta.donor_name  || 'Anonymous';
  const donorEmail = session.customer_details?.email || meta.donor_email || '';
  const donorPhone = meta.donor_phone  || 'N/A';
  const cause      = meta.item_title   || meta.campaign    || 'Donation';
  const amount     = ((session.amount_total ?? 0) / 100).toFixed(2);
  const date       = meta.donation_date || new Date().toLocaleDateString('en-GB');

  return (
    <SuccessPage
      donorName={donorName}
      donorEmail={donorEmail}
      donorPhone={donorPhone}
      cause={cause}
      amount={amount}
      date={date}
    />
  );
}