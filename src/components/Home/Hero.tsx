import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.svg"
        alt="Bamba Day UK 2025 Hero Background"
        fill
        className="object-cover z-0 brightness-75"
        priority
      />

      {/* Hero Content */}
      <div className="z-10 text-center px-6 max-w-4xl text-white animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight text-mourid-green drop-shadow-lg">
          YASTABSHIRUNA BINIHMATIN
        </h1>

        <h2 className="text-xl md:text-2xl font-sans font-light mb-6 tracking-wide text-white">
          BAMBA DAY UK 2025
        </h2>

        <p className="max-w-2xl mx-auto text-base md:text-lg font-sans mb-8 text-white/90">
          Uniting all Mourid Dahiras in the United Kingdom to honour the teachings of Cheikh Ahmadou Bamba.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
          <a
            href="/donate"
            className="bg-white text-mourid-green border border-mourid-green px-6 py-3 rounded-md text-sm font-semibold hover:bg-mourid-green hover:text-white transition"
          >
            Donate Now
          </a>
          <a
            href="/about"
            className="border border-white text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-white hover:text-mourid-green transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll to About Section">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}