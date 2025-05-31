'use client'; // 👈 Add this line

import Hero from '@/components/Home/Hero';
import AboutPreview from '@/components/Home/AboutPreview';
import BambaDaySection from '@/components/Home/BambaDaySection';
import GalleryPreview from '@/components/Home/GalleryPreview';
import JaayanteCard from '@/components/Donate/JaayanteCard';
import ContactCTA from '@/components/About/ContactCTA';

export default function HomePage() {
  const handleSelect = (data: { amount: number; campaign: string }) => {
    console.log('Donation selected:', data);
    // Optional: Navigate to /donate or open a modal
  };

  return (
    <>
      <Hero />
      <AboutPreview />
      <BambaDaySection />
      <GalleryPreview />
      <JaayanteCard
        campaignName="Barkeelu Bamba Day 2025"
        onSelect={handleSelect}
      />
      <ContactCTA />
    </>
  );
}