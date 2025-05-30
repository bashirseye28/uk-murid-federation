'use client';

import React from 'react';
import Image from 'next/image';

interface JaayanteCardProps {
  campaignName: string;
  onSelect: (data: {
    amount: number;
    campaign: string;
  }) => void;
}

export default function JaayanteCard({ campaignName, onSelect }: JaayanteCardProps) {
  const imageUrl =
    'https://res.cloudinary.com/drulwmdhg/image/upload/v1748278277/image-toubaa_n3nhnc.png';

  return (
    <section className="py-16 px-6">
      <div className="w-full max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={imageUrl}
            alt="Touba Mosque"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-mourid-green mb-4">
            Jaayante Muriid Saadix
          </h2>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Help us deliver an unforgettable Bamba Day. Your generous contribution powers logistics,
            accommodation, and nourishment for the community.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onSelect({ amount: 500, campaign: campaignName })}
              className="rounded-2xl bg-mourid-green px-8 py-3 text-lg font-semibold text-white shadow hover:bg-mourid-yellow hover:text-mourid-green focus:outline-none focus:ring-2 focus:ring-mourid-yellow transition-all"
            >
              Donate £500
            </button>

            <button
              onClick={() => onSelect({ amount: 1000, campaign: campaignName })}
              className="rounded-2xl border-2 border-mourid-blue px-8 py-3 text-lg font-semibold text-mourid-blue hover:bg-mourid-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-mourid-blue transition-all"
            >
              Donate £1000
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}