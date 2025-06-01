import Head from "next/head";
import GalleryHero from "@/components/Gallery/GalleryHero";
import GalleryMedia from "@/components/Gallery/GalleryMedia";
import ContactCTA from "@/components/About/ContactCTA";

export const metadata = {
  title: "Gallery | UK Murid Federation",
  description:
    "Browse our collection of videos and images showcasing the vibrant activities of Murid Dahiras across the UK.",
};

export default function GalleryPage() {
  return (
    <>
    {/* SEO Head Tags */}
      <Head>
        <title>Gallery | UK Murid Federation</title>
        <meta
          name="description"
          content="Browse our collection of videos and images showcasing the vibrant activities of Murid Dahiras across the UK."
        />
        <meta
          name="keywords"
          content="Murid Gallery, UK Murid Federation, Murid Dahira Activities, Cheikh Ahmadou Bamba, Murid Videos, Murid Images, Sufism UK"
        />
        <meta property="og:title" content="Gallery | UK Murid Federation" />
        <meta
          property="og:description"
          content="Browse our collection of videos and images showcasing the vibrant activities of Murid Dahiras across the UK."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://murid.co.uk/gallery" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="UK Murid Federation" />
        <meta property="og:locale" content="en_GB" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://murid.co.uk/gallery" />
      </Head>
      {/* Gallery Hero Section */}
      <GalleryHero />

        {/* Media Section */}
        <GalleryMedia />
      {/* Tabs + Content sections will go here next */}

      <ContactCTA />
    </>
  );
}