import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Montserrat, Lato } from 'next/font/google';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat',
});

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
    'Murid', 'UK Murid', 'UK Murid Federation', 'Sheikh Ahmadou Bamba', 'Touba',
    'Magal', 'Dahira', 'Addiya', 'Bamba Day', 'Islam UK', 'Sufism UK', 'Muridiyya',
    'Mouride UK', 'Mouride Dahira', 'Murid London', 'Murid Manchester', 'Murid Birmingham',
    'Murid Cardiff', 'Murid Liverpool', 'Murid Sheffield', 'Murid Bristol', 'Murid Oxford',
    'Murid Cambridge', 'Murid Glasgow', 'Murid Edinburgh', 'Murid Leicester',
    'Murid Edinburgh', 'Murid Leicester', 'Murid Newcastle', 'Murid Nottingham',
    'Murid Southampton', 'Murid Coventry', 'Murid Wolverhampton', 'Murid Leeds',
    'Murid Leeds', 'Murid Scotland', 'Murid Community UK', 
    'Murid Community', 'Murid Spirituality', 'Murid Heritage', 'Murid Culture',
    'Murid Charity', 'Murid Events', 'Xassida', 'Cheikh Ahmadou Bamba UK'
  ],
  authors: [{ name: 'UK Murid Federation' }],
  creator: 'UK Murid Federation',
  metadataBase: new URL('https://murid.co.uk'),
  openGraph: {
    title: 'UK Murid Federation',
    description:
      'Connecting Murid Dahiras in the UK to the spiritual legacy of Sheikh Ahmadou Bamba.',
    url: 'https://murid.co.uk',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${montserrat.variable} ${lato.variable}`}>
      <head>
        {/* ✅ Canonical link for search engines */}
        <link rel="canonical" href="https://murid.co.uk" />
      </head>
      <body className="font-sans bg-white text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}