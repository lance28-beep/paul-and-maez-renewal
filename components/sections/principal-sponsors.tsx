"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Section } from "@/components/section"

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

export function PrincipalSponsors() {
  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <h3 className={`anton-regular text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase text-[#BB8A3D] mb-1.5 sm:mb-2 md:mb-3 tracking-[0.12em] ${textAlign} ${className}`}>
        {children}
      </h3>
    )
  }

  // Helper component for name items with alignment
  const NameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 w-full`}>
        <p className={`text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium leading-snug break-words ${textAlign}`}>{name}</p>
      </div>
    )
  }

  // Remote data state
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSponsors = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data)
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Failed to load principal sponsors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  // Keep sponsors as pairs to ensure alignment
  const sponsorPairs = useMemo(() => 
    sponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor),
    [sponsors]
  )

  return (
    <Section
      id="sponsors"
      className="relative bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6]/90 to-[#1e3a8a] py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#d4af37]/5 to-transparent" />
      </div>

      {/* Section Header - compact on mobile */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FFFFFF] mb-1.5 sm:mb-2 md:mb-3 drop-shadow-md">
          Principal Sponsors
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-light max-w-xl mx-auto leading-relaxed">
          Our Beloved Godparents
        </p>
      </div>

      {/* Sponsors content - compact padding on mobile */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        {/* White card with elegant border */}
        <div className="relative bg-white/85 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Inner gold border - thinner on mobile */}
          <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#F1EDE2] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
          
          {/* Card content - compact padding on mobile */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            {/* Global font for Anton to match Entourage section */}
            <style jsx global>{`
              @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
              .anton-regular {
                font-family: "Anton", sans-serif;
                font-weight: 400;
                font-style: normal;
              }
            `}</style>
            <div className="relative z-10 w-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-3 sm:border-4 border-[#F1EDE2]/30 border-t-[#F1EDE2] rounded-full animate-spin" />
                    <span className="text-[#AFC8E6] font-serif text-sm sm:text-base md:text-lg">Loading sponsors...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="text-center">
                    <p className="text-red-500 font-serif text-sm sm:text-base md:text-lg mb-2">{error}</p>
                    <button
                      onClick={fetchSponsors}
                      className="text-[#AFC8E6] hover:text-[#D8B0B0] font-serif underline text-xs sm:text-sm"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : sponsorPairs.length === 0 ? (
                <div className="text-center py-16 sm:py-20 md:py-24">
                  <p className="text-[#AFC8E6] font-serif text-sm sm:text-base md:text-lg">No sponsors yet</p>
                </div>
              ) : (
                <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-1.5 sm:mb-2 md:mb-3">
                    <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">Male Principal Sponsors</SectionTitle>
                    <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">Female Principal Sponsors</SectionTitle>
                  </div>
                  <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-0.5 sm:gap-y-1 md:gap-y-1.5 items-stretch">
                    {sponsorPairs.map((pair, idx) => (
                      <>
                        <div key={`male-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.MalePrincipalSponsor ? (
                            <NameItem name={pair.MalePrincipalSponsor} align="right" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                        <div key={`female-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                          {pair.FemalePrincipalSponsor ? (
                            <NameItem name={pair.FemalePrincipalSponsor} align="left" />
                          ) : (
                            <div className="py-0.5 sm:py-1 md:py-1.5" />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
