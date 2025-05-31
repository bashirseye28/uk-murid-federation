'use client'; // 👈 Add this line

import Hero from '@/components/Home/Hero';
import AboutPreview from '@/components/Home/AboutPreview';
import MissionVision from '@/components/About/MissionVision';
import BambaDaySection from '@/components/Home/BambaDaySection';
import GalleryPreview from '@/components/Home/GalleryPreview';
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
      <MissionVision />
      {/* Bamba Day section */} 
      <BambaDaySection />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
}