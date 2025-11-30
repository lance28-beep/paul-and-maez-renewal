"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Section } from "@/components/section"
import CircularGallery from "@/components/CircularGallery"
import Image from "next/image"

const galleryItems = [
  { image: "/gally/couple (1).JPG", text: "Love" },
  { image: "/gally/couple (5).JPG", text: "Forever" },
  { image: "/gally/couple (10).JPG", text: "Our Story" },
  { image: "/gally/couple (15).JPG", text: "Together" },
  { image: "/gally/couple (20).JPG", text: "Always" },
  { image: "/gally/couple (44).JPG", text: "Moments" },
  { image: "/gally/couple (30).JPG", text: "Memories" },
  { image: "/gally/couple (35).JPG", text: "Special" },
  { image: "/gally/couple (40).JPG", text: "Beautiful" },
  { image: "/gally/couple (45).JPG", text: "Joy" },
  { image: "/gally/couple (50).JPG", text: "Happiness" },
  { image: "/gally/couple (55).JPG", text: "Cherished" },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <div style={{ backgroundColor: "#081623" }}>
      <Section
        id="gallery"
        className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/decoration/galleryNewBG.jpg"
            alt="Gallery background"
            fill
            className="object-cover object-center"
            priority={false}
            quality={90}
          />
        </div>

        {/* Enhanced gradient overlays for depth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#081623]/85 via-[#081623]/80 to-[#081623]/85" />
          
          {/* Soft accent gradients */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#D4AF37]/8 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#D4AF37]/8 to-transparent" />
          
          {/* Subtle side gradients */}
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#172652]/20 to-transparent" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#172652]/20 to-transparent" />
        </div>

      {/* Header - compact */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        {/* Our Moments Container */}
        <div className="inline-block bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-lg sm:rounded-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 shadow-lg mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
            Our Moments
          </h2>
        </div>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
          <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#D4AF37] rounded-full" />
          <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </div>

      {/* Circular Gallery Content - compact */}
      <div className="relative z-10 w-full px-2 sm:px-3 md:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-[3px] border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] relative">
              <CircularGallery 
                items={galleryItems}
                bend={3}
                textColor="#D4AF37"
                borderRadius={0.05}
                scrollEase={0.02}
                scrollSpeed={2}
                font="bold 24px sans-serif"
              />
            </div>
          )}
          
          {/* Helper text for interaction - compact */}
          <div className="mt-2 sm:mt-3 md:mt-4 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 shadow-md">
              <p className="text-[10px] sm:text-xs md:text-sm text-white font-light">
                <span className="hidden sm:inline">Scroll or drag to explore our gallery</span>
                <span className="sm:hidden">Swipe to explore our gallery</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
              {/* Image counter */}
              <div className="bg-[#172652]/60 backdrop-blur-md rounded-full px-4 py-2 border border-[#B38538]/50">
                <span className="text-sm sm:text-base font-medium text-[#B38538]">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-[#172652]/60 hover:bg-[#304C7E]/80 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-200 border border-[#B38538]/40 hover:border-[#B38538]/70"
                aria-label="Close lightbox"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#172652]/60 hover:bg-[#304C7E]/80 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[#B38538]/40 hover:border-[#B38538]/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-[#B38538]" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#172652]/60 hover:bg-[#304C7E]/80 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-[#B38538]/40 hover:border-[#B38538]/70"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-[#B38538]" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  style={{ 
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`, 
                    transition: pinchStartDist ? 'none' : 'transform 200ms ease-out' 
                  }}
                  className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain rounded-lg shadow-2xl will-change-transform"
                />
                
                {/* Zoom reset button */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-[#172652]/80 hover:bg-[#304C7E]/90 backdrop-blur-md text-[#B38538] rounded-full px-3 py-1.5 text-xs font-medium border border-[#B38538]/40 hover:border-[#B38538]/70 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-[#B38538]/80 bg-[#172652]/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#B38538]/30">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* View more button - compact */}
      <div className="relative z-10 mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex justify-center px-3 sm:px-4">
        <a
          href="/gallery"
          className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold sm:font-bold transition-all duration-300 uppercase tracking-wider text-[10px] sm:text-xs md:text-sm whitespace-nowrap relative overflow-hidden border-2 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.95)",
            borderColor: "rgba(212, 175, 55, 0.6)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D4AF37";
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.9)";
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(212, 175, 55, 0.6), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(212, 175, 55, 0.95)";
            e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.6)";
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0,0,0,0.3)";
          }}
        >
          <span className="relative z-10">View Full Gallery</span>
          <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-white" />
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
          />
        </a>
      </div>
      </Section>
    </div>
  )
}
