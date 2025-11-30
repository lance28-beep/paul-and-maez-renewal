"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-screen">
        <Image
          src="/decoration/Hero Page.png"
          alt="Hero Page"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Monogram at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <Image
          src="/monogram/monogram.png"
          alt="Monogram"
          width={200}
          height={200}
          className="w-28 sm:w-36 md:w-44 lg:w-52 xl:w-64 h-auto"
          priority={false}
        />
      </div>

      {/* CTA Buttons Overlay */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-0 right-0 z-30 flex flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-center px-4">
        <a
          href="#messages"
          className="group px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-full font-semibold transition-all duration-300 ease-out uppercase tracking-wider text-sm sm:text-base md:text-lg border-2 backdrop-blur-sm bg-white/90 hover:bg-white"
          style={{
            borderColor: "#081623",
            color: "#081623",
            boxShadow: "0 4px 16px rgba(8, 22, 35, 0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#081623";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(8, 22, 35, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.color = "#081623";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(8, 22, 35, 0.25)";
          }}
        >
          Send Message
        </a>
        <a
          href="#guest-list"
          className="group px-8 sm:px-10 md:px-12 py-3.5 sm:py-4 md:py-4.5 rounded-full font-semibold transition-all duration-300 ease-out uppercase tracking-wider text-sm sm:text-base md:text-lg border-2"
          style={{
            backgroundColor: "#B38538",
            borderColor: "#B38538",
            color: "#ffffff",
            boxShadow: "0 4px 16px rgba(179, 133, 56, 0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d4af37";
            e.currentTarget.style.borderColor = "#d4af37";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(179, 133, 56, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#B38538";
            e.currentTarget.style.borderColor = "#B38538";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(179, 133, 56, 0.35)";
          }}
        >
          RSVP
        </a>
      </div>
    </section>
  )
}
