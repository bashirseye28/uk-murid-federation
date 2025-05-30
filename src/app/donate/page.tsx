'use client';

import { useState, useRef, useEffect } from "react";
import DonateHero from "@/components/Donate/DonateHero";
import WhyDonateSection from "@/components/Donate/WhyDonateSection";
import DonationGrid, { DonationItem } from "@/components/Donate/DonationGrid";
import PaymentSection from "@/components/Donate/PaymentSection";
import { donationCampaigns, DonationCampaign } from "@/data/donationCampaigns";
import { findCampaignById } from "@/lib/donations";
import JaayanteCard from "@/components/Donate/JaayanteCard";
import CustomAmountSection from "@/components/Donate/CustomAmountSection";

type ExtendedDonationItem = DonationItem & { campaign?: string };

export default function DonatePage() {
  const [selectedItem, setSelectedItem] = useState<ExtendedDonationItem | null>(null);
  const [campaign, setCampaign] = useState<DonationCampaign | null>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  // Fetch the active campaign
  useEffect(() => {
    const active = findCampaignById("bambaDay") ?? donationCampaigns[0];
    setCampaign(active);
  }, []);

  // Handle donation item click
  const handleDonate = (item: ExtendedDonationItem) => {
    setSelectedItem(item);
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const handleBack = () => {
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!campaign) {
    return <div className="py-24 text-center text-slate-600">Loading donation details…</div>;
  }

  return (
    <>
      <DonateHero campaignName={campaign.name} />
      <WhyDonateSection />

      {/* Show JaayanteCard only during Bamba Day and when no item selected */}
      {selectedItem === null && campaign.id === "bambaDay" && (
        <JaayanteCard
          campaignName={campaign.name}
          onSelect={({ amount, campaign }) =>
            handleDonate({
              id: 999,
              title: "Jaayante Contribution",
              description: "Special support for logistics, accommodation, and food",
              image: "",
              price: amount,
              formType: "donation",
              campaign, // ✅ added
            })
          }
        />
      )}

      {/* Grid + CustomAmount */}
      {selectedItem === null && (
        <>
          <DonationGrid onDonate={(item) => handleDonate({ ...item, campaign: campaign.name })} />
          <CustomAmountSection
            onDonate={(item) => handleDonate({ ...item, campaign: campaign.name })}
          />
        </>
      )}

      {/* Payment flow */}
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
}