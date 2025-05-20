"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { dahiras } from "@/data/dahiras";

export default function DahirasSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-mourid-green">
          Our Dahiras in the UK
        </h2>
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
          Connecting Murid communities across cities with a shared vision of unity and devotion.
        </p>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"> 
        {dahiras.map((dahira) => (
          <div
            key={dahira.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all flex flex-col items-center text-center"
          >
            <Image
              src={dahira.logo}
              alt={dahira.name}
              width={80}
              height={80}
              className="rounded-full shadow mb-4 object-contain"
            />
            <h3 className="text-lg font-bold text-mourid-green">{dahira.name}</h3>
            <p className="text-sm font-semibold text-mourid-yellow mt-1">{dahira.city}</p>
            <p className="text-sm text-slate-600 mb-4">Leader: {dahira.leader}</p>
            <a
              href={dahira.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-mourid-green text-white text-sm px-4 py-1.5 rounded-md hover:bg-mourid-blue transition"
            >
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}