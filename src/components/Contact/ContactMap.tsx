'use client'

export default function ContactMap() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-heading text-mourid-green font-bold mb-6 text-center">
          Find Us
        </h3>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.219151676645!2d-2.410495923798148!3d53.557845872372526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba90264ff5f1b%3A0x7f8dcb04b2d30f6e!2s3%20Hesketh%20Walk%2C%20Farnworth%2C%20Bolton%20BL4%209EY%2C%20UK!5e0!3m2!1sen!2suk!4v1715440000000!5m2!1sen!2suk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  )
}