"use client";

import { motion } from "framer-motion";
import { Flag, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section id="mission-vision" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-mourid-green"
        >
          Our Mission & Vision
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100 text-left"
        >
          <div className="flex items-center mb-4">
            <Flag className="w-6 h-6 text-mourid-green mr-2" />
            <h3 className="text-xl font-semibold text-mourid-green">Our Mission</h3>
          </div>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            To serve the Murid community by promoting unity, organising religious and cultural events,
            and providing social support. We strive to uphold the values of compassion, solidarity, and service,
            while preserving the rich spiritual legacy of Sheikh Ahmadou Bamba.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100 text-left"
        >
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-mourid-green mr-2" />
            <h3 className="text-xl font-semibold text-mourid-green">Our Vision</h3>
          </div>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            A vibrant and united Murid community in the UK, actively engaged in spiritual, educational,
            and charitable activities that benefit both members and society at large.
          </p>
        </motion.div>
      </div>
    </section>
  );
}