// lib/stripe.ts

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// 🔹 Helper to filter only donations
const isDonation = (metadata: Stripe.Metadata | null): boolean =>
  metadata?.formType === 'donation';

// 🔹 Parse metadata into consistent shape
const parseDonation = (charge: Stripe.Charge) => {
  const md = charge.metadata;
  return {
    name: md?.donor_name || 'Anonymous',
    email: md?.donor_email || '',
    campaign: md?.campaign || 'Unknown',
    amount: parseFloat(md?.amount_gbp || '0'),
    date: charge.created ? new Date(charge.created * 1000).toISOString() : '',
  };
};

// ✅ 1. Fetch Recent Donations (limit N)
export async function getRecentDonations(limit: number = 10) {
  const charges = await stripe.charges.list({
    limit: 100,
    expand: ['data.customer'],
  });

  const donations = charges.data
    .filter((charge) => isDonation(charge.metadata))
    .map(parseDonation)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return donations.slice(0, limit);
}

// ✅ 2. Aggregate Totals & Donor Count
export async function getDonationStats() {
  const charges = await stripe.charges.list({
    limit: 100,
  });

  const now = new Date();
  const thisYear = now.getFullYear();

  const donations = charges.data
    .filter((charge) => isDonation(charge.metadata))
    .map(parseDonation);

  let totalAllTime = 0;
  let totalThisYear = 0;
  const donorEmails = new Set<string>();

  for (const donation of donations) {
    totalAllTime += donation.amount;

    const donationYear = new Date(donation.date).getFullYear();
    if (donationYear === thisYear) {
      totalThisYear += donation.amount;
    }

    if (donation.email) {
      donorEmails.add(donation.email.toLowerCase());
    }
  }

  return {
    totalAllTime: Math.round(totalAllTime),
    totalThisYear: Math.round(totalThisYear),
    donorCount: donorEmails.size,
  };
}