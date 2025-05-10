'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<{
    donorName: string;
    donorEmail: string;
    donorPhone?: string;
    cause: string;
    amount: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const donorName = searchParams.get('donor_name') || 'Anonymous';
    const donorEmail = searchParams.get('donor_email') || 'anonymous@murid.uk';
    const donorPhone = searchParams.get('donor_phone') || 'N/A';
    const cause = searchParams.get('cause') || 'General Donation';
    const amount = searchParams.get('amount') || '10.00';
    const date = format(new Date(), 'PPPpp');

    setDonationDetails({
      donorName,
      donorEmail,
      donorPhone,
      cause,
      amount,
      date,
    });
  }, [searchParams]);

  const handleDownload = async () => {
    if (!donationDetails) return;

    const doc = new jsPDF();

    const logoUrl =
      'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png';
    const logoImg = await fetch(logoUrl)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    // Add Logo
    doc.addImage(logoImg as string, 'PNG', 85, 10, 40, 40);

    let y = 60;

    // Title
    doc.setFontSize(20).setFont('helvetica', 'bold');
    doc.text('Donation Receipt', 105, y, { align: 'center' });

    // Organization details
    y += 15;
    doc.setFontSize(12).setFont('helvetica', 'normal');
    doc.text('UK Murid Federation', 20, y);
    y += 7;
    doc.text('Company Number: 13535445', 20, y);
    y += 7;
    doc.text('Email: mouride.uk@gmail.com', 20, y);
    y += 7;
    doc.text('Website: https://ukmurid.org', 20, y);

    // Divider
    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    // Donor info
    y += 15;
    doc.setFont('helvetica', 'bold').text('Donor Information:', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Donor Name: ${donationDetails.donorName}`, 20, y);
    y += 7;
    doc.text(`Email: ${donationDetails.donorEmail}`, 20, y);
    y += 7;
    doc.text(`Phone: ${donationDetails.donorPhone}`, 20, y);

    // Donation info
    y += 10;
    doc.setFont('helvetica', 'bold').text('Donation Details:', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Donation Cause: ${donationDetails.cause}`, 20, y);
    y += 7;
    doc.text(`Amount: £${donationDetails.amount}`, 20, y);
    y += 7;
    doc.text(`Date: ${donationDetails.date}`, 20, y);

    // Divider
    y += 15;
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);

    // Thank you message
    y += 12;
    doc.setFontSize(11).setFont('times', 'italic');
    doc.text(
      'May Allah reward you abundantly for your generosity.',
      105,
      y,
      { align: 'center' }
    );

    // Footer note
    y += 15;
    doc.setFontSize(9).setFont('helvetica', 'normal');
    doc.text(
      'This document serves as an official receipt for your donation. Thank you for supporting UK Murid Federation.',
      105,
      y,
      { align: 'center' }
    );

    doc.save('donation-receipt.pdf');
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
        <div className="flex justify-center mb-6">
          <Image
            src="https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png"
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
          If you have any questions, feel free to{' '}
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
            <span className="font-semibold">Donor Name:</span>{' '}
            {donationDetails.donorName}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            {donationDetails.donorEmail}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{' '}
            {donationDetails.donorPhone}
          </p>
          <p>
            <span className="font-semibold">Donation Cause:</span>{' '}
            {donationDetails.cause}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> £
            {donationDetails.amount}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{' '}
            {donationDetails.date}
          </p>
        </div>

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