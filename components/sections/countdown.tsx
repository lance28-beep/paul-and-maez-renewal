"use client"

import { Section } from "@/components/section"
import { useState, useEffect } from "react"
import Counter from "@/components/Counter"
import Image from "next/image"

export function Countdown() {
  // Wedding date: December 22, 2025 at 2:00 PM
  const weddingDate = new Date('2025-12-22T14:00:00').getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Initial update
    updateCountdown()

    // Update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  return (
    <Section
      id="countdown"
      className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#d4af37]/3 to-transparent" />
      </div>

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

      {/* Header */}
      <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#081623] mb-4 sm:mb-6">
          Countdown to Our Special Day
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-[#081623]/80 font-light max-w-xl mx-auto leading-relaxed">
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container */}
      <div className="relative z-10">
      
        {/* Animated Countdown Timer */}
        <div className="mt-12 sm:mt-16 md:mt-20 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10 md:mb-12">
              <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-[#B38538]/60" />
              <div className="w-2 h-2 bg-[#B38538] rounded-full" />
              <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-l from-transparent to-[#B38538]/60" />
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#B38538]/10 to-[#d4af37]/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#B38538]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Counter
                    value={timeLeft.days}
                    places={timeLeft.days >= 100 ? [100, 10, 1] : [10, 1]}
                    fontSize={40}
                    padding={5}
                    gap={6}
                    textColor="#B38538"
                    fontWeight={900}
                    gradientFrom="transparent"
                    gradientTo="transparent"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#081623] uppercase tracking-widest">
                  Days
                </p>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#B38538]/10 to-[#d4af37]/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#B38538]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Counter
                    value={timeLeft.hours}
                    places={[10, 1]}
                    fontSize={40}
                    padding={5}
                    gap={6}
                    textColor="#B38538"
                    fontWeight={900}
                    gradientFrom="transparent"
                    gradientTo="transparent"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#081623] uppercase tracking-widest">
                  Hours
                </p>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#B38538]/10 to-[#d4af37]/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#B38538]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Counter
                    value={timeLeft.minutes}
                    places={[10, 1]}
                    fontSize={40}
                    padding={5}
                    gap={6}
                    textColor="#B38538"
                    fontWeight={900}
                    gradientFrom="transparent"
                    gradientTo="transparent"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#081623] uppercase tracking-widest">
                  Minutes
                </p>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-[#B38538]/10 to-[#d4af37]/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-[#B38538]/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Counter
                    value={timeLeft.seconds}
                    places={[10, 1]}
                    fontSize={40}
                    padding={5}
                    gap={6}
                    textColor="#B38538"
                    fontWeight={900}
                    gradientFrom="transparent"
                    gradientTo="transparent"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#081623] uppercase tracking-widest">
                  Seconds
                </p>
              </div>
            </div>

            {/* Bottom decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-8 sm:mt-10 md:mt-12">
              <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent to-[#B38538]/60" />
              <div className="w-2 h-2 bg-[#B38538] rounded-full" />
              <div className="h-px w-12 sm:w-16 md:w-24 bg-gradient-to-l from-transparent to-[#B38538]/60" />
            </div>
          </div>
        </div>
          {/* Wedding date presentation - Save The Date Card Style */}
          <div className="flex justify-center px-4">
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
              
              {/* Save The Date text */}
              <p className="text-xs sm:text-sm md:text-base font-sans font-medium text-[#B38538] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                Save The Date
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#081623] leading-none" style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300
                }}>
                  December
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-serif font-bold text-[#B38538] leading-none" style={{
                  textShadow: "0 4px 20px rgba(179, 133, 56, 0.2)"
                }}>
                  22
                </p>
                
                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-[#B38538]/50" />
                
                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#081623] leading-none">
                  2025
                </p>
              </div>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative dots */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
              
              {/* Time */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-sans font-medium text-[#B38538] tracking-wide mb-3 sm:mb-4">
                2:00 PM
              </p>
              
              {/* Bottom decorative dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/40 rounded-full" />
                <div className="w-1 h-1 bg-[#B38538]/60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
