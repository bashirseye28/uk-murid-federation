"use client";

import { useState, useRef, useEffect } from "react";
import DonateHero from "@/components/Donate/DonateHero";
import WhyDonateSection from "@/components/Donate/WhyDonateSection";
import DonationGrid, { DonationItem } from "@/components/Donate/DonationGrid";
import PaymentSection from "@/components/Donate/PaymentSection";
import { donationCampaigns, DonationCampaign } from "@/data/donationCampaigns";
import { findCampaignById } from "@/lib/donations";
import JaayanteCard from "@/components/Donate/JaayanteCard";
import CustomAmountSection from "@/components/Donate/CustomAmountSection";

const DonatePage = () => {
  /** The item the user clicked, or null when browsing */
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);
  /** The active campaign (Bamba Day, Addiya, …) */
  const [campaign, setCampaign] = useState<DonationCampaign | null>(null);
  /** Scroll target when the payment section appears */
  const paymentRef = useRef<HTMLDivElement>(null);

  /* Fetch the current campaign once on mount */
  useEffect(() => {
    const active = findCampaignById("bambaDay") ?? donationCampaigns[0];
    setCampaign(active);
  }, []);

  /* Handle click on a Donate button in the grid */
  const handleDonate = (item: DonationItem) => {
    setSelectedItem(item);
    /** Give React one paint so PaymentSection exists */
    setTimeout(() => paymentRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  /* Return to the grid */
  const handleBack = () => {
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!campaign) {
    return (
      <div className="py-24 text-center text-slate-600">Loading donation details…</div>
    );
  }

  return (
    <>
      <DonateHero campaignName={campaign.name} />
      <WhyDonateSection />

      {/* JaayanteCard visible only during Bamba Day and when no selection is made */}
      {selectedItem === null && campaign.id === "bambaDay" && (
        <JaayanteCard
          onSelect={(amount) =>
            handleDonate({
              id: 999,
              title: "Jaayante Contribution",
              description: "Special support for logistics, accommodation, and food",
              image: "",
              price: amount,
              formType: "donation",
            })
          }
        />
      )}

      {/* Grid and Custom amount visible until a cause is selected */}
      {selectedItem === null && (
        <>
          <DonationGrid onDonate={handleDonate} />
          <CustomAmountSection onDonate={handleDonate} />
        </>
      )}

      {/* Payment / registration flow */}
      {selectedItem !== null && (
        <div ref={paymentRef}>
          <PaymentSection
            campaignName={campaign.name}
            selectedItem={selectedItem}
            onBack={handleBack}
          />
        </div>
      )}
    </>
  );
};

export default DonatePage;