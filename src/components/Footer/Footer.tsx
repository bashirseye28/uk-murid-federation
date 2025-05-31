'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
} from 'lucide-react'
import BackToTop from '@/components/Footer/BackToTop'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-mourid-navy/90 text-white pt-12 pb-10 px-6 relative">
      {/* Back to Top */}
      <BackToTop />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Logo + About */}
        <div>
          <Image
            src="/logo.png"
            alt="UK Murid Federation Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-sm text-white/80 leading-relaxed">
            The UK Murid Federation unites Murid Dahiras across the United Kingdom,
            guided by the timeless teachings of Sheikh Ahmadou Bamba. We foster community, spirituality, and service.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4 tracking-wide">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Gallery', href: '/gallery' },
              { name: 'Donate', href: '/donate' },
              { name: 'Contact', href: '/contact' },
            ].map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:underline focus:outline-none focus:ring-2 focus:ring-mourid-green rounded"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div>
          <h4 className="text-lg font-bold mb-4 tracking-wide">Contact Us</h4>
          <p className="text-sm mb-3 flex items-center gap-2">
            <Mail size={16} aria-hidden="true" />
            <a
              href="mailto:yastabshirunabinihmatin@hotmail.com"
              className="underline hover:text-mourid-green focus:outline-none focus:ring-2 focus:ring-mourid-green rounded"
            >
              yastabshirunabinihmatin@hotmail.com
            </a>
          </p>
          <p className="text-sm mb-4 flex items-center gap-2">
            <Phone size={16} aria-hidden="true" />
            <a
              href="tel:+447472010308"
              className="underline hover:text-mourid-green focus:outline-none focus:ring-2 focus:ring-mourid-green rounded"
            >
              +44 7472 010308
            </a>
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a
              href="https://www.facebook.com/people/UK-Murid-Communities-Federation-Cic/100089097771167/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="hover:text-mourid-green transition"
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/yastabshiruna_uk_murid_federal/?igsh=MWRnOXIxMjMyeW82cA%3D%3D#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="hover:text-mourid-green transition"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@YASTABSHIRUNAUKTV-zu2ur"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="hover:text-mourid-green transition"
            >
              <Youtube className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/447888356439"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="hover:text-mourid-green transition"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://t.me/UKmurid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram"
              className="hover:text-mourid-green transition"
            >
              {/* Inline Telegram Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M9.46 14.87 9.19 19c.43 0 .62-.19.86-.41l2.08-1.97 4.3 3.15c.79.43 1.36.2 1.56-.74l2.82-13.3h.01c.25-1.2-.45-1.67-1.22-1.4L1.78 10.3c-1.18.46-1.17 1.1-.2 1.4l5.46 1.7 12.66-7.98c.6-.38 1.15-.17.7.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-xs text-white/70">
        © {currentYear} UK Murid Federation. All rights reserved.
      </div>
    </footer>
  )
}