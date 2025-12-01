"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Clock, Utensils, Car, Shirt, Copy, Check, Navigation, Heart, X, MapPin, Sparkles, Camera } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageModal) {
        setShowImageModal(null)
      }
    }
    
    if (showImageModal) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`
  const preweddingMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.prewedding.location)}`

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ backgroundColor: "#081623" }}>
      <Section id="details" className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/decoration/galleryNewBG.jpg"
            alt="Details background"
            fill
            className="object-cover object-center"
            priority={false}
            quality={90}
          />
        </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
          Event Details
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-light max-w-xl mx-auto leading-relaxed">
          Everything you need to know about our special day
        </p>
        
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
          {/* <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-[#B38538]/50" />
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B38538] rounded-full" />
          <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-[#B38538]/50" /> */}
        </div>
      </div>

      {/* Pre-wedding Makeup Location */}
      <div className="relative z-10 mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <div 
          className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-hidden max-w-5xl mx-auto"
          onMouseEnter={() => setHoveredCard('prewedding')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Simplified decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B38538]/15 via-[#74A0C5]/10 to-transparent rounded-full blur-2xl opacity-30" />
          
          {/* Header with icon and title */}
          <div className="flex items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="bg-gradient-to-br from-[#B38538]/30 via-[#74A0C5]/20 to-[#B38538]/30 p-1.5 sm:p-2 rounded-xl flex-shrink-0">
                <Sparkles className="text-[#081623] w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#081623] truncate">Pre-wedding Prep</h3>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => openInMaps(preweddingMapsLink)}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Open in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.prewedding.location, 'prewedding')}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Copy venue details"
              >
                {copiedItems.has('prewedding') ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          {/* Venue info */}
          <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 relative z-10">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#081623]">{siteConfig.prewedding.venue}</p>
            <p className="text-[10px] sm:text-xs text-[#081623] opacity-70">{siteConfig.prewedding.address}</p>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#081623]">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
              <span>{siteConfig.prewedding.purpose}</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="mb-2 sm:mb-3">
            <div 
              className="relative w-full h-28 sm:h-36 md:h-44 rounded-xl overflow-hidden shadow-md cursor-pointer group/image transition-all duration-300 hover:shadow-lg border border-[#081623]/10"
              onClick={() => setShowImageModal('prewedding')}
            >
              <Image
                src="/Details/BellaAntheaResort.jpg"
                alt={siteConfig.prewedding.location}
                fill
                className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 shadow-xl">
                    <Camera className="text-[#081623] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Row layout on mobile */}
          <div className="flex flex-row gap-2 sm:gap-3 relative z-10">
            <button
              onClick={() => openInMaps(preweddingMapsLink)}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            >
              <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Directions</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.prewedding.location, 'prewedding-action')}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#B38538] text-[#081623] rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:bg-[#74A0C5]/10"
            >
              {copiedItems.has('prewedding-action') ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span>{copiedItems.has('prewedding-action') ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ceremony and Reception */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
        {/* Ceremony */}
        <div 
          className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('ceremony')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B38538]/15 via-[#74A0C5]/10 to-transparent rounded-full blur-2xl opacity-30" />
          
          <div className="flex items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="bg-gradient-to-br from-[#B38538]/30 via-[#74A0C5]/20 to-[#B38538]/30 p-1.5 sm:p-2 rounded-xl flex-shrink-0">
                <Heart className="text-[#081623] w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#081623]">Ceremony</h3>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Open in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.ceremony.location, 'ceremony')}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Copy ceremony details"
              >
                {copiedItems.has('ceremony') ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 relative z-10">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#081623]">{siteConfig.ceremony.venue}</p>
            <p className="text-[10px] sm:text-xs text-[#081623] opacity-70">{siteConfig.ceremony.address}</p>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#081623]">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
              <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
            </div>
          </div>
          
          <div className="mb-2 sm:mb-3">
            <div 
              className="relative w-full h-28 sm:h-36 md:h-44 rounded-xl overflow-hidden shadow-md cursor-pointer group/image transition-all duration-300 hover:shadow-lg border border-[#081623]/10"
              onClick={() => setShowImageModal('ceremony')}
            >
              <Image
                src="/Details/Holy CrossparishofCarigara.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 shadow-xl">
                    <Camera className="text-[#081623] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 sm:gap-3 relative z-10">
            <button
              onClick={() => openInMaps(ceremonyMapsLink)}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            >
              <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Directions</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.ceremony.location, 'ceremony-action')}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#B38538] text-[#081623] rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:bg-[#74A0C5]/10"
            >
              {copiedItems.has('ceremony-action') ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span>{copiedItems.has('ceremony-action') ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Reception */}
        <div 
          className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-hidden"
          onMouseEnter={() => setHoveredCard('reception')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B38538]/15 via-[#74A0C5]/10 to-transparent rounded-full blur-2xl opacity-30" />
          
          <div className="flex items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="bg-gradient-to-br from-[#B38538]/30 via-[#74A0C5]/20 to-[#B38538]/30 p-1.5 sm:p-2 rounded-xl flex-shrink-0">
                <Utensils className="text-[#081623] w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#081623]">Reception</h3>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Open in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(siteConfig.reception.location, 'reception')}
                className="p-1.5 sm:p-2 text-[#081623]/70 hover:text-[#081623] hover:bg-[#081623]/5 rounded-lg transition-all duration-300"
                title="Copy reception details"
              >
                {copiedItems.has('reception') ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3 relative z-10">
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#081623]">{siteConfig.reception.venue}</p>
            <p className="text-[10px] sm:text-xs text-[#081623] opacity-70">{siteConfig.reception.address}</p>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-[#081623]">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
              <span>{siteConfig.reception.date} - {siteConfig.reception.time}</span>
            </div>
          </div>

          <div className="mb-2 sm:mb-3">
            <div 
              className="relative w-full h-28 sm:h-36 md:h-44 rounded-xl overflow-hidden shadow-md cursor-pointer group/image transition-all duration-300 hover:shadow-lg border border-[#081623]/10"
              onClick={() => setShowImageModal('reception')}
            >
              <Image
                src="/Details/KangaraGymnasium.jpg"
                alt={siteConfig.reception.location}
                fill
                className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-2.5 shadow-xl">
                    <Camera className="text-[#081623] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-2 sm:gap-3 relative z-10">
            <button
              onClick={() => openInMaps(receptionMapsLink)}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
            >
              <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Directions</span>
            </button>
            <button
              onClick={() => copyToClipboard(siteConfig.reception.location, 'reception-action')}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#B38538] text-[#081623] rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:bg-[#74A0C5]/10"
            >
              {copiedItems.has('reception-action') ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span>{copiedItems.has('reception-action') ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="relative z-10 mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 sm:mb-3 text-[#FFFFFF] drop-shadow-md">Important Information</h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-[#FFFFFF]/90 font-light">Everything you need to know</p>
          
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-3 md:mt-4">
            <div className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-r from-transparent to-[#B38538]/50" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B38538] rounded-full" />
            <div className="h-px w-8 sm:w-10 md:w-12 bg-gradient-to-l from-transparent to-[#B38538]/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Dress Code */}
          <div className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/20 to-[#FFFFFF] backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-lg transition-all duration-500 hover:scale-[1.01] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#74A0C5]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="bg-[#74A0C5]/25 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                <Shirt className="text-[#081623] w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm md:text-base text-[#081623]">Dress Code</h4>
            </div>
            
            <div className="mb-2 sm:mb-3">
              <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] bg-[#74A0C5]/25 px-2 py-1 rounded-full">{typeof siteConfig.dressCode === 'object' ? siteConfig.dressCode.theme : siteConfig.dressCode}</span>
            </div>

            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.colors && (
              <div className="mb-2 sm:mb-3">
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] mb-1.5 sm:mb-2">Color Palette</p>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {siteConfig.dressCode.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full shadow-sm border border-white ring-1 ring-[#B38538]/20"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.sponsors && (
              <div className="mb-2 sm:mb-3 bg-white/50 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/20">
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] mb-1">Principal Sponsors</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-80 mb-0.5">Ladies: {siteConfig.dressCode.sponsors.ladies}</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-80">Gentlemen: {siteConfig.dressCode.sponsors.gentlemen}</p>
              </div>
            )}

            {typeof siteConfig.dressCode === 'object' && siteConfig.dressCode.guests && (
              <div className="bg-white/50 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/20">
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] mb-1">Guests</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-80 mb-0.5">Ladies: {siteConfig.dressCode.guests.ladies}</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-80 mb-1.5">Gentlemen: {siteConfig.dressCode.guests.gentlemen}</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-medium text-[#081623] bg-[#74A0C5]/20 px-1.5 py-1 rounded">⚠️ {siteConfig.dressCode.note}</p>
              </div>
            )}
          </div>

          {/* Travel & Parking */}
          <div className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/20 to-[#FFFFFF] backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-lg transition-all duration-500 hover:scale-[1.01] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#74A0C5]/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 relative z-10">
              <div className="bg-[#74A0C5]/25 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                <Car className="text-[#081623] w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm md:text-base text-[#081623]">Parking & Travel</h4>
            </div>
            
            <div className="space-y-2 sm:space-y-2.5">
              <div className="bg-white/50 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/20">
                <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
                  <div className="bg-[#74A0C5]/20 p-1 rounded-full mt-0.5 flex-shrink-0">
                    <Car className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#081623]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] mb-0.5">Parking Available</p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-70 leading-relaxed">
                      Ample parking at both venues. Arrive 15-20 min early.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/20">
                <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
                  <div className="bg-[#74A0C5]/20 p-1 rounded-full mt-0.5 flex-shrink-0">
                    <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#081623]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#081623] mb-0.5">Transportation</p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-70 leading-relaxed mb-1">
                      💡 Book transportation ahead for stress-free day
                    </p>
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#081623] opacity-70 leading-relaxed">
                      Taxis, tricycles & private vehicles welcome.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#081623]/80 to-[#172652]/70 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/30">
                <p className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#FFFFFF] mb-1 flex items-center gap-1">
                  <span className="text-xs">📍</span>
                  Quick Tips
                </p>
                <ul className="text-[8px] sm:text-[9px] md:text-[10px] text-[#FFFFFF] space-y-0.5 sm:space-y-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFFFFF] mt-0.5">•</span>
                    <span>Plan route ahead to avoid delays</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFFFFF] mt-0.5">•</span>
                    <span>Wear comfortable shoes</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#FFFFFF] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#081623]/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B38538]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-white via-white to-[#FFFFFF]/20 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B38538]/30 animate-in zoom-in-95 duration-500 group relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#081623] via-[#B38538] to-[#081623]" />
            
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-20 bg-white/95 hover:bg-white backdrop-blur-sm p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-[#B38538]/40"
              title="Close (ESC)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#081623] hover:text-red-500 transition-colors" />
            </button>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-[#B38538]/40">
                {showImageModal === 'ceremony' ? (
                  <>
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#081623]" fill="currentColor" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#081623]">Ceremony</span>
                  </>
                ) : showImageModal === 'reception' ? (
                  <>
                    <Utensils className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#081623]" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#081623]">Reception</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#081623]" />
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-[#081623]">Pre-wedding</span>
                  </>
                )}
              </div>
            </div>

            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] bg-gradient-to-br from-[#081623]/5 via-white/80 to-[#74A0C5]/15 overflow-hidden">
              <Image
                src={
                  showImageModal === 'ceremony' 
                    ? "/Details/Holy CrossparishofCarigara.png" 
                    : showImageModal === 'reception'
                    ? "/Details/KangaraGymnasium.jpg"
                    : "/Details/BellaAntheaResort.jpg"
                }
                alt={
                  showImageModal === 'ceremony' 
                    ? siteConfig.ceremony.location 
                    : showImageModal === 'reception'
                    ? siteConfig.reception.location
                    : siteConfig.prewedding.location
                }
                fill
                className="object-contain p-4 sm:p-6 md:p-8 transition-transform duration-700 group-hover:scale-105"
                sizes="95vw"
                priority
              />
            </div>

            <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-white to-white/95 backdrop-blur-sm border-t-2 border-[#B38538]/30 relative">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#B38538]/40 to-transparent" />
              
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                  <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold flex items-center gap-2 text-[#081623]">
                      {showImageModal === 'ceremony' ? (
                        <>
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#B38538]" fill="currentColor" />
                          {siteConfig.ceremony.venue}
                        </>
                      ) : showImageModal === 'reception' ? (
                        <>
                          <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#B38538]" />
                          {siteConfig.reception.venue}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B38538]" />
                          {siteConfig.prewedding.venue}
                        </>
                      )}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm text-[#081623] opacity-70">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
                      <span className="truncate">
                        {showImageModal === 'ceremony' 
                          ? siteConfig.ceremony.location 
                          : showImageModal === 'reception'
                          ? siteConfig.reception.location
                          : siteConfig.prewedding.location
                        }
                      </span>
                    </div>

                    {showImageModal === 'ceremony' && (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[#081623] bg-[#74A0C5]/20 px-2 py-1 rounded-lg border border-[#B38538]/20 w-fit">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
                        <span>{siteConfig.ceremony.date} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === 'reception' && (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[#081623] bg-[#74A0C5]/20 px-2 py-1 rounded-lg border border-[#B38538]/20 w-fit">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
                        <span>{siteConfig.reception.date} - {siteConfig.reception.time}</span>
                      </div>
                    )}
                    {showImageModal === 'prewedding' && (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs md:text-sm font-medium text-[#081623] bg-[#74A0C5]/20 px-2 py-1 rounded-lg border border-[#B38538]/20 w-fit">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B38538] flex-shrink-0" />
                        <span>{siteConfig.prewedding.purpose}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-row items-stretch gap-2 sm:gap-2.5">
                    <button
                      onClick={() => copyToClipboard(
                        showImageModal === 'ceremony' 
                          ? siteConfig.ceremony.location
                          : showImageModal === 'reception'
                          ? siteConfig.reception.location
                          : siteConfig.prewedding.location,
                        `modal-${showImageModal}`
                      )}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-white border border-[#B38538] text-[#081623] rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:bg-[#74A0C5]/10"
                      title="Copy address"
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => openInMaps(
                        showImageModal === 'ceremony' 
                          ? ceremonyMapsLink 
                          : showImageModal === 'reception'
                          ? receptionMapsLink
                          : preweddingMapsLink
                      )}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
                    >
                      <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs text-[#081623] opacity-60">
                  <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Click outside to close • Press ESC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </Section>
    </div>
  )
}
