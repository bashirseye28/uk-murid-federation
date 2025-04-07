'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const items = [
  {
    title: '1 Sheep (Xar)',
    price: '£150',
    image: '/sheep.png',
    note: 'Used for the main spiritual meal of the event.',
  },
  {
    title: 'Water Packs',
    price: '£15',
    image: '/water.jpeg',
    note: 'Refreshments for attendees during the day.',
  },
  {
    title: 'Coffee & Sugar',
    price: '£10',
    image: '/coffee.jpg',
    note: 'Served during hospitality and group zikr.',
  },
]

export default function DonatePreview() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-mourid-green mb-4">
          Contribute to Bamba Day 2025
        </h2>
        <p className="text-base md:text-lg font-sans text-slate-700 mb-10 max-w-2xl mx-auto">
          Help us prepare for this blessed gathering through your generous support.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {items.map((item, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition bg-white">
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-mourid-green mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.note}</p>
                <p className="text-mourid-blue font-bold mb-4">{item.price}</p>
                <Link
                  href="/donate"
                  className="inline-block text-sm font-semibold border border-mourid-green text-mourid-green px-4 py-1.5 rounded hover:bg-mourid-green hover:text-white transition"
                >
                  Donate
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/donate"
          className="inline-block border border-mourid-green text-mourid-green px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-green hover:text-white transition"
        >
          View All Contributions
        </Link>
      </div>
    </motion.section>
  )
}