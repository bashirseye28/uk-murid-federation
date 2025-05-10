'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type DonateHeroProps = {
  campaignName: string
}

export default function DonateHero({ campaignName }: DonateHeroProps) {
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
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="https://res.cloudinary.com/dnmoy5wua/image/upload/v1746742003/herotry_vvbkqd.jpg"
        alt="Support UK Murid Federation"
        fill
        sizes="100vw"
        className="object-cover brightness-65"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white bg-black/30 backdrop-blur-md rounded-lg py-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4 drop-shadow-md">
          Support the Federation
        </h1>

        <p className="text-white/80 text-base md:text-lg mb-6">
          Your donation strengthens our community and furthers our mission to promote the teachings of Cheikh Ahmadou Bamba across the UK.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/10 text-sm">
          <span>
            Now collecting for: <span className="text-white font-semibold">{campaignName}</span>
          </span>
        </div>
      </div>
    </motion.section>
  )
}