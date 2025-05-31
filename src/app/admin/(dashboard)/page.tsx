'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Banknote,
  Users,
  CalendarCheck,
  ImageIcon,
  ShieldCheck,
  ListOrdered,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Donation {
  donor_name: string;
  donor_email: string;
  amount_gbp: string;
  item_title: string;
  campaign: string;
  donation_date: string;
}

export default function AdminDashboardPage() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/donations');
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();
        setDonations(data);
      } catch (error) {
        console.error('❌ Error loading donations:', error);
      }
    };

    fetchData();
  }, []);

  const totalDonations = donations.reduce(
    (sum, d) => sum + parseFloat(d.amount_gbp),
    0
  ).toFixed(2);

  const uniqueDonors = new Set(donations.map(d => d.donor_email)).size;
  const totalEntries = donations.length;

  const currentCampaign = donations.length
    ? [...donations]
        .sort(
          (a, b) =>
            new Date(b.donation_date).getTime() -
            new Date(a.donation_date).getTime()
        )[0].campaign
    : '—';

  const recent = [...donations]
    .sort(
      (a, b) =>
        new Date(b.donation_date).getTime() -
        new Date(a.donation_date).getTime()
    )
    .slice(0, 5);

  const metrics = [
    {
      label: 'Total Donations',
      value: `£${totalDonations}`,
      icon: <Banknote className="w-7 h-4 text-mourid-green" />,
    },
    {
      label: 'Total Donors',
      value: uniqueDonors.toString(),
      icon: <Users className="w-7 h-4 text-mourid-green" />,
    },
    {
      label: 'Total Entries',
      value: totalEntries.toString(),
      icon: <ListOrdered className="w-7 h-4 text-mourid-green" />,
    },
    {
      label: 'Current Campaign',
      value: currentCampaign,
      icon: <CalendarCheck className="w-7 h-4 text-mourid-green" />,
    },
    {
      label: 'Gallery Items',
      value: '—',
      icon: <ImageIcon className="w-7 h-4 text-mourid-green" />,
    },

  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-mourid-green">Admin Dashboard</h1>
        <p className="text-sm text-slate-600">
          Welcome! Manage donations, gallery, and monitor UK Murid Federation activities.
        </p>
      </header>

      <section aria-labelledby="dashboard-metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {metrics.map((item, index) => (
            <Card key={index} className="bg-white border hover:shadow-md rounded-2xl">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <h3 className="text-xl font-semibold text-mourid-green mt-1">{item.value}</h3>
                </div>
                {item.icon}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-mourid-green">Recent Donations</h2>
            <a href="/admin/donations" className="text-sm text-blue-600 hover:underline">
              View All
            </a>
          </div>

          <div className="overflow-auto rounded-lg shadow-sm bg-white border">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b text-slate-600 font-semibold">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Cause</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((donation, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-slate-800">{donation.donor_name}</td>
                    <td className="px-4 py-3 text-slate-600 truncate">{donation.donor_email}</td>
                    <td className="px-4 py-3 text-mourid-green font-semibold">
                      £{donation.amount_gbp}
                    </td>
                    <td className="px-4 py-3">{donation.item_title}</td>
                    <td className="px-4 py-3">
                      {format(new Date(donation.donation_date), 'dd MMM yyyy')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}