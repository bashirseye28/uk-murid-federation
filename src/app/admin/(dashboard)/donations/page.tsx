//admin/donations/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportToCSV } from "@/lib/exportToCSV";
import {
  Download,
  Filter,
  Trash2,
  BarChart3,
  CalendarRange,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { format } from "date-fns";

interface Donation {
  donor_name: string;
  donor_email: string;
  campaign: string;
  item_title: string;
  amount_gbp: string;
  donation_date: string;
  dahira_city?: string;
  is_anonymous?: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [search, setSearch] = useState("");
  const [anonymousOnly, setAnonymousOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const perPage = 20;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid response format");
        }
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("❌ Failed to fetch donations:", err);
      }
    };

    fetchDonations();
  }, []);

  const filtered = donations.filter((d) => {
    const matchesSearch = [
      d.donor_name,
      d.donor_email,
      d.campaign,
      d.item_title,
    ].some((v) => v.toLowerCase().includes(search.toLowerCase()));

    const isAnon = anonymousOnly ? d.is_anonymous : true;

    const donationDate = new Date(d.donation_date);
    const isInRange =
      (!startDate || new Date(startDate) <= donationDate) &&
      (!endDate || donationDate <= new Date(endDate));

    return matchesSearch && isAnon && isInRange;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const chartData = filtered.reduce(
    (acc, d) => {
      const date = d.donation_date;
      const existing = acc.find((item) => item.date === date);
      const amount = parseFloat(d.amount_gbp);
      if (existing) {
        existing.amount += amount;
      } else {
        acc.push({ date, amount });
      }
      return acc;
    },
    [] as { date: string; amount: number }[]
  );

  const campaignTotals = filtered.reduce(
    (acc, d) => {
      const amount = parseFloat(d.amount_gbp);
      acc[d.campaign] = (acc[d.campaign] || 0) + amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleDelete = async (donation: Donation) => {
    if (!confirm("Are you sure you want to delete this donation?")) return;

    try {
      const res = await fetch("/api/donations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: donation.donor_email,
          date: donation.donation_date,
          amount: donation.amount_gbp,
        }),
      });

      if (res.ok) {
        setDonations((prev) =>
          prev.filter(
            (d) =>
              !(
                d.donor_email === donation.donor_email &&
                d.donation_date === donation.donation_date &&
                d.amount_gbp === donation.amount_gbp
              )
          )
        );
      } else {
        alert("Failed to delete donation.");
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting donation.");
    }
  };

  const handleExport = () => {
    const csvData = filtered.map((d) => ({
      donor_name: d.donor_name,
      donor_email: d.donor_email,
      phone: "",
      dahira_city: d.dahira_city || "",
      donation_date: d.donation_date,
      campaign: d.campaign,
      item_title: d.item_title,
      amount_gbp: d.amount_gbp,
      is_anonymous: d.is_anonymous ?? false,
    }));

    exportToCSV({ filename: "donations.csv", data: csvData });
  };

  return (
    <section className="space-y-8 pt-10">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-mourid-green">
            Donations Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Filter, analyse and export donations history.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <Input
            placeholder="Search by name, email, campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-[220px]"
          />
          <Button
            variant={anonymousOnly ? "default" : "outline"}
            onClick={() => setAnonymousOnly(!anonymousOnly)}
            className="gap-2"
          >
            <Filter size={16} /> Anonymous
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="max-w-[200px]"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="max-w-[200px]"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-72 bg-white p-4 border rounded-xl shadow">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <BarChart3 size={16} /> Donations Over Time
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-72 bg-white p-4 border rounded-xl shadow">
          <h2 className="text-sm font-semibold flex items-center gap-2 mb-2">
            <CalendarRange size={16} /> Totals by Campaign
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={Object.entries(campaignTotals).map(([name, total]) => ({
                name,
                total,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-auto border rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50 text-slate-600 border-b">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Dahira / City</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>{d.donor_name}</TableCell>
                  <TableCell>{d.donor_email}</TableCell>
                  <TableCell>{d.campaign}</TableCell>
                  <TableCell>{d.item_title}</TableCell>
                  <TableCell>{d.dahira_city || '-'}</TableCell>
                  <TableCell className="text-mourid-green font-semibold">
                    £{d.amount_gbp}
                  </TableCell>
                  <TableCell>
                    {format(new Date(d.donation_date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100"
                      onClick={() => handleDelete(d)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-slate-500">
                  No donations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className="w-10 p-0"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}