'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactInfo() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-heading text-mourid-green font-bold mb-8">
          Contact Information
        </h2>

        <div className="space-y-6 text-slate-700 text-base">
          <div className="flex items-center justify-center gap-3">
            <Mail size={20} className="text-mourid-green" />
            <span>mouride.uk@gmail.com</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone size={20} className="text-mourid-green" />
            <span>++44 7472 010308</span>
          </div>
{/* 
          <div className="flex items-center justify-center gap-3 text-center max-w-xs mx-auto">
            <MapPin size={20} className="text-mourid-green" />
            <span>
              3 Hesketh Walk, Farnworth,<br />
              Bolton, England, BL4 9EY
            </span>
          </div> */}
        </div>
      </div>
    </section>
  )
}