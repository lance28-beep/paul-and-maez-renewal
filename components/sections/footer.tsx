"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"

export function Footer() {
  const year = new Date().getFullYear()

  const quotes = [
    "In every love story, there's a moment when two hearts become one, and ours is just beginning.",
    "Two souls, one heart—forever entwined in the journey of love and faith together.",
    "Love is not about finding the perfect person, but learning to see an imperfect person perfectly."
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Snap & Share", href: "#snap-share" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  // Extract date parts from siteConfig
  const ceremonyDate = new Date(siteConfig.ceremony.date)
  const month = ceremonyDate.toLocaleString('default', { month: 'long' })
  const day = ceremonyDate.getDate()
  const yearDate = ceremonyDate.getFullYear()

  return (
    <footer 
      className="relative z-20 mt-8 sm:mt-12 md:mt-16 text-cream overflow-hidden bg-gradient-to-b from-[#081623] via-[#172652]/90 to-[#081623]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#B38538]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#B38538]/5 to-transparent" />
        
        {/* Decorative accent circles */}
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-[#304C7E]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-20 w-20 h-20 sm:w-24 sm:h-24 bg-[#74A0C5]/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-32 h-32 sm:w-40 sm:h-40 bg-[#304C7E]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 bg-[#74A0C5]/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Wedding date presentation - compact */}
        <motion.div className="flex justify-center px-2 sm:px-4 mb-6 sm:mb-8 md:mb-10" variants={fadeInUp}>
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-[10px] sm:text-xs md:text-sm font-sans font-medium text-[#B38538] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3">
                Save The Date
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
            </div>

            {/* Date Section - Compact Layout */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              {/* Month */}
              <div className="mb-2 sm:mb-3 md:mb-4">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#FFFFFF] leading-none">
                  {month}
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                {/* Day */}
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-[#B38538] leading-none drop-shadow-lg">
                  {day}
                </p>
                
                {/* Vertical divider */}
                <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-px bg-[#B38538]/50" />
                
                {/* Year */}
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light text-[#FFFFFF] leading-none">
                  {yearDate}
                </p>
              </div>
            </div>

            {/* Time Section - compact */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
              
              {/* Time */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium text-[#B38538] tracking-wide mb-2 sm:mb-3">
                {siteConfig.ceremony.time}
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-10" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info - compact */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-4 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3 font-sans text-white/95 text-sm sm:text-base md:text-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 flex-shrink-0" />
                  <span>{siteConfig.ceremony.day}, {siteConfig.ceremony.date}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 font-sans text-white/90 text-sm sm:text-base md:text-lg">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 flex-shrink-0" />
                  <span>{siteConfig.wedding.venue}</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/15" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className="font-sans text-white/95 italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-white/95 ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/70 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles - compact */}
          <motion.div className="space-y-4 sm:space-y-5 md:space-y-6" variants={fadeInUp}>
            <motion.div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </div>
                <h4 className="font-serif font-bold text-base sm:text-lg md:text-xl text-white">Ceremony</h4>
              </div>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 font-sans text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
                  <span className="break-words">{siteConfig.ceremony.venue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
                  <span>{siteConfig.ceremony.time}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/15 hover:bg-white/10 transition-all duration-300" whileHover={{ y: -5 }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </div>
                <h4 className="font-serif font-bold text-base sm:text-lg md:text-xl text-white">Reception</h4>
              </div>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 font-sans text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
                  <span className="break-words">{siteConfig.reception.venue}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
                  <span>{siteConfig.reception.time}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links - compact */}
          <motion.div className="space-y-5 sm:space-y-6 md:space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-serif font-bold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 sm:gap-3 text-white">
                <div className="w-1.5 h-6 sm:h-8 bg-white/50 rounded-full" /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com/airezjoy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a 
                  href="https://www.tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="TikTok"
                >
                  <Music2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
                <a 
                  href="https://www.twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-white/5 ring-1 ring-white/15 hover:bg-white/10 transition-colors hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-serif font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 text-white">Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a key={item.href} href={item.href} className="block text-white/80 hover:text-white transition-colors duration-200 font-sans text-xs sm:text-sm">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row - compact */}
        <motion.div className="border-t border-white/20 pt-4 sm:pt-6 md:pt-8" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <p className="text-white/85 font-sans text-xs sm:text-sm">© {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}. All rights reserved.</p>
              <p className="text-white/90 font-sans text-xs sm:text-sm mt-1">
                Made with 💕 for our special day
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className="text-white/80 font-sans text-[10px] sm:text-xs">
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-white/80 font-sans text-[10px] sm:text-xs">
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/50 hover:decoration-white/70"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
