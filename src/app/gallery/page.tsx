import GalleryHero from "@/components/Gallery/GalleryHero";
import GalleryMedia from "@/components/Gallery/GalleryMedia";

export const metadata = {
  title: "Gallery | UK Murid Federation",
  description:
    "Browse our collection of videos and images showcasing the vibrant activities of Murid Dahiras across the UK.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />

        {/* Media Section */}
        <GalleryMedia />
      {/* Tabs + Content sections will go here next */}
    </>
  );
}