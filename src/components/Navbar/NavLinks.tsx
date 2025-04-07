'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors duration-200 ${
            pathname === item.href
              ? 'text-mourid-gold'
              : 'text-slate-700 hover:text-mourid-green'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}