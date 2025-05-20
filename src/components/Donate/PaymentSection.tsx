"use client";

import { useState } from "react";
import { ClipboardCheck, CreditCard, Landmark } from "lucide-react";
import DonationForm, { DonorInfo } from "./DonationForm";
import RegistrationForm, { RegistrationInfo } from "./RegistrationForm";
import type { DonationItem } from "./DonationGrid";

interface PaymentSectionProps {
  campaignName: string;
  selectedItem: DonationItem;
  onBack: () => void;
}

export default function PaymentSection({
  campaignName,
  selectedItem,
  onBack,
}: PaymentSectionProps) {
  const [donorInfo, setDonorInfo] = useState<DonorInfo | RegistrationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const isRegistration = selectedItem.formType === "registration";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied((p) => ({ ...p, [field]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [field]: false })), 2000);
  };

  const handleStripeCheckout = async () => {
    if (!donorInfo) {
      alert("Please complete the form first.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: selectedItem, donor: donorInfo }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Failed to initiate payment.");
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-t bg-gray-50 px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-2xl font-bold text-mourid-green md:text-3xl">
          Complete Your Donation – {campaignName}
        </h2>
        <p className="mb-8 text-sm text-slate-600">
          You have selected: <span className="font-semibold">{selectedItem.title}</span>
        </p>

        {/* FORM STEP */}
        {donorInfo === null && (
          isRegistration ? (
            <RegistrationForm
              price={selectedItem.price}
              onSubmit={(info) =>
                setDonorInfo({ ...info, isAnonymous: false } as RegistrationInfo & { isAnonymous: false })
              }
              onBack={onBack}
            />
          ) : (
            <DonationForm
              amount={selectedItem.price}
              onSubmit={(info) => setDonorInfo(info)}
              onBack={onBack}
            />
          )
        )}

        {/* PAYMENT STEP */}
        {donorInfo !== null && (
          <>
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-left text-sm text-green-700">
              Thank you, <span className="font-semibold">{"name" in donorInfo && donorInfo.name ? donorInfo.name : "Anonymous Donor"}</span>. You can now complete your donation.
            </div>

            {/* Stripe */}
            <div className="mb-10 rounded-lg border bg-white p-6 shadow">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-mourid-green">
                <CreditCard size={20} /> Pay Securely by Card
              </h3>
              <button
                disabled={loading}
                onClick={handleStripeCheckout}
                className="inline-block w-full rounded-md bg-mourid-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-mourid-blue disabled:opacity-50"
              >
                {loading ? "Redirecting…" : `Donate £${selectedItem.price.toLocaleString()} via Stripe`}
              </button>
            </div>

            {/* Bank Transfer */}
            <div className="rounded-lg border bg-white p-6 shadow">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-mourid-green">
                <Landmark size={20} /> Bank Transfer Details
              </h3>
              <p className="mb-4 text-left text-sm text-slate-600">
                Use reference <span className="font-semibold">{selectedItem.title}</span>.
              </p>
              <ul className="mx-auto max-w-md space-y-4 text-left text-sm text-slate-800 md:text-base">
                <li className="flex items-center justify-between border-b pb-2">
                  <span>Account Name:</span>
                  <span className="font-semibold text-right">Yastabshiruna Binihmatin UK Murid Federation</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">22864168</span>
                    <button
                      onClick={() => handleCopy("22864168", "accountNumber")}
                      className="flex items-center gap-1 text-mourid-green transition hover:text-mourid-blue"
                    >
                      <ClipboardCheck size={16} />
                      {copied.accountNumber && <span className="text-xs text-green-600">Copied!</span>}
                    </button>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Sort Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">30-99-50</span>
                    <button
                      onClick={() => handleCopy("30-99-50", "sortCode")}
                      className="flex items-center gap-1 text-mourid-green transition hover:text-mourid-blue"
                    >
                      <ClipboardCheck size={16} />
                      {copied.sortCode && <span className="text-xs text-green-600">Copied!</span>}
                    </button>
                  </div>
                </li>
              </ul>
              <p className="mt-4 text-left text-xs text-slate-500">
                After transferring, please email or WhatsApp your receipt to confirm.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
