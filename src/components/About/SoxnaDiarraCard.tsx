'use client';

import React from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';

type Officer = {
  name: string;
  role: string;
  photoUrl: string;
  whatsapp?: string; // only chair has this
};

const officers: Officer[] = [
  {
    name: 'Sokhna Mame Saynabou Ndiaye',
    role: 'Vice President',
    photoUrl: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1749765361/i6op9fu3s8jsf4d1q4w1.png',
  },
  {
    name: 'Sokhna Anta Samb',
    role: 'General Secretary',
    photoUrl: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1749765818/sdxz6atmbu54viyduduc.png',
  },
  {
    name: 'Sokhna Tacko Thiam',
    role: 'Communication',
    photoUrl: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1749765817/o79p9r8hwqnl235fzzbq.png',
  },
  {
    name: 'Sokhna Mame Diarra Diop',
    role: 'Organisation Committee',
    photoUrl: 'https://res.cloudinary.com/drulwmdhg/image/upload/v1749764894/ppqirvitkwxzjihzpkjs.jpg',
  },
];

export default function SoxnaDiarraCard() {
  return (
    <div className="mb-12 max-w-7xl mx-auto bg-white border border-mourid-yellow rounded-2xl shadow-md overflow-hidden">
      {/* Banner */}
      <div className="relative h-56 sm:h-72 w-full">
        <Image
          src="https://res.cloudinary.com/drulwmdhg/image/upload/v1749594093/mt9fuybte1xnhnlnw1lw.jpg"
          alt="Soxna Diarra Federation"
          fill
          className="object-cover"
        />
      </div>

      {/* Title + Chair */}
      <div className="p-6 sm:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
          Soxna Diarra UK Federation
        </h2>

        <h3 className="text-xl font-bold text-mourid-green mb-6">
          Our Leadership Team
        </h3>

        {/* Chairwoman */}
        <div className="mb-8">
          <div className="relative w-28 h-28 mx-auto">
            <Image
              src="https://res.cloudinary.com/drulwmdhg/image/upload/v1749765471/wkm3pp6td6wiarrtzgum.png"
              alt="Sokhna Awa Diop"
              fill
              className="rounded-full object-cover border-4 border-mourid-yellow shadow"
            />
          </div>
          <p className="mt-2 font-semibold text-lg text-mourid-green">
            Sokhna Awa Diop
          </p>
          <p className="text-sm text-mourid-blue mb-3">
            Chairwoman (Djeuwrine)
          </p>
          <a
            href="https://wa.me/447477120681"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-mourid-green text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-mourid-blue transition"
          >
            <Phone size={16} /> WhatsApp
          </a>
        </div>

        {/* Other Officers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {officers.map(officer => (
            <div
              key={officer.name}
              className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={officer.photoUrl}
                  alt={officer.name}
                  fill
                  unoptimized={officer.photoUrl.startsWith('http')}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="font-semibold text-mourid-green">
                {officer.name}
              </p>
              <p className="text-xs text-mourid-blue">{officer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}