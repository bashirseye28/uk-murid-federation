"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import jsPDF from "jspdf";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<{
    donorName: string;
    donorEmail: string;
    cause: string;
    amount: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    // Simulate fetching session data (replace with your real data logic)
    const donorName = searchParams.get("donor_name") || "Anonymous";
    const donorEmail =
      searchParams.get("donor_email") || "anonymous@murid.uk";
    const cause = searchParams.get("cause") || "General Donation";
    const amount = searchParams.get("amount") || "10.00";
    const date = format(new Date(), "PPPpp");

    setDonationDetails({ donorName, donorEmail, cause, amount, date });
  }, [searchParams]);

  const handleDownload = () => {
    if (!donationDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Donation Receipt", 20, 30);

    doc.setFontSize(12);
    doc.text("UK Murid Federation", 20, 45);
    doc.text("Company Number: 12345678", 20, 52);
    doc.text("Email: mouride.uk@gmail.com", 20, 59);
    doc.text("Website: https://ukmurid.org", 20, 66);

    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    doc.text(`Donor Name: ${donationDetails.donorName}`, 20, 85);
    doc.text(`Email: ${donationDetails.donorEmail}`, 20, 92);
    doc.text(`Donation Cause: ${donationDetails.cause}`, 20, 99);
    doc.text(`Amount: £${donationDetails.amount}`, 20, 106);
    doc.text(`Date: ${donationDetails.date}`, 20, 113);

    doc.setFontSize(10);
    doc.text(
      "May Allah reward you abundantly for your generosity.",
      20,
      130
    );

    doc.save("donation-receipt.pdf");
  };

  if (!donationDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <p className="text-slate-600 text-lg">Loading your receipt...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 bg-white min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white border shadow-lg rounded-lg p-8 max-w-xl w-full relative">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png" // Update to your actual logo path
            alt="UK Murid Federation Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mourid-green mb-2">
          Thank You for Your Donation!
        </h1>
        <p className="text-slate-600 mb-6">
          May Allah reward you abundantly for your generosity.
          <br />
          If you have any questions, feel free to{" "}
          <a
            href="mailto:mouride.uk@gmail.com"
            className="underline text-mourid-green"
          >
            contact us
          </a>
          .
        </p>

        <div className="text-left text-sm text-slate-700 space-y-3 border-t pt-4">
          <p>
            <span className="font-semibold">Donor Name:</span>{" "}
            {donationDetails.donorName}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {donationDetails.donorEmail}
          </p>
          <p>
            <span className="font-semibold">Donation Cause:</span>{" "}
            {donationDetails.cause}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> £
            {donationDetails.amount}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {donationDetails.date}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition"
          >
            Download Receipt
          </button>
          <a
            href="/"
            className="inline-block bg-slate-100 border px-6 py-2 rounded-md text-sm font-semibold hover:bg-slate-200 transition"
          >
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
}