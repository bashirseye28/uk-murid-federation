"use client";

import { ClipboardCheck, CreditCard, Landmark } from "lucide-react";
import { useState } from "react";
import DonationForm from "./DonationForm"; // ✅ adjust path as needed

export default function PaymentSection({
  selectedItem,
}: {
  selectedItem: string;
}) {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [donorInfo, setDonorInfo] = useState<{
    name: string;
    email: string;
    phone?: string;
    isAnonymous: boolean;
  } | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [field]: false }));
    }, 2000);
  };

  const handleStripeCheckout = async () => {
    if (!donorInfo) {
      alert("Please fill out the donation form before proceeding.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: selectedItem,
          amount: 10, // 🔄 Replace with dynamic amount if needed
          donor: donorInfo, // ✅ pass donor info to backend
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate Stripe checkout.");
      }
    } catch (error) {
      console.error("Stripe error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50 border-t">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
          Complete Your Donation
        </h2>
        <p className="text-sm text-slate-600 mb-8">
          You have selected:{" "}
          <span className="font-semibold">{selectedItem}</span>
        </p>

        {/* Step 1️⃣ Donor Form */}
        {!donorInfo && (
          <DonationForm onSubmit={(info) => setDonorInfo(info)} />
        )}

        {/* Step 2️⃣ Payment Section */}
        {donorInfo && (
          <>
            {/* ✅ Confirmation */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left text-sm text-green-700">
              <p>
                Thank you{" "}
                <span className="font-semibold">
                  {donorInfo.isAnonymous ? "Anonymous Donor" : donorInfo.name}
                </span>
                . Your details have been received. You can now complete your
                donation.
              </p>
            </div>

            {/* Stripe Payment Option */}
            <div className="bg-white border rounded-lg shadow p-6 mb-10">
              <h3 className="text-lg font-semibold text-mourid-green flex items-center justify-center gap-2 mb-4">
                <CreditCard size={20} /> Pay Securely by Card
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Use our secure Stripe checkout to complete your donation online.
              </p>
              <button
                className="inline-block bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition disabled:opacity-50"
                onClick={handleStripeCheckout}
                disabled={loading}
              >
                {loading ? "Redirecting..." : "Donate via Card (Stripe)"}
              </button>
            </div>

            {/* Bank Transfer Option */}
            <div className="bg-white border rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-mourid-green flex items-center justify-center gap-2 mb-4">
                <Landmark size={20} /> Bank Transfer Details
              </h3>

              <p className="text-sm text-slate-600 mb-4">
                To donate via bank transfer, please use the details below and
                include <span className="font-semibold">{selectedItem}</span> as
                your payment reference (for example:{" "}
                <span className="italic">Coffee & Sugar, Water Packs</span>).
                This ensures we can track your contribution accurately.
              </p>

              <ul className="space-y-4 text-sm md:text-base text-slate-800 text-left max-w-md mx-auto">
                <li className="flex justify-between items-center border-b pb-2">
                  <span>Account Name:</span>
                  <span className="font-semibold text-right">
                    Yastabshiruna Binihmatin UK Murid Federation
                  </span>
                </li>

                <li className="flex justify-between items-center">
                  <span>Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">22864168</span>
                    <button
                      onClick={() => handleCopy("22864168", "accountNumber")}
                      className="text-mourid-green hover:text-mourid-blue transition flex items-center gap-1"
                      aria-label="Copy Account Number"
                    >
                      <ClipboardCheck size={16} />
                      {copied.accountNumber && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </button>
                  </div>
                </li>

                <li className="flex justify-between items-center">
                  <span>Sort Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">30-99-50</span>
                    <button
                      onClick={() => handleCopy("30-99-50", "sortCode")}
                      className="text-mourid-green hover:text-mourid-blue transition flex items-center gap-1"
                      aria-label="Copy Sort Code"
                    >
                      <ClipboardCheck size={16} />
                      {copied.sortCode && (
                        <span className="text-xs text-green-600">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </li>
              </ul>

              <p className="text-xs text-slate-500 mt-4">
                Once your transfer is complete, please send a copy of your
                payment receipt via{" "}
                <a href="mailto:mouride.uk@gmail.com" className="underline">
                  email
                </a>{" "}
                or{" "}
                <a
                  href="https://wa.me/447888356439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  WhatsApp (+44 7888 356439)
                </a>{" "}
                to confirm your donation. Your support is greatly appreciated!
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}