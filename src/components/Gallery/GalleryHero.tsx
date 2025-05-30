'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function GalleryHero() {
  const scrollToGallery = () => {
    const section = document.getElementById('gallery')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Desktop Image */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/drulwmdhg/image/upload/c_crop,ar_16:9/v1748493962/lplo9wznejjjiecvdc6p.png"
          alt="Gallery UK Murid Federation - Desktop"
          fill
          className="object-cover object-center w-full h-full"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Mobile Image (Optional: use a different one if needed) */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/drulwmdhg/image/upload/c_crop,ar_16:9/v1748493962/lplo9wznejjjiecvdc6p.png"
          alt="Gallery UK Murid Federation - Mobile"
          fill
          className="object-cover object-center w-full h-full"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl text-white">
        <h1 className="text-3xl text-white md:text-5xl font-heading font-bold mb-4 drop-shadow-md">
          Media Gallery
        </h1>
        <p className="text-white/80 text-base md:text-lg mb-6">
          Discover videos and images that highlight the vibrant spirit and events of Murid Dahiras across the United Kingdom.
        </p>

        <button
          onClick={scrollToGallery}
          className="inline-block border border-white text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-white hover:text-mourid-green transition"
        >
          Explore Gallery
        </button>
      </div>
    </motion.section>
  )
}