'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSent(false)
    setError(false)
    setLoading(true)

    const formData = new FormData(formRef.current!)
    const honeypot = formData.get('honeypot')

    // 🛡️ Honeypot check
    if (honeypot) {
      console.log('Bot detected, ignoring submission.')
      setLoading(false)
      return
    }

    try {
      // 1️⃣ Send to admin
      await emailjs.sendForm(
        'service_da47nxt',      // ✅ Your Service ID
        'template_i5n715u',     // ✅ Admin template (Contact_Admin)
        formRef.current!,
        'LDXWWULCFG4rGteBF'     // ✅ Your Public Key
      )

      // 2️⃣ Send confirmation to user
      try {
        await emailjs.send(
          'service_da47nxt',      // ✅ Your Service ID
          'template_fypfrtn',     // ✅ Auto-Reply template (Contact_Confirmation)
          {
            name: formData.get('name'),
            email: formData.get('email'),  // ✅ This must match your EmailJS template field
            subject: formData.get('title'),
            message: formData.get('message'),
          },
          'LDXWWULCFG4rGteBF'
        )
      } catch (userErr) {
        console.error('User confirmation email failed:', userErr)
        // Not blocking success if user email fails
      }

      console.log('Admin + User emails sent.')
      setIsSent(true)
      formRef.current?.reset()
    } catch (err) {
      console.error('Admin email failed:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 border border-gray-100"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-mourid-green mb-6">
          Contact Us
        </h2>

        {isSent && (
          <div
            className="mb-4 text-green-600 text-center text-sm font-medium"
            aria-live="polite"
          >
            ✅ Thank you! Your message has been received successfully. We'll be in touch soon.
          </div>
        )}

        {error && (
          <div
            className="mb-4 text-red-500 text-center text-sm font-medium"
            aria-live="polite"
          >
            ⚠️ Oops, something went wrong while sending your message. Please try again later or email us directly at{' '}
            <a href="mailto:mouride.uk@gmail.com" className="underline">mouride.uk@gmail.com</a>.
          </div>
        )}

        <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
          {/* 🕵️ Honeypot */}
          <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-mourid-green focus:border-mourid-green"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-block bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  )
}