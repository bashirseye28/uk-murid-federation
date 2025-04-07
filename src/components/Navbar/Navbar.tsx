// src/components/Navbar/Navbar.tsx

import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="UK Murid Federation Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-lg md:text-xl font-heading font-semibold text-mourid-green tracking-wide">
            UK MURID FEDERATION
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  )
}