'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

const allImages = [
  'https://res.cloudinary.com/drulwmdhg/image/upload/v1748495447/zcfvgfvwzzvdxfuroqtz.jpg',
  'https://res.cloudinary.com/drulwmdhg/image/upload/v1748300816/WhatsApp_Image_2025-05-21_at_10.35.45_1_d6oqzm.jpg',
  'https://res.cloudinary.com/drulwmdhg/image/upload/v1748492377/r7gbi9yntu0qefd9liq4.jpg',
  'https://res.cloudinary.com/drulwmdhg/image/upload/v1748492377/nikxgcblhke815jtedvk.jpg',
  'https://res.cloudinary.com/drulwmdhg/image/upload/v1748667151/vbxeo1vfyhnsc9srgp7u.jpg',
  'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760011/473539860_600420189604568_4480630457597183605_n.jpg_mjztyn.jpg'
]

function getRandomImages(images: string[], count: number): string[] {
  const shuffled = [...images].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function GalleryPreview() {
  const previewImages = getRandomImages(allImages, 3)

  return (
    <motion.section
      id="gallery"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: 0.1, ease: 'easeInOut' }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      className="bg-slate-50 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-mourid-green mb-4">
          Gallery
        </h2>
        <p className="text-base md:text-lg font-sans text-slate-700 mb-10 max-w-2xl mx-auto">
          A glimpse into the spiritual and communal life of the UK Murid Federation.
        </p>

        <Gallery>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {previewImages.map((src, index) => (
              <Item
                key={index}
                original={src}
                thumbnail={src}
                width="1200"
                height="800"
                caption={`Gallery image ${index + 1}`}
              >
                {({ ref, open }) => (
                  <div
                    ref={ref}
                    onClick={(e) => open(e)}
                    className="w-full aspect-[3/2] rounded-md overflow-hidden shadow-md cursor-pointer bg-white flex items-center justify-center"
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                    />
                  </div>
                )}
              </Item>
            ))}

            {/* Hidden Items: allow navigation through all images in lightbox */}
            {allImages
              .filter((src) => !previewImages.includes(src))
              .map((src, index) => (
                <Item
                  key={`hidden-${index}`}
                  original={src}
                  thumbnail={src}
                  width="1200"
                  height="800"
                  caption={`Gallery image`}
                >
                  {() => <span style={{ display: 'none' }} />}
                </Item>
              ))}
          </div>
        </Gallery>

        <Link
          href="/gallery"
          className="inline-block border border-mourid-green text-mourid-green px-5 py-2 rounded-md text-sm font-semibold hover:bg-mourid-green hover:text-white transition"
        >
          View Full Gallery
        </Link>
      </div>
    </motion.section>
  )
}