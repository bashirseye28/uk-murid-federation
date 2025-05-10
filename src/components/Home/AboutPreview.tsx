'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPreview() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Image - appears first on mobile */}
        <div className="order-1 md:order-2">
          <div className="relative w-full h-[300px] md:h-[350px] rounded-md overflow-hidden shadow-md">
            <Image
              src="/banner1.png"
              alt="UK and Touba symbolic illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-heading text-mourid-green mb-6">
            About the Federation
          </h2>

          <p className="text-base md:text-lg font-sans text-slate-700 leading-relaxed mb-6">
            The UK Murid Federation brings together Mourid Dahiras across the United Kingdom to celebrate, preserve,
            and promote the teachings of Cheikh Ahmadou Bamba. Rooted in unity, peace, and education, we strive
            to strengthen our communities and honour the spiritual legacy of the Mouridiyya tradition.
          </p>

          <Link
            href="/about"
            className="inline-block border border-mourid-green text-mourid-green px-5 py-2 rounded-md text-sm font-semibold hover:bg-mourid-green hover:text-white transition"
          >
            Read More
          </Link>
        </div>
      </div>
    </motion.section>
  )
}