'use client'

import { motion } from 'framer-motion'

export default function Intro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-white py-16 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
          Welcome to the UK Murid Communities Federation CIC
        </h2>

        <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
          A unified body representing the collective efforts of Murid Dahiras across the United Kingdom. Our
          federation is dedicated to fostering spiritual growth, community cohesion, and charitable initiatives
          in alignment with the teachings of Cheikh Ahmadou Bamba.
        </p>

        <p className="text-sm text-slate-500 italic">
          Registered as a Community Interest Company (No. 13535445) under UK law.
        </p>
      </div>
    </motion.section>
  )
}