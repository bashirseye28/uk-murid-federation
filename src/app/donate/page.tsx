'use client';

import { useState, useRef, useEffect } from "react";
import Head from 'next/head'; // ✅ import Head

import DonateHero from "@/components/Donate/DonateHero";
import WhyDonateSection from "@/components/Donate/WhyDonateSection";
import DonationGrid, { DonationItem } from "@/components/Donate/DonationGrid";
import PaymentSection from "@/components/Donate/PaymentSection";
import { donationCampaigns, DonationCampaign } from "@/data/donationCampaigns";
import { findCampaignById } from "@/lib/donations";
import JaayanteCard from "@/components/Donate/JaayanteCard";
import CustomAmountSection from "@/components/Donate/CustomAmountSection";
import ContactCTA from "@/components/About/ContactCTA";

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

          {/* ✅ SEO Head Tags */}
      <Head>
        <title>{`Donate – ${campaign.name} | UK Murid Federation`}</title>
        <meta
          name="description"
          content={`Support the UK Murid Federation during ${campaign.name}. Your donation helps us preserve and promote the teachings of Cheikh Ahmadou Bamba.`}
        />
        <meta
          name="keywords"
          content="Donate Murid, Murid UK Donation, UK Murid Federation, Bamba Day, Addiya, Sufism UK, Islamic Charity, Dahira UK, Cheikh Ahmadou Bamba, Jaayante"
        />
        <meta property="og:title" content={`Donate – ${campaign.name}`} />
        <meta
          property="og:description"
          content={`Make a meaningful impact by supporting the UK Murid Federation's ${campaign.name}.`}
        />
        <meta property="og:url" content="https://murid.co.uk/donate" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://murid.co.uk/donate" />
      </Head>
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

      <ContactCTA />
    </>
  );
}