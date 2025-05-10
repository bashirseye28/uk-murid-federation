'use client'

import Image from 'next/image'
import Link from 'next/link'

interface BarkeeluCardProps {
  title: string
  price: string
  image: string
  note: string
}

export default function BarkeeluCard({ title, price, image, note }: BarkeeluCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition bg-white">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-left">
        <h3 className="text-lg font-semibold text-mourid-green mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{note}</p>
        <p className="text-mourid-blue font-bold mb-4">{price}</p>

        {/* Action */}
        <Link
          href="/donate#bank-details" // Later we’ll scroll to the bank section
          className="inline-block text-sm font-semibold border border-mourid-green text-mourid-green px-4 py-1.5 rounded hover:bg-mourid-green hover:text-white transition"
        >
          Barkeelu
        </Link>
      </div>
    </div>
  )
}