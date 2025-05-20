// src/app/page.tsx

import Hero from '@/components/Home/Hero'
import AboutPreview from '@/components/Home/AboutPreview'
import GalleryPreview from '@/components/Home/GalleryPreview'
import BambaDaySection from '@/components/Home/BambaDaySection'
// import DonatePreview from '@/components/Home/DonatePreview'


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <GalleryPreview />
      <BambaDaySection />
      {/* <DonatePreview /> */}
    </>
  )
}