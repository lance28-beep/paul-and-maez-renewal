"use client"

import Image from "next/image"

export function IntroImage() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Full bleed image intro */}
      <Image
        src="/gallery/IMG_6173.jpeg"
        alt="Paul and Maez full portrait"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" aria-hidden />
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <p
          className="text-xl sm:text-2xl md:text-3xl text-center tracking-[0.3em] transform translate-y-16 sm:translate-y-20"
          style={{
            color: "#C69815",
            fontFamily: '"Playfair Display", serif',
            letterSpacing: "0.3em",
          }}
        >
          12 December 2025
        </p>
      </div>
    </section>
  )
}

