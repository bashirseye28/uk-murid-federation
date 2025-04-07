'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const galleryImages = [
  '/hero.svg',
  '/hero.svg',
  '/hero.svg',
]

export default function GalleryPreview() {
  return (
    <motion.section
      id="gallery"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-slate-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-mourid-green mb-4">
          Gallery
        </h2>
        <p className="text-base md:text-lg font-sans text-slate-700 mb-10 max-w-2xl mx-auto">
          A glimpse into the spiritual and communal life of the UK Murid Federation.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative w-full h-64 rounded-md overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <Link
          href="/gallery"
          className="inline-block border border-mourid-green text-mourid-green px-5 py-2 rounded-md text-sm font-semibold hover:bg-mourid-green hover:text-white transition"
        >
          View Full Gallery
        </Link>
      </div>
    </motion.section>
  )
}