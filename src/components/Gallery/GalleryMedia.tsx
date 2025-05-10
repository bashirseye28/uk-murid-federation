'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function GalleryMedia() {
  const images = [
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760011/473539860_600420189604568_4480630457597183605_n.jpg_mjztyn.jpg',
      alt: 'Bamba Day Celebration 1',
    },
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760243/473191330_600420586271195_1809947703813499228_n.jpg_xygr7n.jpg',
      alt: 'Bamba Day Celebration 2',
    },
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760294/469167614_570941672552420_4076537884719915247_n.jpg_rjdp44.jpg',
      alt: 'Bamba Day Celebration 3',
    },
    // Repeated to make 6 total
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760011/473539860_600420189604568_4480630457597183605_n.jpg_mjztyn.jpg',
      alt: 'Bamba Day Celebration 4',
    },
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760243/473191330_600420586271195_1809947703813499228_n.jpg_xygr7n.jpg',
      alt: 'Bamba Day Celebration 5',
    },
    {
      src: 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1746760294/469167614_570941672552420_4076537884719915247_n.jpg_rjdp44.jpg',
      alt: 'Bamba Day Celebration 6',
    },
  ]

  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null)

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* ====== VIDEOS Section ====== */}
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-centre mb-10">
          Featured Videos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Video 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shadow-lg rounded-lg overflow-hidden bg-gray-50 border"
          >
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/RwTJXIqChy0?si=xWoEHHddBhg_lilH"
                title="Bamba Day 2023 - UK Murid Federation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-mourid-green">
                Bamba Day Highlights 2023
              </h3>
              <p className="text-sm text-slate-600">
                A recap of Bamba Day celebrations organised by the UK Murid Federation.
              </p>
            </div>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shadow-lg rounded-lg overflow-hidden bg-gray-50 border"
          >
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/DRXFyG9ghZM?si=TD9klxwaSJfgbv_V"
                title="Kurel National - UK Murid Federation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-mourid-green">
                Kurel National - UK Murid Federation
              </h3>
              <p className="text-sm text-slate-600">
                Qasida group by the national Kurel, uniting Dahiras across the UK.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ====== IMAGES Section ====== */}
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-centre mb-10">
          Event Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="overflow-hidden rounded-lg shadow hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-centre justify-centre z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full px-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-auto max-h-[90vh] rounded"
            />
            <p className="text-centre text-white mt-4">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}