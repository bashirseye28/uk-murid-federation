'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, CalendarDays } from 'lucide-react'
import Countdown from './Countdown'

export default function BambaDaySection() {
  return (
    <motion.section
      id="bamba-day"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      className="relative bg-mourid-navy text-white py-20 overflow-hidden"
    >
      {/* Background flyer image */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/bambaday.jpeg"
          alt="Bamba Day Flyer"
          fill
          className="object-cover"
        />
      </div>

      {/* Foreground content */}
      <div className="relative max-w-4xl mx-auto text-center px-6 z-10">
        <h2 className="text-3xl md:text-4xl font-heading mb-4 text-white">
          Bamba Day UK 2025
        </h2>

        <p className="text-base md:text-lg font-sans mb-8 text-white/80">
          “Work as if you will live forever, worship as if you will die tomorrow.”
        </p>

        <Countdown />

        {/* Event Info */}
        <div className="flex flex-col items-center gap-2 text-sm text-white/70 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white/70" />
            <span>1 Hockley Circus, Birmingham B18 5PP</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-white/70" />
            <span>Saturday, 28 June 2025</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/donate"
          className="inline-block mt-4 border border-white text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-white hover:text-mourid-navy transition"
        >
          Donate Now
        </Link>
      </div>
    </motion.section>
  )
}