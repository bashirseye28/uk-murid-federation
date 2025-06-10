'use client';

import React from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';

export default function SoxnaDiarraCard() {
  return (
    <div className="mb-12 max-w-7xl mx-auto bg-white border border-mourid-yellow rounded-2xl shadow-md overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-56 sm:h-72 w-full">
        <Image
          src="https://res.cloudinary.com/drulwmdhg/image/upload/v1749594460/heoam4wztskdga5rrvaf.png"
          alt="Soxna Diarra Federation"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
          Soxna Diarra UK Federation
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Profile Image */}
          <Image
            src="https://res.cloudinary.com/drulwmdhg/image/upload/v1748300216/5039800_q3if1w.jpg"
            alt="Sokhna Awa Diop"
            width={100}
            height={100}
            className="rounded-full object-cover border-4 border-mourid-yellow shadow"
          />

          {/* Info */}
          <div className="text-left max-w-sm">
            <h3 className="text-xl font-semibold text-mourid-green">Sokhna Awa Diop</h3>
            <p className="text-sm font-semibold text-mourid-yellow mb-1">Scotland</p>
            <p className="text-sm text-mourid-blue font-medium mb-4">
              Chairwoman (Djeuwrine)
            </p>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/447477120681"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-mourid-green text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-mourid-blue transition w-full sm:w-auto"
            >
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}