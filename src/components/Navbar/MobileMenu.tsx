'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <div className="md:hidden relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-mourid-green border border-mourid-yellow px-2 py-1 rounded-md"
        aria-label="Toggle mobile menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Drawer Menu */}
      {open && (
        <div className="fixed inset-0 bg-mourid-blue/90 backdrop-blur-sm z-50 px-6 pt-20 pb-10">
          {/* Close Icon */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-white hover:text-mourid-yellow"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Nav Links */}
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-4 px-1 border-b border-white/20 text-base text-white tracking-wide font-medium transition-all ${
                  pathname === item.href ? 'text-mourid-yellow font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}