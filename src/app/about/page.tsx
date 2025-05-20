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
    'Learn more about the UK Murid Federation: our mission, vision, and commitment to uniting Mourid Dahiras across the United Kingdom.',
}

export default function AboutPage() {
  return (
    <>
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