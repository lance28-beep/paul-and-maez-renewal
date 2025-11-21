"use client"

import { useEffect, useState, useMemo } from "react"
import { siteConfig } from "@/content/site"
import { Heart, Sparkles } from "lucide-react"

const desktopImages = [
    "/desktop-background/couple (1).jpg",
    "/desktop-background/couple (2).jpg",
    "/desktop-background/couple (3).jpg",
    "/desktop-background/couple (4).jpg",
]

const mobileImages = [
    "/mobile-background/couple (1).jpg",
    "/mobile-background/couple (2).jpg",
    "/mobile-background/couple (3).jpg",
    "/mobile-background/couple (4).jpg",
    "/mobile-background/couple (5).jpg",
    "/mobile-background/couple (6).jpg",
    "/mobile-background/couple (7).jpg",
    "/mobile-background/couple (8).jpg",
    "/mobile-background/couple (9).jpg",
    "/mobile-background/couple (10).jpg",
    "/mobile-background/couple (11).jpg",
    "/mobile-background/couple (12).jpg",
    "/mobile-background/couple (13).jpg",
    "/mobile-background/couple (14).jpg",
    "/mobile-background/couple (15).jpg",
    "/mobile-background/couple (16).jpg",
    "/mobile-background/couple (17).jpg",
    "/mobile-background/couple (18).jpg",
    "/mobile-background/couple (19).jpg",
    "/mobile-background/couple (20).jpg",
    "/mobile-background/couple (21).jpg",
    "/mobile-background/couple (22).jpg",
    "/mobile-background/couple (23).jpg",
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size and update isMobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    // Check on mount
    checkScreenSize()
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Get the appropriate image array based on screen size
  const backgroundImages = useMemo(() => {
    return isMobile ? mobileImages : desktopImages
  }, [isMobile])

  // Preload images progressively - show first image immediately
  useEffect(() => {
    setImagesLoaded(false)
    setCurrentImageIndex(0)
    
    // Load first image with priority to show it immediately
    const firstImg = new Image()
    firstImg.src = backgroundImages[0]
    firstImg.onload = () => {
      setImagesLoaded(true) // Show first image immediately
    }
    
    // Then preload a small lookahead set in background (avoid preloading all)
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && (navigator as any).connection?.saveData) return
      backgroundImages.slice(1, 3).forEach((src) => {
        const img = new Image()
        img.decoding = 'async'
        img.loading = 'lazy' as any
        img.src = src
      })
    }, 200)
  }, [backgroundImages])

  useEffect(() => {
    if (!imagesLoaded) return
    
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageTimer)
  }, [imagesLoaded, backgroundImages])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (imagesLoaded) {
      setIsVisible(true)
    }
  }, [imagesLoaded])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1e3a8a]">
      <div className="absolute inset-0 w-full h-full">
        {imagesLoaded && backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              willChange: "opacity",
            }}
          />
        ))}
        {/* Enhanced gradient overlay with better depth - Navy Blue theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/95 via-[#1e3a8a]/50 via-[#1e3a8a]/30 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e3a8a]/20 z-0" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-end min-h-screen pb-12 sm:pb-20 md:pb-28 lg:pb-40 xl:pb-48">
        <div className={`w-full max-w-4xl text-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Warm invitation line */}
          <div className="space-y-2 sm:space-y-3 mb-2 sm:mb-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-[#FFFFFF]/90 drop-shadow-lg tracking-wide uppercase">
              Together with their families
            </p>
            {/* Decorative divider with gold accent */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 py-1">
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              <Heart size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#d4af37] fill-[#d4af37]/40 drop-shadow-md animate-pulse" />
              <Sparkles size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#d4af37]/80 drop-shadow-md" />
              <Heart size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#d4af37] fill-[#d4af37]/40 drop-shadow-md animate-pulse" />
              <div className="h-px w-12 sm:w-16 md:w-20 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
            </div>
          </div>

          {/* Couple names - keeping the arrangement as requested */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-[0.02em] sm:tracking-[0.03em] md:tracking-[0.04em] drop-shadow-2xl leading-tight"
              style={{
                color: '#FFFFFF',
                textShadow: "0 2px 20px rgba(212, 175, 55, 0.4), 0 4px 40px rgba(30, 58, 138, 0.6), 0 8px 60px rgba(0, 0, 0, 0.5)",
                fontFamily: '"Shippori Mincho", serif',
                letterSpacing: "0.05em",
              }}
            >
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.groomNickname}
              </span>
              <span className="mx-2 sm:mx-3 md:mx-4 text-[#d4af37]">&</span>
              <span className="inline-block transform transition-all duration-700 hover:scale-105">
                {siteConfig.couple.brideNickname}
              </span>
            </h1>
            {/* Elegant divider */}
            <div className="h-0.5 sm:h-1 w-20 sm:w-24 md:w-32 lg:w-40 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </div>

          {/* Tagline with improved typography */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 pt-2 sm:pt-4">
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-[#FFFFFF]/90 drop-shadow-lg tracking-wide px-4"
              style={{
                textShadow: "0 2px 12px rgba(30, 58, 138, 0.8), 0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              joyfully invite you to celebrate a beautiful milestone—
            </p>
            <p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-normal text-[#d4af37] drop-shadow-lg tracking-wide"
              style={{
                textShadow: "0 2px 12px rgba(30, 58, 138, 0.8), 0 1px 4px rgba(0,0,0,0.7)",
                fontFamily: '"Shippori Mincho", serif',
              }}
            >
              {siteConfig.wedding.tagline}
            </p>
            <p
              className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-[#FFFFFF]/90 drop-shadow-lg tracking-wide px-4"
              style={{
                textShadow: "0 2px 12px rgba(30, 58, 138, 0.8), 0 1px 4px rgba(0,0,0,0.7)",
              }}
            >
              as they honor the love that began on <span className="font-semibold text-[#d4af37]">22 December 2021</span>
              <br />and continues to grow stronger each day.
            </p>

            {/* Date and time information */}
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3 pt-4">
              <p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-[#FFFFFF] drop-shadow-lg"
                style={{
                  textShadow: "0 2px 10px rgba(30, 58, 138, 0.8), 0 1px 3px rgba(0,0,0,0.7)",
                }}
              >
                {siteConfig.ceremony.day}, {siteConfig.ceremony.date}
              </p>
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-[#d4af37] drop-shadow-lg tracking-wider"
                style={{
                  textShadow: "0 2px 10px rgba(30, 58, 138, 0.9), 0 1px 4px rgba(212, 175, 55, 0.4)",
                }}
              >
                {siteConfig.ceremony.time} • {siteConfig.wedding.venue.toUpperCase()}
              </p>
            </div>
          </div>

          {/* CTA Buttons - Horizontal layout on all devices */}
          <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center max-w-2xl mx-auto w-full px-2">
            <a
              href="#messages"
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[160px] md:min-w-[180px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(30, 58, 138, 0.95)",
                borderColor: "rgba(212, 175, 55, 0.4)",
                color: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(30, 58, 138, 0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e3a8a";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.7)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(30, 58, 138, 0.6), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 58, 138, 0.95)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.4)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(30, 58, 138, 0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                Send Message
                <Heart size={12} className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
            <a
              href="#guest-list"
              className="group flex-1 max-w-[200px] sm:max-w-none sm:min-w-[160px] md:min-w-[180px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-500 ease-out uppercase tracking-wider text-xs sm:text-sm md:text-base whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.95)",
                borderColor: "rgba(30, 58, 138, 0.4)",
                color: "#1e3a8a",
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d4af37";
                e.currentTarget.style.borderColor = "rgba(30, 58, 138, 0.7)";
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(212, 175, 55, 0.6), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(30, 58, 138, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.95)";
                e.currentTarget.style.borderColor = "rgba(30, 58, 138, 0.4)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(-1px) scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                RSVP
                <Sparkles size={12} className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" />
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1e3a8a]/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
