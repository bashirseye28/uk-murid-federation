'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function GalleryHero() {
  const scrollToGallery = () => {
    const section = document.getElementById('gallery')
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.9, ease: 'easeOut' }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative h-[75vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="https://res.cloudinary.com/drulwmdhg/image/upload/c_crop,ar_16:9/v1748493962/lplo9wznejjjiecvdc6p.png"
        alt="Gallery UK Murid Federation"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl text-white md:text-6xl font-bold leading-tight drop-shadow-lg"
        >
          Explore the Soul of the Murid Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-white/80"
        >
          Powerful moments, spiritual gatherings, and timeless Murid heritage in one gallery.
        </motion.p>

        <motion.button
          onClick={scrollToGallery}
          whileHover={{ scale: 1.05 }}
          className="mt-8 inline-flex items-center gap-2 border border-white px-6 py-2 rounded-full text-sm font-medium transition hover:bg-white hover:text-mourid-green"
        >
          Scroll Down <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  )
}