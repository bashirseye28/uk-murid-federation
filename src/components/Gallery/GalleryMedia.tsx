'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type GalleryItem = {
  src?: string
  alt: string
  description?: string
  video?: string
}

export default function GalleryMedia() {
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch(`/gallery.json?cb=${Date.now()}`) // Cache bust
        const data = await res.json()
        setGallery(data.reverse()) // Assuming latest items are last
      } catch (error) {
        console.error('Failed to load gallery:', error)
      }
    }

    loadGallery()
  }, [])

  const handleLoadMore = () => {
    const totalImages = gallery.filter(item => item.src).length
    setVisibleCount(prev => Math.min(prev + 6, totalImages))
  }

  const images = gallery.filter(item => item.src)
  const videos = gallery.filter(item => item.video)

  return (
    <section id="gallery" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* VIDEOS */}
        {videos.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-center mb-10">
              Featured Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {videos.map((video, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="shadow-lg rounded-lg overflow-hidden bg-gray-50 border"
                >
                  <div className="aspect-video">
                    <iframe
                      src={video.video}
                      title={video.alt}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-mourid-green">{video.alt}</h3>
                    <p className="text-sm text-slate-600">{video.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* IMAGES */}
        <h2 className="text-2xl md:text-3xl font-bold text-mourid-green text-center mb-10">
          Event Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.slice(0, visibleCount).map((img, idx) => (
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
                src={img.src!}
                alt={img.alt}
                width={600}
                height={400}
                className="object-cover w-full h-64"
              />
            </motion.div>
          ))}
        </div>

        {/* LOAD MORE */}
        {visibleCount < images.length && (
          <div className="mt-10 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-mourid-green text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700 transition"
            >
              Load More Images
            </button>
          </div>
        )}

        {/* TELEGRAM LINK */}
        {visibleCount >= images.length && (
          <div className="mt-10 text-center">
            <a
              href="https://t.me/UKmurid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-slate-800 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-slate-700 transition"
            >
              View Full Gallery on Telegram
            </a>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
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
              src={selectedImage.src!}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-auto max-h-[90vh] rounded"
            />
            <p className="text-center text-white mt-4">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </section>
  )
}