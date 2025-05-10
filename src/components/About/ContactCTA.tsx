"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="bg-mourid-navy py-16 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Get Involved?
        </h2>
        <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
          Join us in strengthening the Murid community across the UK. Whether
          you wish to participate, support, or simply learn more, we welcome
          you with open arms.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="bg-white text-mourid-green px-6 py-3 rounded-md text-sm font-semibold border border-transparent hover:bg-mourid-green hover:text-white transition"
          >
            Contact Us
          </Link>
          <Link
            href="/donate"
            className="border border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-white hover:text-mourid-green transition"
          >
            Donate Now
          </Link>
        </div>
      </motion.div>
    </section>
  );
}