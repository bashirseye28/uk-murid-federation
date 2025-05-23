'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import { sendRegistrationEmail } from '@/lib/sendRegistrationEmail';

interface SuccessPageProps {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  cause: string; // Reference or campaign
  amount: string;
  date: string;
  childrenUnder16?: number;
}

export default function SuccessPage({
  donorName,
  donorEmail,
  donorPhone,
  cause,
  amount,
  date,
  childrenUnder16,
}: SuccessPageProps) {
  const hasSentEmail = useRef(false);

  const handleDownload = useCallback(async () => {
    const doc = new jsPDF();
    const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746670607/logo_fdhstb.png';

    const logoBase64 = await fetch(logoUrl)
      .then((res) => res.blob())
      .then((blob) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        })
      );

    doc.addImage(logoBase64, 'PNG', 85, 10, 40, 40);

    let y = 60;
    doc.setFontSize(20).setFont('helvetica', 'bold');
    doc.text('Donation Receipt', 105, y, { align: 'center' });

    y += 15;
    doc.setFontSize(18).text('UK Murid Federation', 20, y);
    y += 9;
    doc.setFontSize(12).text('Company Number: 13535445', 20, y);
    y += 7;
    doc.text('Email: mouride.uk@gmail.com', 20, y);
    y += 7;
    doc.text('Website: https://ukmouride.co.uk', 20, y);

    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 15;
    doc.setFont('helvetica', 'bold').text('Donor Information:', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Donor Name: ${donorName}`, 20, y);
    y += 7;
    doc.text(`Email: ${donorEmail}`, 20, y);
    y += 7;
    doc.text(`Phone: ${donorPhone}`, 20, y);

    y += 10;
    doc.setFont('helvetica', 'bold').text('Donation Details:', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Reference: ${cause}`, 20, y);
    y += 7;
    doc.text(`Amount: £${amount}`, 20, y);
    y += 7;
    doc.text(`Date: ${date}`, 20, y);

    if (childrenUnder16 !== undefined) {
      y += 10;
      doc.setFont('helvetica', 'bold').text('Children Attending:', 20, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.text(`Children Under 16: ${childrenUnder16}`, 20, y);
    }

    y += 15;
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);

    y += 12;
    doc.setFontSize(11).setFont('times', 'italic');
    doc.text('May Allah reward you abundantly for your generosity.', 105, y, { align: 'center' });

    y += 15;
    doc.setFontSize(9).setFont('helvetica', 'normal');
    doc.text(
      'This document serves as an official receipt for your donation. Thank you for supporting UK Murid Federation.',
      105,
      y,
      { align: 'center' }
    );

    doc.save('donation-receipt.pdf');
  }, [donorName, donorEmail, donorPhone, cause, amount, date, childrenUnder16]);

  // ✅ Only send email ONCE
  useEffect(() => {
    if (hasSentEmail.current || !donorEmail) return;
    hasSentEmail.current = true;

    const sendEmail = async () => {
      try {
        await sendRegistrationEmail({
          name: donorName,
          email: donorEmail,
          phone: donorPhone,
          dahiraCity: cause,
          childrenUnder16: childrenUnder16 ?? 0,
        });
        console.log('✅ Registration email sent.');
      } catch (error) {
        console.error('❌ Failed to send registration email:', error);
      }
    };

    sendEmail();
  }, [donorName, donorEmail, donorPhone, cause, childrenUnder16]);

  return (
    <section className="py-16 px-6 bg-white min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white border shadow-lg rounded-lg p-8 max-w-xl w-full">
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
          <p><span className="font-semibold">Donor Name:</span> {donorName}</p>
          <p><span className="font-semibold">Email:</span> {donorEmail}</p>
          <p><span className="font-semibold">Phone:</span> {donorPhone}</p>
          <p><span className="font-semibold">Reference:</span> {cause}</p>
          <p><span className="font-semibold">Amount:</span> £{amount}</p>
          <p><span className="font-semibold">Date:</span> {date}</p>
          {childrenUnder16 !== undefined && (
            <p><span className="font-semibold">Children Under 16:</span> {childrenUnder16}</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition"
          >
            Download Receipt
          </button>
          <a
            href="/donate"
            className="inline-block bg-slate-100 border px-6 py-2 rounded-md text-sm font-semibold hover:bg-slate-200 transition"
          >
            Return to Donate
          </a>
        </div>
      </div>
    </section>
  );
}