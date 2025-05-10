'use client'

import { ClipboardCopy } from 'lucide-react'
import { useState } from 'react'

export default function BankDetails() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (label: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="bank-details" className="bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-heading text-mourid-green font-bold mb-4 text-center">
          Bank Transfer Details
        </h3>

        <ul className="space-y-4 text-sm md:text-base text-slate-800">
          <li className="flex justify-between items-center border-b pb-2">
            <span>Account Name:</span>
            <span className="font-semibold text-right">Yastabshiruna Binihmatin UK Murid Federation</span>
          </li>

          <li className="flex justify-between items-center">
            <span>Account Number:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">22864168</span>
              <button
                onClick={() => copyToClipboard('Account Number', '22864168')}
                className="text-mourid-green hover:text-mourid-blue transition"
              >
                <ClipboardCopy size={16} />
              </button>
            </div>
          </li>

          <li className="flex justify-between items-center">
            <span>Sort Code:</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold">30-99-50</span>
              <button
                onClick={() => copyToClipboard('Sort Code', '30-99-50')}
                className="text-mourid-green hover:text-mourid-blue transition"
              >
                <ClipboardCopy size={16} />
              </button>
            </div>
          </li>

          <li className="flex justify-between items-start pt-2">
            <span>Reference:</span>
            <span className="text-sm text-right text-slate-700 italic">
              “Barkeelu + Your Dahira Name”
            </span>
          </li>
        </ul>

        {copied && (
          <div className="text-sm text-green-600 text-center mt-4">
            ✅ {copied} copied to clipboard
          </div>
        )}
      </div>
    </section>
  )
}
