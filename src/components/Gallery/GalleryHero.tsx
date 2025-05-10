'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function GalleryHero() {
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
      {/* Background Image */}
      <Image
        src="https://res.cloudinary.com/dnmoy5wua/image/upload/v1746742003/herotry_vvbkqd.jpg"
        alt="Gallery UK Murid Federation"
        fill
        sizes="100vw"
        className="object-cover brightness-65"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl text-white">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-md">
          Media Gallery
        </h1>
        <p className="text-white/80 text-base md:text-lg">
          Discover videos and images that highlight the vibrant spirit and events of Murid Dahiras across the United Kingdom.
        </p>
      </div>
    </motion.section>
  )
}