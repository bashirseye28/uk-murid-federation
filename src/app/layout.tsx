import '@/styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export const metadata: Metadata = {
  title: 'UK MURID FEDERATION',
  description: 'Official website of the UK Murid Communities Federation, promoting the teachings of Cheikh Ahmadou Bamba and uniting Mourid Dahiras across the UK.',
  keywords: [
    'Mourid', 'Cheikh Ahmadou Bamba', 'Touba', 'Magal', 'UK Murid Federation',
    'Bamba Day', 'Addiya', 'Dahira', 'Islam UK', 'Mouridiyya', 'Sufism', 'Xassida'
  ],
  authors: [{ name: 'UK Murid Federation' }],
  creator: 'UK Murid Federation',
  metadataBase: new URL('https://ukmurid.org'),
  openGraph: {
    title: 'UK MURID FEDERATION',
    description: 'Connecting Mourid Dahiras in the UK to the spiritual legacy of Cheikh Ahmadou Bamba.',
    url: 'https://ukmurid.org',
    siteName: 'UK Murid Federation',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'UK Murid Federation Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  themeColor: '#2e5b43',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts: Montserrat + Lato */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}