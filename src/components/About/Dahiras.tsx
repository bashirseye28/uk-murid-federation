"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { dahiras } from "@/data/dahiras";

export default function DahirasSection() {
  return (
    <section id="dahiras" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-center mb-10">
          Our Dahiras in the UK
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dahiras.map((dahira, idx) => (
            <motion.div
              key={dahira.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-xl transition duration-300 overflow-hidden flex flex-col items-center text-center p-6"
            >
              <div className="w-24 h-24 mb-4 relative">
                <Image
                  src={dahira.logo}
                  alt={`${dahira.name} logo`}
                  sizes="96px"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h3 className="text-lg font-bold text-mourid-green">
                {dahira.name}
              </h3>
              <p className="text-sm text-slate-600">{dahira.city}</p>
              <p className="text-sm text-slate-500 mt-2">
                Leader: <span className="font-medium">{dahira.leader}</span>
              </p>

              <div className="flex gap-4 mt-4">
                {dahira.whatsapp && (
                  <a
                    href={dahira.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-mourid-green font-medium hover:underline hover:text-mourid-blue"
                    aria-label={`WhatsApp ${dahira.name}`}
                  >
                    WhatsApp
                  </a>
                )}
                {dahira.email && (
                  <a
                    href={`mailto:${dahira.email}`}
                    className="inline-flex items-center gap-1 text-sm text-mourid-green font-medium hover:underline hover:text-mourid-blue"
                    aria-label={`Email ${dahira.name}`}
                  >
                    Email
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}