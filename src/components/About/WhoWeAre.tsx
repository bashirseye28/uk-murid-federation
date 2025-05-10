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
            The UK Murid Federation is a unifying body for Murid Dahiras across
            the United Kingdom. Our mission is to uphold the teachings and
            spiritual legacy of Cheikh Ahmadou Bamba, promote Islamic values,
            and foster unity and cooperation among Murid communities.
          </p>
          <p className="text-slate-700 text-sm md:text-base mt-4 leading-relaxed">
            Through spiritual gatherings, educational programs, and social
            initiatives, we aim to strengthen the bond of brotherhood and
            sisterhood within the Murid diaspora, and contribute positively to
            wider society.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }} // slight delay for the image
          className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow"
        >
          <Image
            src="https://res.cloudinary.com/dnmoy5wua/image/upload/v1746750549/question-mark-icon-solving-problem-solution-concept_uv47ma.jpg"
            alt="Spiritual gathering organized by the UK Murid Federation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}