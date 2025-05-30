import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import SuccessPage from './SuccessPage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export default async function Success({ searchParams }: { searchParams: { session_id?: string } }) {
  const rawSessionId = searchParams?.session_id;
  const sessionId =
    typeof rawSessionId === 'string'
      ? rawSessionId
      : Array.isArray(rawSessionId)
      ? rawSessionId[0]
      : null;

  if (!sessionId) return redirect('/donate');

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  });

  const pi = session.payment_intent as Stripe.PaymentIntent;
  if (!pi) return redirect('/donate');

  const meta = pi.metadata;
  const donorName = meta.donor_name || 'Anonymous';
  const donorEmail = session.customer_details?.email || meta.donor_email || 'Not Provided';
  const donorPhone = meta.donor_phone || 'Not Provided';
  const cause = meta.item_title || meta.campaign || 'General Donation';
  const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
  const date = meta.donation_date || new Date(pi.created * 1000).toLocaleDateString('en-GB');
  const referenceId = pi.id;
  const childrenUnder16 = meta.children_under_16 ? parseInt(meta.children_under_16) : undefined;

  return (
    <SuccessPage
      donorName={donorName}
      donorEmail={donorEmail}
      donorPhone={donorPhone}
      cause={cause}
      amount={amount}
      date={date}
      referenceId={referenceId}
      childrenUnder16={childrenUnder16}
    />
  );
}