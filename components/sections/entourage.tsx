"use client"

import React from "react"
import { useState, useEffect, useMemo } from "react"
import { Loader2, Users } from "lucide-react"

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Principal Sponsor",
  "Best Man",
  "Maid/Matron of Honor",
  "Groomsmen",
  "Bridesmaids",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Ring/Coin Bearers",
  "Flower Girls/Boys",
  "Little Bride",
  "Little Groom",
  "Offerer",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [principalSponsors, setPrincipalSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEntourage = async () => {
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    }
  }

  const fetchPrincipalSponsors = async () => {
    try {
      const response = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch principal sponsors")
      }
      const data: PrincipalSponsor[] = await response.json()
      setPrincipalSponsors(data)
    } catch (error: any) {
      console.error("Failed to load principal sponsors:", error)
      // Don't set error state for sponsors, just log it
    }
  }

  const fetchAll = async () => {
    setIsLoading(true)
    setError(null)
    await Promise.all([fetchEntourage(), fetchPrincipalSponsors()])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAll()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchAll()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other"
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ 
    children,
    align = "center",
    className = ""
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

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div className={`flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1.5 leading-snug`}>
        <p className={`text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium ${textAlign}`}>{member.Name}</p>
        {showRole && member.RoleTitle && (
          <p className={`text-slate-500 text-[8px] sm:text-[9px] md:text-[10px] font-normal mt-0.5 leading-tight ${textAlign}`}>
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  // Helper component for principal sponsor names (simpler, no role title)
  const SponsorNameItem = ({ name, align = "center" }: { name: string, align?: "left" | "center" | "right" }) => {
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

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-0.5 sm:gap-y-1 md:gap-y-1.5 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 mb-1.5 sm:mb-2 md:mb-3">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-1.5 sm:gap-x-2 md:gap-x-3 gap-y-0.5 sm:gap-y-1 md:gap-y-1.5 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >

      {/* Section Header - compact on mobile */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FFFFFF] mb-1.5 sm:mb-2 md:mb-3 text-balance">
          Entourage
        </h2>
      </div>

      {/* Central Card Container - compact padding on mobile */}
      <div className="relative z-10 max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        {/* White card with elegant border */}
        <div className="relative bg-white/85 backdrop-blur-sm border border-[#F1EDE2]/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Inner gold border - thinner on mobile */}
          <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#F1EDE2] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
          {/* Card content - compact padding on mobile */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#F1EDE2]" />
                  <span className="text-[#AFC8E6] font-serif text-sm sm:text-base md:text-lg">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                <div className="text-center">
                  <p className="text-red-500 font-serif text-sm sm:text-base md:text-lg mb-2">{error}</p>
                  <button
                    onClick={fetchAll}
                    className="text-[#AFC8E6] hover:text-[#D8B0B0] font-serif underline text-xs sm:text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 && principalSponsors.length === 0 ? (
              <div className="text-center py-16 sm:py-20 md:py-24">
                <Users className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-[#F1EDE2]/50 mx-auto mb-3 sm:mb-4" />
                <p className="text-[#AFC8E6] font-serif text-sm sm:text-base md:text-lg">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                
                // Special handling for Principal Sponsor (comes from different API)
                if (category === "Principal Sponsor") {
                  const sponsorPairs = principalSponsors.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor)
                  
                  if (sponsorPairs.length === 0) return null
                  
                  return (
                    <div key="PrincipalSponsor">
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                          <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="Principal Sponsors" centerContent={true}>
                        {sponsorPairs.map((pair, idx) => (
                          <React.Fragment key={`sponsor-pair-${idx}`}>
                            <div key={`male-sponsor-${idx}-${pair.MalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                              {pair.MalePrincipalSponsor ? (
                                <SponsorNameItem name={pair.MalePrincipalSponsor} align="right" />
                              ) : (
                                <div className="py-0.5 sm:py-1 md:py-1.5" />
                              )}
                            </div>
                            <div key={`female-sponsor-${idx}-${pair.FemalePrincipalSponsor || 'empty'}`} className="px-2 sm:px-3 md:px-4">
                              {pair.FemalePrincipalSponsor ? (
                                <SponsorNameItem name={pair.FemalePrincipalSponsor} align="left" />
                              ) : (
                                <div className="py-0.5 sm:py-1 md:py-1.5" />
                              )}
                            </div>
                          </React.Fragment>
                        ))}
                      </TwoColumnLayout>
                    </div>
                  )
                }
                
                if (members.length === 0) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                          <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="px-2 sm:px-3 md:px-4">
                          {groom && <NameItem member={groom} align="right" />}
                        </div>
                        <div className="px-2 sm:px-3 md:px-4">
                          {bride && <NameItem member={bride} align="left" />}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Parents of the Groom" rightTitle="Parents of the Bride">
                          {(() => {
                            const leftArr = sortParents(parentsGroom)
                            const rightArr = sortParents(parentsBride)
                            const maxLen = Math.max(leftArr.length, rightArr.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = leftArr[i]
                              const right = rightArr[i]
                              rows.push(
                                <React.Fragment key={`parents-row-${i}`}>
                                  <div key={`parent-groom-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`parent-bride-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Maid/Matron of Honor and Best Man - combine into single two-column layout
                if (category === "Maid/Matron of Honor" || category === "Best Man") {
                  // Get both honor attendant groups
                  const maidOfHonor = grouped["Maid/Matron of Honor"] || []
                  const bestMan = grouped["Best Man"] || []
                  
                  // Only render once (when processing "Best Man")
                  if (category === "Best Man") {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid/Matron of Honor">
                          {(() => {
                            const maxLen = Math.max(bestMan.length, maidOfHonor.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bestMan[i]
                              const right = maidOfHonor[i]
                              rows.push(
                                <React.Fragment key={`honor-row-${i}`}>
                                  <div key={`bestman-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`maid-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid/Matron of Honor" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  
                  // Only render once (when processing "Bridesmaids")
                  if (category === "Bridesmaids") {
                    return (
                      <div key="BridalParty">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Groomsmen" rightTitle="Bridesmaids">
                          {(() => {
                            const maxLen = Math.max(bridesmaids.length, groomsmen.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const groomsman = groomsmen[i]
                              const bridesmaid = bridesmaids[i]
                              rows.push(
                                <React.Fragment key={`bridal-row-${i}`}>
                                  <div key={`groomsman-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {groomsman ? <NameItem member={groomsman} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`bridesmaid-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {bridesmaid ? <NameItem member={bridesmaid} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Groomsmen" since it's already rendered above
                  return null
                }

                // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                if (category === "Candle Sponsors" || category === "Veil Sponsors") {
                  // Get both sponsor groups
                  const candleSponsors = grouped["Candle Sponsors"] || []
                  const veilSponsors = grouped["Veil Sponsors"] || []
                  
                  // Only render once (when processing "Candle Sponsors")
                  if (category === "Candle Sponsors") {
                    return (
                      <div key="Sponsors">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Candle Sponsors" rightTitle="Veil Sponsors">
                          {(() => {
                            const maxLen = Math.max(candleSponsors.length, veilSponsors.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = candleSponsors[i]
                              const right = veilSponsors[i]
                              rows.push(
                                <React.Fragment key={`sponsors-row-${i}`}>
                                  <div key={`candle-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`veil-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Veil Sponsors" since it's already rendered above
                  return null
                }

                // Special handling for Flower Girls/Boys - combine Flower Girls and Flower Boys
                if (category === "Flower Girls/Boys") {
                  const flowerGirls = grouped["Flower Girls"] || []
                  const flowerBoys = grouped["Flower Boys"] || []
                  const allFlowers = [...flowerGirls, ...flowerBoys]
                  
                  if (allFlowers.length === 0) return null
                  
                  return (
                    <div key="FlowerGirlsBoys">
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                          <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="Flower Girls/Boys" centerContent={true}>
                        {(() => {
                          if (allFlowers.length <= 2) {
                            return (
                              <div className="col-span-full">
                                <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5">
                                  {allFlowers.map((member, idx) => (
                                    <NameItem key={`flower-${idx}-${member.Name}`} member={member} align="center" />
                                  ))}
                                </div>
                              </div>
                            )
                          }
                          const half = Math.ceil(allFlowers.length / 2)
                          const left = allFlowers.slice(0, half)
                          const right = allFlowers.slice(half)
                          const maxLen = Math.max(left.length, right.length)
                          const rows = []
                          for (let i = 0; i < maxLen; i++) {
                            const l = left[i]
                            const r = right[i]
                            rows.push(
                              <React.Fragment key={`flower-row-${i}`}>
                                <div key={`flower-cell-left-${i}`} className="px-2 sm:px-3 md:px-4">
                                  {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                </div>
                                <div key={`flower-cell-right-${i}`} className="px-2 sm:px-3 md:px-4">
                                  {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                </div>
                              </React.Fragment>
                            )
                          }
                          return rows
                        })()}
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Little Bride | Little Groom - combine into single two-column layout
                if (category === "Little Bride" || category === "Little Groom") {
                  const littleBride = grouped["Little Bride"] || []
                  const littleGroom = grouped["Little Groom"] || []
                  
                  // Only render once (when processing "Little Groom")
                  if (category === "Little Groom") {
                    return (
                      <div key="LittleCouple">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                            <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Little Groom" rightTitle="Little Bride">
                          {(() => {
                            const maxLen = Math.max(littleGroom.length, littleBride.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = littleGroom[i]
                              const right = littleBride[i]
                              rows.push(
                                <React.Fragment key={`little-couple-row-${i}`}>
                                  <div key={`little-groom-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                  <div key={`little-bride-cell-${i}`} className="px-2 sm:px-3 md:px-4">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Little Bride" since it's already rendered above
                  return null
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                        <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#BB8A3D]/60 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        const SINGLE_COLUMN_SECTIONS = new Set([
                          "Best Man",
                          "Maid/Matron of Honor",
                          "Ring Bearer",
                          "Coin Bearer",
                          "Bible Bearer",
                          "Presider",
                          "Offerer",
                        ])
                        // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                        if (category === "Cord Sponsors" && members.length === 2) {
                          const left = members[0]
                          const right = members[1]
                          return (
                            <>
                              <div className="px-2 sm:px-3 md:px-4">
                                <NameItem member={left} align="right" />
                              </div>
                              <div className="px-2 sm:px-3 md:px-4">
                                <NameItem member={right} align="left" />
                              </div>
                            </>
                          )
                        }
                        if (SINGLE_COLUMN_SECTIONS.has(category) || members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-4">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-4">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => {
                // Exclude categories that are handled in combined sections
                const excludedCategories = ["Flower Girls", "Flower Boys", "Little Bride", "Little Groom"]
                return !ROLE_CATEGORY_ORDER.includes(cat) && !excludedCategories.includes(cat)
              }).map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-3 sm:mb-4 md:mb-6">
                      <div className="h-px w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-[#F1EDE2]/40 to-transparent"></div>
                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        if (members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Pair row-by-row for other categories as well
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-2 sm:px-3 md:px-4">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-2 sm:px-3 md:px-4">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
