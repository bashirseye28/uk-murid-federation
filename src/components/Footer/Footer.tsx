'use client'

import Link from 'next/link'
import { Mail, Phone, Instagram, MessageCircle } from 'lucide-react'
import BackToTop from '@/components/Footer/BackToTop'

export default function Footer() {
  return (
    <footer className="relative bg-mourid-navy/95 text-white pt-16 pb-10">
      {/* Back to Top */}
      <BackToTop />

      <div className="max-w-7xl mx-auto px-6">
        {/* Branding & Motto */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-2">
            UK MURID FEDERATION
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm">
            Unity, Devotion, and Service in the Path of Cheikh Ahmadou Bamba
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-white/80 mb-10 text-center md:text-left">
          <div>
            <h3 className="font-semibold text-white mb-2">About</h3>
            <ul className="space-y-1">
              <li><Link href="/about" className="hover:text-mourid-green transition">Who We Are</Link></li>
              <li><Link href="/contact" className="hover:text-mourid-green transition">Leadership</Link></li>
              <li><Link href="/contact" className="hover:text-mourid-green transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Activities</h3>
            <ul className="space-y-1">
              <li><Link href="/bamba-day" className="hover:text-mourid-green transition">Bamba Day</Link></li>
              <li><Link href="/library" className="hover:text-mourid-green transition">Xassida Library</Link></li>
              <li><Link href="/programmes" className="hover:text-mourid-green transition">Weekly Programmes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Support</h3>
            <ul className="space-y-1">
              <li><Link href="/donate" className="hover:text-mourid-green transition">Donate</Link></li>
              <li><Link href="/partners" className="hover:text-mourid-green transition">Partners</Link></li>
              <li><Link href="/transparency" className="hover:text-mourid-green transition">Transparency</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact & Social Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-6 text-sm text-white/60">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+44 7888 356439</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>mouride.uk@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram" className="hover:text-white transition">
              <Instagram size={20} />
            </Link>
            <Link href="#" aria-label="WhatsApp" className="hover:text-white transition">
              <MessageCircle size={20} />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-white/50 mt-6">
          © 2025 UK Murid Federation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}