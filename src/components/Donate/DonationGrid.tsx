'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type DonationItem = {
  id: number
  title: string
  description: string
  image: string
}

export default function DonateGrid({
  items,
  campaignName,
  onDonate,
}: {
  items: DonationItem[]
  campaignName: string
  onDonate: (item: string) => void
}) {
  return (
    <section id='list_donation' className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-center mb-10">
          {campaignName} – Choose Your Donation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-lg transition flex flex-col p-6 text-center"
            >
              <div className="w-full h-40 relative mb-4 rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg font-bold text-mourid-green mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm mb-6">{item.description}</p>

              <button
                onClick={() => onDonate(item.title)}
                className="mt-auto inline-block bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition"
              >
                Donate
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}