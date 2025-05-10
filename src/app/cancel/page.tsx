'use client';

import Link from 'next/link';
import { XCircle } from 'lucide-react'; // ✅ Using Lucide icon
import { motion } from 'framer-motion';

export default function CancelPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50 text-center"
    >
      <div className="bg-white border shadow-lg rounded-lg p-8 max-w-lg w-full">
        {/* Icon */}
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
          Your Donation Was Not Completed
        </h1>

        {/* Message */}
        <p className="text-slate-600 mb-4">
          It seems your donation process was not finished. Don't worry—you can try again at any time.
        </p>

        <p className="text-sm text-slate-500 mb-6">
          Need help or have questions?{' '}
          <a
            href="mailto:mouride.uk@gmail.com"
            className="underline text-mourid-green hover:text-mourid-blue"
          >
            Contact our team
          </a>
          .
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/donate"
            className="inline-block bg-mourid-green text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-mourid-blue transition text-center"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block border border-slate-300 px-6 py-2 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-100 transition text-center"
          >
            Return Home
          </Link>
        </div>
      </div>

      {/* Optional Impact Message */}
      <p className="text-xs text-slate-400 mt-8 max-w-sm text-center">
        Every contribution makes a meaningful difference in supporting the UK Murid Federation’s initiatives. Thank you for your support.
      </p>
    </motion.section>
  );
}