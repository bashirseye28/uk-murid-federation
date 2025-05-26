'use client';

import React, { useState } from 'react';
import { DonationItem } from './DonationGrid';

interface CustomAmountSectionProps {
  onDonate: (item: DonationItem) => void;
}

export default function CustomAmountSection({ onDonate }: CustomAmountSectionProps) {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }
    if (!reference.trim()) {
      setError("Please provide a reference (cause)");
      return;
    }

    setError("");
    onDonate({
      id: 998,
      title: reference.trim(),
      description: "Custom donation submitted by donor",
      image: "",
      price: numAmount,
      formType: 'donation',
    });
  };

  return (
    <section className="bg-white px-6 py-16 border-t">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
          Custom Donation
        </h2>
        <p className="text-slate-600 mb-6">
          Enter any amount you&apos;d like to give, along with a reference or purpose (e.g. logistics, accommodation, etc.)
        </p>

        <div className="space-y-4 text-left">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
              Amount (GBP)
            </label>
            <input
              id="amount"
              type="number"
              min={1}
              step={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
              placeholder="Enter amount e.g. 50"
            />
          </div>

          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-slate-700 mb-1">
              Reference / Cause
            </label>
            <input
              id="reference"
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
              placeholder="e.g. Logistics, Magal transport, etc."
            />
          </div>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full rounded-md bg-mourid-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-mourid-blue"
            >
              Continue to Form & Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}