"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  highlight?: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  ctaPrimaryIcon?: React.ReactNode;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  ctaSecondaryIcon?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  highlight,
  subtitle,
  image,
  ctaText,
  ctaLink,
  ctaPrimaryIcon,
  ctaSecondaryText,
  ctaSecondaryLink,
  ctaSecondaryIcon,
}) => {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center overflow-hidden pt-[70px]">
      {/* ✅ Background Image + Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* ✅ Hero Content */}
      <motion.div
        className="relative z-10 px-6 text-white flex flex-col items-center max-w-[90%] sm:max-w-3xl md:max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {highlight && <span className="text-mourid-gold">{highlight} </span>}
          {title}
        </h1>

        <p className="mt-4 text-sm sm:text-lg md:text-xl text-white/90">{subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {ctaText && ctaLink && (
            <Link href={ctaLink} className="inline-flex">
              <button className="px-6 py-3 bg-white text-mourid-green font-semibold rounded-lg shadow-md hover:bg-mourid-green hover:text-white transition flex items-center gap-2">
                {ctaPrimaryIcon} {ctaText}
              </button>
            </Link>
          )}
          {ctaSecondaryText && ctaSecondaryLink && (
            <Link href={ctaSecondaryLink} className="inline-flex">
              <button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-mourid-green transition flex items-center gap-2">
                {ctaSecondaryIcon} {ctaSecondaryText}
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;