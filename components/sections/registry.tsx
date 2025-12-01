"use client"

import { Section } from "@/components/section"
import { SectionLabel } from "@/components/section-label"

export function Registry() {
  return (
    <Section id="registry" className="relative bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Section Header - compact */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <SectionLabel text="Note or Gift" tone="light" className="mb-4 sm:mb-5 mx-auto max-w-3xl" />
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 leading-relaxed">
          Your love, laughter, and presence on our special day is all we ask for
        </p>
      </div>

      {/* Content - compact */}
      <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-3 md:px-4">
        {/* Single unified card */}
        <div className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-hidden max-w-5xl mx-auto">
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
                  
                  <div className="mb-2 sm:mb-3 bg-white/50 rounded-lg p-2 sm:p-2.5 border border-[#B38538]/20">
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
