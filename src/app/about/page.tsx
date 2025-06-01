import Head from "next/head";

import AboutHero from '@/components/About/AboutHero'
import Intro from '@/components/About/Intro'
import WhoWeAre from '@/components/About/WhoWeAre'
import MissionVision from '@/components/About/MissionVision'
import Objectives from '@/components/About/Objectives'
import OurAchievements from '@/components/About/Achievements'
import Bar from '@/components/About/Bar'
import OrganisationalStructure from '@/components/About/OrganisationalStructure'
import SteeringCommittee from '@/components/About/Steering'

import DahirasSection from '@/components/About/Dahiras'
import ContactCTA from '@/components/About/ContactCTA'


export const metadata = {
  title: 'About Us | UK Murid Federation',
  description:
    'Learn more about the UK Murid Federation: our mission, vision, and commitment to uniting Murid Dahiras across the United Kingdom.',
}

export default function AboutPage() {
  return (
    <>

      {/* SEO Head Tags */}
      <Head>
        <title>About Us | UK Murid Federation</title>
        <meta
          name="description"
          content="Learn more about the UK Murid Federation: our mission, vision, and commitment to uniting Murid Dahiras across the United Kingdom."
        />
        <meta
          name="keywords"
          content="About UK Murid Federation, Murid Dahiras UK, Sheikh Ahmadou Bamba, Murid Mission, Murid Vision, Murid Community UK, Sufism UK"
        />
        <meta property="og:title" content="About Us | UK Murid Federation" />
        <meta
          property="og:description"
          content="Learn more about the UK Murid Federation: our mission, vision, and commitment to uniting Murid Dahiras across the United Kingdom."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murid.co.uk/about" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="UK Murid Federation" />
        <meta property="og:locale" content="en_GB" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://murid.co.uk/about" />
      </Head> 
      {/* Hero Section */}
      <AboutHero />

      {/* INTRODUCTION */}
      <Intro />

      {/* WHO WE ARE (coming next) */}
      <WhoWeAre />

      {/* MISSION & VISION (coming next) */}
      <MissionVision />

      {/* OBJECTIVES */}
      <Objectives />

      {/* ACHIEVEMENTS */}
      <OurAchievements />
      
      {/* BAR */}
      <Bar />

      
      {/* STRUCTURE */}
      <OrganisationalStructure />

      {/* STEERING COMMITTEE */}
      <SteeringCommittee />

        {/* DAHIRAS SECTION */}
        <DahirasSection />
        {/* CONTACT CTA */}
        <ContactCTA />
    </>
  )
}