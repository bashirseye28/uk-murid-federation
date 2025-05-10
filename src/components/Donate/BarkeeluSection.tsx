'use client'

import { motion } from 'framer-motion'
import BarkeeluCard from './BarkeeluCard'

const items = [
  {
    title: '1 Sheep (Xar)',
    price: '£150',
    image: '/donate-hero.jpg',
    note: 'Contribute towards the main communal meal.',
  },
  {
    title: 'Water Packs',
    price: '£15',
    image: '/donate-hero.png',
    note: 'Help keep attendees refreshed throughout the day.',
  },
  {
    title: 'Coffee & Sugar',
    price: '£10',
    image: '/coffee.jpg',
    note: 'Hospitality for zikr and guests.',
  },
  {
    title: 'Rice (Sack)',
    price: '£30',
    image: '/donate-hero.jpg',
    note: 'Part of the core Bamba Day food preparation.',
  },
  {
    title: 'Cooking Oil',
    price: '£20',
    image: '/donate-hero.jpg',
    note: 'Used to prepare meals for guests and community.',
  },
  {
    title: 'Juice & Drinks',
    price: '£25',
    image: '/donate-hero.jpg',
    note: 'Soft drinks and juice for the event.',
  },
]

export default function BarkeeluSection() {
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
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading text-mourid-green font-bold mb-4">
          Barkeelu for Bamba Day 2025
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
          Choose an item below and support the preparation of this blessed gathering.
        </p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <BarkeeluCard
            key={index}
            title={item.title}
            price={item.price}
            image={item.image}
            note={item.note}
          />
        ))}
      </div>
    </motion.section>
  )
}