import AboutHero from '@/components/About/AboutHero'
import WhoWeAre from '@/components/About/WhoWeAre'
import MissionVision from '@/components/About/MissionVision'
import DahirasSection from '@/components/About/Dahiras'
import ContactCTA from '@/components/About/ContactCTA'


export const metadata = {
  title: 'About Us | UK Murid Federation',
  description:
    'Learn more about the UK Murid Federation: our mission, vision, and commitment to uniting Mourid Dahiras across the United Kingdom.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <AboutHero />

      {/* WHO WE ARE (coming next) */}
      <WhoWeAre />

      {/* MISSION & VISION (coming next) */}
      <MissionVision />

        {/* DAHIRAS SECTION */}
        <DahirasSection />
        {/* CONTACT CTA */}
        <ContactCTA />
    </>
  )
}