"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, MessageSquare, Heart, Sparkles, User } from "lucide-react"
import Image from "next/image"
import { SectionLabel } from "@/components/section-label"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || '1', // Ensure Guest field exists
        }))
      
      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1
        return sum + guestCount
      }, 0)
      
      setGuests(attendingGuests)
      setTotalGuests(totalGuestCount)
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-[55] isolate py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "#081623" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/decoration/galleryNewBG.jpg"
          alt="Book of guests background"
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

      {/* Section Header - compact on mobile */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <SectionLabel text="Book of Guests" tone="light" className="mb-0 mx-auto max-w-3xl" />
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card - compact */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6 px-2 sm:px-3 md:px-4">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white/95 backdrop-blur-sm border border-[#B38538]/30 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg sm:shadow-xl overflow-hidden">
              {/* Inner gold border */}
              <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#B38538] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
              
              {/* Content - compact */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                  <div className="bg-gradient-to-br from-[#081623] to-[#172652] p-1.5 sm:p-2 rounded-full shadow-md">
                    <Heart className="text-[#FFFFFF] h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-bold text-[#081623]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#081623]/70 font-sans mt-0.5">
                      {guests.length} {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#081623]/80 font-sans leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container - compact */}
        <div className="max-w-5xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
          <div className="relative bg-white/95 backdrop-blur-sm border border-[#B38538]/30 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl overflow-hidden">
            {/* Inner gold border */}
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#B38538] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 animate-spin text-[#B38538]" />
                  <span className="text-[#081623] font-sans text-sm sm:text-base md:text-lg">Loading guests...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                  <p className="text-red-500 font-sans text-sm sm:text-base md:text-lg mb-2">{error}</p>
                </div>
              </div>
            ) : guests.length === 0 ? (
              <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#081623] to-[#172652] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FFFFFF]" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-sans font-bold text-[#081623] mb-1.5 sm:mb-2">
                    No guests have RSVP'd yet
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-[#081623]/70 font-sans max-w-md mx-auto leading-relaxed px-4">
                    Be the first to RSVP and kick off the celebration!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 relative z-10">
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-[#B38538]/30 hover:border-[#B38538]/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      {/* Avatar - compact */}
                      <div className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-gradient-to-br from-[#081623] to-[#172652] text-[#FFFFFF] flex items-center justify-center font-semibold shadow-md ring-2 ring-white text-xs sm:text-sm md:text-base">
                          {getInitials(guest.Name)}
                        </div>
                      </div>
                      
                      {/* Guest Info - compact */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-2">
                          <div className="flex-1 pr-20 sm:pr-0">
                            <h4 className="font-sans text-sm sm:text-base md:text-lg font-semibold text-[#081623] mb-0.5 sm:mb-1 group-hover:text-[#172652] transition-colors duration-200">
                              {guest.Name}
                            </h4>
                            {guest.Email && guest.Email !== "Pending" && (
                              <div className="flex items-center text-[10px] sm:text-xs md:text-sm text-[#081623]/70">
                                <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 mr-1 sm:mr-1.5 text-[#B38538] flex-shrink-0" />
                                <span className="font-sans break-all">{guest.Email}</span>
                              </div>
                            )}
                          </div>
                          {/* Guest count badge - compact */}
                          <div className="absolute right-2.5 top-2.5 sm:static sm:right-auto sm:top-auto flex items-center gap-1">
                            <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#B38538] flex-shrink-0" />
                            <span className="inline-flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#B38538]/10 text-[#172652] rounded-full text-[10px] sm:text-xs font-semibold border border-[#B38538]/30">
                              {guest.Guest ? (parseInt(String(guest.Guest)) || 1) : 1} {parseInt(String(guest.Guest || '1')) === 1 ? 'guest' : 'guests'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Message - compact */}
                        {guest.Message && (
                          <div className="mt-2 sm:mt-2.5 md:mt-3 pt-2 sm:pt-2.5 md:pt-3 border-t border-[#B38538]/20">
                            <div className="flex items-start gap-1.5 sm:gap-2">
                              <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#B38538] flex-shrink-0 mt-0.5" />
                              <p className="text-[10px] sm:text-xs md:text-sm text-[#081623]/80 font-sans leading-relaxed italic flex-1">
                                "{guest.Message}"
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
