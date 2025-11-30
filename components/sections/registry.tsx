"use client"

import { Section } from "@/components/section"

export function Registry() {
  return (
    <Section id="registry" className="relative bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Section Header - compact */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 text-balance">
          Note or Gift
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 leading-relaxed">
          Your love, laughter, and presence on our special day is all we ask for
        </p>
      </div>

      {/* Content - compact */}
      <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-3 md:px-4">
        {/* Single unified card */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-[#B38538]/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden">
          {/* Inner gold border */}
          <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#B38538] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
          
          {/* Card content - compact */}
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
              {/* Main message */}
              <div className="text-center space-y-2 sm:space-y-3 max-w-2xl px-2 sm:px-4">
                <div className="relative py-3 sm:py-4 md:py-5">
                  {/* Decorative top border */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#B38538]/50 to-transparent"></div>
                  
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-sm sm:text-base md:text-lg text-[#081623] leading-relaxed font-sans">
                      Your love, laughter, and presence on our special day is all we ask for. Gifts are not expected, but if you feel inclined, we are grateful for your kindness.
                    </p>
                  </div>
                  
                  {/* Decorative bottom border */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-[#B38538]/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
