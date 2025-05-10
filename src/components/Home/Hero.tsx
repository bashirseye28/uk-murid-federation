"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[700px] md:min-h-600px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/famous-tower-bridge-evening-london-england.jpg"
          alt="Bamba Day UK 2025 Hero Background"
          fill
          className="object-cover object-top w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 px-4 sm:px-6 text-white flex flex-col items-center max-w-[90%] sm:max-w-3xl md:max-w-4xl mt-[80px] md:mt-[70px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl text-white font-heading font-bold mb-4 leading-tight">
          YASTABSHIRUNA BINIHMATIN
        </h1>

        <p className="mt-4 text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Uniting all Mourid Dahiras in the United Kingdom to honour the teachings of Cheikh Ahmadou Bamba.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/donate"
            className="px-5 py-2 sm:px-6 sm:py-3 bg-white text-mourid-green font-semibold rounded-md hover:bg-mourid-green hover:text-white border border-mourid-green transition"
          >
            Donate Now
          </a>
          <a
            href="/about"
            className="px-5 py-2 sm:px-6 sm:py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-mourid-green transition"
          >
            Learn More
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll to About Section">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}