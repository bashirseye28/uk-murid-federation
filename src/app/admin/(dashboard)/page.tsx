'use client';

import {
  Banknote,
  Users,
  CalendarCheck,
  ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const metrics = [
  {
    label: 'Total Donations',
    value: '£12,450',
    icon: <Banknote className="w-6 h-6 text-mourid-green" />,
  },
  {
    label: 'Total Donors',
    value: '178',
    icon: <Users className="w-6 h-6 text-mourid-green" />,
  },
  {
    label: 'Current Campaign',
    value: 'Bamba Day 2025',
    icon: <CalendarCheck className="w-6 h-6 text-mourid-green" />,
  },
  {
    label: 'Gallery Items',
    value: '87 Media Entries',
    icon: <ImageIcon className="w-6 h-6 text-mourid-green" />,
  },
  {
    label: 'Active Admins',
    value: '3',
    icon: <ShieldCheck className="w-6 h-6 text-mourid-green" />,
  },
];

const recent = [
  {
    name: 'Awa Diop',
    email: 'awa@example.com',
    amount: '£100',
    cause: 'Logistics',
    date: '27 May 2025',
  },
  {
    name: 'Anonymous',
    email: 'n/a',
    amount: '£30',
    cause: 'Carte Barkeelu',
    date: '26 May 2025',
  },
  {
    name: 'Pape Ndiaye',
    email: 'pape@example.com',
    amount: '£50',
    cause: 'Water Project',
    date: '25 May 2025',
  },
];

export default function AdminDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-mourid-green">Admin Dashboard</h1>
        <p className="text-sm text-slate-600">
          Welcome! Manage donations, gallery, and monitor UK Murid Federation activities.
        </p>
      </header>

      {/* Metric Cards */}
      <section aria-labelledby="dashboard-metrics">
        <h2 id="dashboard-metrics" className="sr-only">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {metrics.map((item, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-100 hover:shadow-md transition rounded-2xl"
            >
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

      {/* Recent Donations */}
      <section aria-labelledby="recent-donations">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 id="recent-donations" className="text-lg font-semibold text-mourid-green">
              Recent Donations
            </h2>
            <a href="/admin/donations" className="text-sm text-blue-600 hover:underline">
              View All
            </a>
          </div>

          <div className="overflow-auto rounded-lg shadow-sm bg-white border">
            <table className="min-w-full text-sm text-left">
              <caption className="sr-only">Recent donation entries</caption>
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
                    <td className="px-4 py-3 font-medium text-slate-800">{donation.name}</td>
                    <td className="px-4 py-3 text-slate-600 truncate">{donation.email}</td>
                    <td className="px-4 py-3 text-mourid-green font-semibold">{donation.amount}</td>
                    <td className="px-4 py-3">{donation.cause}</td>
                    <td className="px-4 py-3">{donation.date}</td>
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