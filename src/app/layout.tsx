import '@/styles/globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

// ✅ Google Fonts via next/font/google
import { Montserrat, Lato } from 'next/font/google';

// Set up Montserrat
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat',
});

// Set up Lato
const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'UK Murid Federation',
  description:
    'Official website of the UK Murid Communities Federation, promoting the teachings of Sheikh Ahmadou Bamba and uniting Murid Dahiras across the United Kingdom.',
  keywords: [
    'Murid', 'Sheikh Ahmadou Bamba', 'Touba', 'Magal', 'UK Murid Federation',
    'Bamba Day', 'Addiya', 'Dahira', 'Islam UK', 'Muridiyya', 'Sufism', 'Xassida'
  ],
  authors: [{ name: 'UK Murid Federation' }],
  creator: 'UK Murid Federation',
  metadataBase: new URL('https://ukmouride.co.uk'),
  openGraph: {
    title: 'UK Murid Federation',
    description:
      'Connecting Murid Dahiras in the UK to the spiritual legacy of Sheikh Ahmadou Bamba.',
    url: 'https://ukmouride.co.uk',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable} ${lato.variable}`}>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}