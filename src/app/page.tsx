'use client'; // 👈 Add this line
import Head from "next/head";

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
      {/* SEO Head Tags */}
      <Head>
        <title>UK Murid Federation</title>
        <meta
          name="description"
          content="Welcome to the UK Murid Federation. Explore our mission, vision, and community activities dedicated to the teachings of Cheikh Ahmadou Bamba."
        />
        <meta
          name="keywords"
          content="Murid UK, UK Murid Federation, Cheikh Ahmadou Bamba, Murid Dahiras, Sufism UK, Islamic Community UK"
        />
        <meta property="og:title" content="UK Murid Federation" />
        <meta
          property="og:description"
          content="Welcome to the UK Murid Federation. Explore our mission, vision, and community activities dedicated to the teachings of Cheikh Ahmadou Bamba."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murid.co.uk" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="UK Murid Federation" />
        <meta property="og:locale" content="en_GB" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://murid.co.uk" />
      </Head>
      {/* Home Page Content */}
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