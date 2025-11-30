"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-visible bg-white">
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none">
        <Image
          src="/decoration/corner-top-left.png"
          alt="Corner decoration top left"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto"
          priority={false}
        />
      </div>
      <div className="absolute top-0 right-0 z-10 pointer-events-none">
        <Image
          src="/decoration/corner-top-left.png"
          alt="Corner decoration top right"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto scale-x-[-1]"
          priority={false}
        />
      </div>
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
        <Image
          src="/decoration/corner-right-down.png"
          alt="Corner decoration bottom right"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto"
          priority={false}
        />
      </div>

      {/* Decoration at top - mobile only */}
      <div className="absolute top-0 left-0 right-0 w-full h-[25%] sm:h-[30%] pointer-events-none z-10 md:hidden">
        <Image
          src="/decoration/goldernnavybluedecorationlower.png"
          alt="Decoration top"
          fill
          className="object-cover object-top scale-y-[-1]"
          priority={false}
          quality={90}
        />
      </div>

      {/* Decoration at bottom - mobile only */}
      <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 left-0 right-0 w-full h-[30%] sm:h-[35%] md:h-[40%] pointer-events-none z-50 md:hidden">
        <Image
          src="/decoration/goldernnavybluedecorationlower.png"
          alt="Decoration bottom"
          fill
          className="object-cover object-bottom"
          priority={false}
          quality={90}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-3 sm:py-6 md:py-8 lg:py-12">
        
        {/* Invitation Text Content */}
        <div className="flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 lg:px-8 flex-1 max-w-[90%] sm:max-w-[85%] md:max-w-none">
          {/* Monogram above couple's names */}
          <div className="flex-shrink-0 z-20 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <Image
              src="/monogram/monogram.png"
              alt="Monogram"
              width={300}
              height={300}
              className="w-32 sm:w-40 md:w-48 lg:w-64 xl:w-72 h-auto"
              priority
            />
          </div>

          {/* PAUL AND MAEZ */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              color: '#1a1a1a',
              fontWeight: 500
            }}
          >
            PAUL <span style={{ fontFamily: '"Montez", cursive', fontStyle: 'normal', color: '#B38538', fontSize: '0.6em' }}>and</span> MAEZ
          </h1>

          {/* With hearts full of love, */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.08em] mb-1 sm:mb-2 md:mb-3 leading-relaxed"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 400,
              fontStyle: 'italic'
            }}
          >
            With hearts full of love,
          </p>

          {/* we warmly invite you to join us */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.08em] mb-1 sm:mb-2 md:mb-3 leading-relaxed"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 400
            }}
          >
            we warmly invite you to join us
          </p>

          {/* as we celebrate a cherished milestone— */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.08em] mb-1 sm:mb-2 md:mb-3 leading-relaxed"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 400
            }}
          >
            as we celebrate a cherished milestone—
          </p>

          {/* The Renewal of Our Wedding Vows */}
          <h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight px-1"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 500
            }}
          >
            The Renewal of Our Wedding Vows
          </h2>

          {/* Honoring the love we began on */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.08em] mb-1 sm:mb-2 md:mb-3 leading-relaxed"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 400
            }}
          >
            Honoring the love we began on
          </p>

          {/* 22 December 2021 */}
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.08em] sm:tracking-[0.1em] md:tracking-[0.15em] mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 500
            }}
          >
            22 December 2021
          </p>

          {/* Set sail with us as we promise our forever once more. */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.08em] mb-2 sm:mb-3 md:mb-4 leading-relaxed px-1"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              color: '#1a1a1a',
              fontWeight: 400,
              fontStyle: 'italic'
            }}
          >
            Set sail with us as we promise our forever once more.
          </p>

        </div>

        {/* CTA Buttons Overlay - Positioned above decoration */}
        <div className="relative z-30 flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-center items-center px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8 lg:pb-12 mt-auto">
          <a
            href="#messages"
            className="group px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold transition-all duration-300 ease-out uppercase tracking-wider text-[10px] sm:text-xs md:text-sm lg:text-base border-2 backdrop-blur-sm bg-white/90 hover:bg-white"
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
            className="group px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold transition-all duration-300 ease-out uppercase tracking-wider text-[10px] sm:text-xs md:text-sm lg:text-base border-2"
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
      </div>
    </section>
  )
}
