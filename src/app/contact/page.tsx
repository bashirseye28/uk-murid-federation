import Head from "next/head";

import ContactHero from '@/components/Contact/ContactHero'
import ContactInfo from '@/components/Contact/ContactInfo'
import ContactForm from '@/components/Contact/ContactForm'
import ContactCTA from '@/components/About/ContactCTA'


export default function Page() {
  return (

    <>
      {/* SEO Head Tags */}
      <Head>
        <title>Contact Us | UK Murid Federation</title>
        <meta
          name="description"
          content="Get in touch with the UK Murid Federation. We welcome your questions, feedback, and inquiries about our activities and community."
        />
        <meta
          name="keywords"
          content="Contact UK Murid Federation, Murid Dahiras UK, Cheikh Ahmadou Bamba, Sufism UK, Islamic Community UK"
        />
        <meta property="og:title" content="Contact Us | UK Murid Federation" />
        <meta
          property="og:description"
          content="Get in touch with the UK Murid Federation. We welcome your questions, feedback, and inquiries about our activities and community."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murid.co.uk/contact" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="UK Murid Federation" />
        <meta property="og:locale" content="en_GB" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://murid.co.uk/contact" />
      </Head>

      {/* Contact Page Content */}  
    <div>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </div>
    </>
  );
}