"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-mourid-green mb-4">
            Who We Are
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            The UK Murid Communities Federation is a unifying body for Murid
            Dahiras across the United Kingdom. Our mission is to uphold the
            teachings and spiritual legacy of Sheikh Ahmadou Bamba, promote
            Islamic values, and foster unity and cooperation among Murid
            communities.
          </p>
          <p className="text-slate-700 text-sm md:text-base mt-4 leading-relaxed">
            Through spiritual gatherings, educational programmes, and social
            initiatives, we aim to strengthen bonds of brotherhood and
            sisterhood within the Murid diaspora, while contributing positively
            to wider society.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full" // remove h-64 / h-96
        >
          <Image
            src="https://res.cloudinary.com/drulwmdhg/image/upload/c_fill,ar_4:3/v1748492737/jjvtolf7hj9kssj4vgqq.jpg"
            alt="Spiritual gathering organized by the UK Murid Federation"
            width={700}
            height={500}
            className="rounded-lg shadow w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
