"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
  RefreshCw,
  X,
  Heart,
  Sparkles,
  Phone,
  UserPlus,
} from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Guest: string
  Message: string
}

export function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    RSVP: "",
    Guest: "1",
    Message: "",
  })

  // Request form state
  const [requestFormData, setRequestFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Guest: "1",
    Message: "",
  })

  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch all guests on component mount
  useEffect(() => {
    fetchGuests()
  }, [])

  // Filter guests based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGuests([])
      setIsSearching(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = guests.filter((guest) =>
      guest.Name.toLowerCase().includes(query)
    )

    setFilteredGuests(filtered)
    setIsSearching(filtered.length > 0)
  }, [searchQuery, guests])

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchGuests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/guests")
      if (!response.ok) {
        throw new Error("Failed to fetch guests")
      }
      const data = await response.json()
      setGuests(data)
    } catch (error) {
      console.error("Error fetching guests:", error)
      setError("Failed to load guest list")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSelect = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.Name)
    setIsSearching(false)
    
    // Set form data with existing guest info
    setFormData({
      Name: guest.Name,
      Email: guest.Email && guest.Email !== "Pending" ? guest.Email : "",
      RSVP: guest.RSVP || "",
      Guest: guest.Guest && guest.Guest !== "" ? guest.Guest : "1",
      Message: guest.Message || "",
    })
    
    // Check if guest has already responded
    setHasResponded(!!(guest.RSVP && guest.RSVP.trim() !== ""))
    
    // Show modal
    setShowModal(true)
  }

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRSVP = async () => {
    if (!selectedGuest) return

    if (!formData.RSVP) {
      setError("Please select if you can attend")
      setTimeout(() => setError(null), 5000)
      return
    }

    // Validate guest count if attending
    if (formData.RSVP === "Yes" && (!formData.Guest || parseInt(formData.Guest) < 1)) {
      setError("Please enter the number of guests (minimum 1)")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/guests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "update",
          originalName: selectedGuest.Name,
          Name: formData.Name,
          Email: formData.Email || "Pending",
          RSVP: formData.RSVP,
          Guest: formData.RSVP === "Yes" ? (formData.Guest || "1") : "0",
          Message: formData.Message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      // Show success and close modal after delay
      setSuccess("Thank you for your response!")
      setHasResponded(true)
      
      // Trigger event to refresh Book of Guests
      window.dispatchEvent(new Event("rsvpUpdated"))
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowModal(false)
        setSearchQuery("")
        setSelectedGuest(null)
        setSuccess(null)
        fetchGuests()
      }, 3000)
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      setError("Failed to submit RSVP. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedGuest(null)
    setSearchQuery("")
    setFormData({ Name: "", Email: "", RSVP: "", Guest: "1", Message: "" })
    setHasResponded(false)
    setError(null)
  }

  const handleSubmitRequest = async () => {
    if (!requestFormData.Name) {
      setError("Name is required")
      setTimeout(() => setError(null), 5000)
      return
    }

    setIsLoading(true)
    setError(null)
    setRequestSuccess(null)

    try {
      const response = await fetch("/api/guest-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestFormData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit request")
      }

      setRequestSuccess("Request submitted! We'll review and get back to you.")
      
      // Close modal and reset after showing success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
        setSearchQuery("")
        setRequestSuccess(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting request:", error)
      setError("Failed to submit request. Please try again.")
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseRequestModal = () => {
    setShowRequestModal(false)
    setRequestFormData({ Name: "", Email: "", Phone: "", Guest: "1", Message: "" })
    setError(null)
    setRequestSuccess(null)
  }

  return (
    <Section id="guest-list" className="relative z-[60] isolate py-8 sm:py-12 md:py-16 lg:py-20 bg-transparent overflow-visible">
      {/* Section Header - compact on mobile */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 text-balance">
          RSVP
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 leading-relaxed">
          Please search for your name below to confirm your attendance
        </p>
      </div>

      {/* Search Section - compact */}
      <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-3 md:px-4">
        {/* White card with elegant border */}
        <div className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-[1.5px] sm:p-[2px] md:p-[3px] shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-visible" style={{ overflow: 'visible' }}>
          {/* Inner gold border */}
          <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#B38538] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
          
          {/* Card content - compact padding */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="relative z-10 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-[#081623] to-[#172652] p-1.5 sm:p-2 rounded-lg shadow-md">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFFFFF]" />
                </div>
                <div>
                  <label className="block text-sm sm:text-base md:text-lg font-semibold text-[#081623] font-sans">
                    Find Your Name
                  </label>
                  <p className="text-[10px] sm:text-xs md:text-sm text-[#081623]/70 font-sans">
                    Type to search
                  </p>
                </div>
              </div>
              <div ref={searchRef} className="relative overflow-visible" style={{ zIndex: 50 }}>
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#B38538]/60 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type your name..."
                    className="w-full pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 md:py-3.5 border-2 border-[#B38538]/30 focus:border-[#B38538] rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-sans placeholder:text-[#081623]/40 transition-all duration-300 hover:border-[#B38538]/50 focus:ring-2 sm:focus:ring-4 focus:ring-[#B38538]/10 bg-white shadow-sm focus:shadow-md"
                  />
                </div>
                {/* Autocomplete dropdown */}
                {isSearching && filteredGuests.length > 0 && (
                  <div 
                    className="absolute z-50 w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border border-[#B38538]/30 rounded-lg sm:rounded-xl shadow-xl overflow-hidden" 
                    style={{ position: 'absolute', top: '100%', zIndex: 50 }}
                  >
                    {filteredGuests.map((guest, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSelect(guest)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-[#B38538]/10 active:bg-[#B38538]/20 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-b border-[#B38538]/10 last:border-b-0 group"
                      >
                        <div className="bg-gradient-to-br from-[#081623] to-[#172652] p-1 sm:p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-all flex-shrink-0">
                          <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#FFFFFF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs sm:text-sm md:text-base text-[#081623] group-hover:text-[#172652] transition-colors truncate">
                            {guest.Name}
                          </div>
                          {guest.Email && guest.Email !== "Pending" && (
                            <div className="text-[9px] sm:text-[10px] md:text-xs text-[#081623]/60 truncate mt-0.5">
                              {guest.Email}
                            </div>
                          )}
                        </div>
                        <div className="text-[#B38538]/40 group-hover:text-[#B38538] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery && filteredGuests.length === 0 && (
                  <div 
                    className="absolute z-50 w-full mt-1.5 sm:mt-2 bg-white/95 backdrop-blur-lg border border-[#B38538]/30 rounded-lg sm:rounded-xl shadow-xl overflow-hidden" 
                    style={{ position: 'absolute', top: '100%', zIndex: 50 }}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="bg-gradient-to-br from-[#081623] to-[#172652] p-1 sm:p-1.5 rounded-lg flex-shrink-0 shadow-sm">
                          <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#FFFFFF]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs sm:text-sm md:text-base text-[#081623] mb-0.5 sm:mb-1">Not finding your name?</h4>
                          <p className="text-[10px] sm:text-xs md:text-sm text-[#081623]/70 leading-relaxed">
                            We'd love to have you! Send a request to join.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setRequestFormData({ ...requestFormData, Name: searchQuery })
                          setShowRequestModal(true)
                        }}
                        className="w-full bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-[#FFFFFF] py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 inline" />
                        Request to Join
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal - Improved & Compact */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md sm:max-w-lg mx-2 sm:mx-3 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#B38538]/40 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh] flex flex-col">
            {/* Modal Header with Gradient */}
            <div className="relative bg-gradient-to-r from-[#081623] via-[#172652] to-[#081623] p-3 sm:p-4 md:p-5 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white truncate">
                      You're Invited!
                    </h3>
                  </div>
                  <p className="text-white/95 text-[10px] sm:text-xs md:text-sm font-sans leading-tight">
                    Hello <span className="font-extrabold text-[#B38538]">{selectedGuest?.Name}</span>, you are invited to our wedding!
                  </p>
                </div>
                {!hasResponded && (
                  <button
                    onClick={handleCloseModal}
                    className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full flex-shrink-0"
                  >
                    <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1 min-h-0">
              {hasResponded ? (
                // Thank you message
                <div className="text-center py-4 sm:py-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-3 sm:mb-4">
                    <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#081623] mb-2">
                    Thank You for Responding!
                  </h4>
                  <p className="text-[#081623]/80 text-xs sm:text-sm mb-3 sm:mb-4 px-2">
                    We've received your RSVP and look forward to celebrating with you!
                  </p>
                  <div className="bg-[#B38538]/10 rounded-lg p-3 sm:p-4 border border-[#B38538]/20 space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      {selectedGuest?.RSVP === "Yes" && (
                        <>
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                          <span className="text-sm sm:text-base font-semibold text-green-600">
                            You're Attending!
                          </span>
                        </>
                      )}
                      {selectedGuest?.RSVP === "No" && (
                        <>
                          <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                          <span className="text-sm sm:text-base font-semibold text-red-600">
                            Unable to Attend
                          </span>
                        </>
                      )}
                    </div>
                    {selectedGuest?.RSVP === "Yes" && selectedGuest?.Guest && (
                      <div className="bg-[#B38538]/10 rounded-lg p-2 sm:p-3 border border-[#B38538]/30">
                        <p className="text-[10px] sm:text-xs text-[#081623]/70 mb-0.5 font-medium">Number of Guests</p>
                        <p className="text-xl sm:text-2xl font-bold text-[#172652]">
                          {selectedGuest.Guest || "1"}
                        </p>
                      </div>
                    )}
                    {selectedGuest && selectedGuest.Message && selectedGuest.Message.trim() !== "" && (
                      <div className="pt-2 border-t border-[#B38538]/20">
                        <p className="text-[10px] sm:text-xs text-[#081623]/80 italic">
                          "{selectedGuest.Message}"
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleCloseModal}
                    className="mt-3 sm:mt-4 bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-[#FFFFFF] px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                // RSVP Form
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitRSVP()
                  }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Can you attend? */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-2 font-sans">
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538] flex-shrink-0" />
                      <span>Can you attend? *</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, RSVP: "Yes" }))}
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.RSVP === "Yes"
                            ? "border-green-500 bg-green-50 shadow-md scale-105"
                            : "border-[#B38538]/30 bg-white hover:border-[#B38538]/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <CheckCircle
                            className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                              formData.RSVP === "Yes" ? "text-green-600" : "text-[#081623]/40"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm md:text-base font-bold ${
                              formData.RSVP === "Yes" ? "text-green-600" : "text-[#081623]"
                            }`}
                          >
                            Yes!
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, RSVP: "No" }))}
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                          formData.RSVP === "No"
                            ? "border-red-500 bg-red-50 shadow-md scale-105"
                            : "border-[#B38538]/30 bg-white hover:border-[#B38538]/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <XCircle
                            className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                              formData.RSVP === "No" ? "text-red-600" : "text-[#081623]/40"
                            }`}
                          />
                          <span
                            className={`text-xs sm:text-sm md:text-base font-bold ${
                              formData.RSVP === "No" ? "text-red-600" : "text-[#081623]"
                            }`}
                          >
                            Sorry, No
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  {formData.RSVP === "Yes" && (
                    <div>
                      <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538] flex-shrink-0" />
                        <span>Number of Guests *</span>
                      </label>
                      <input
                        type="number"
                        name="Guest"
                        value={formData.Guest}
                        onChange={handleFormChange}
                        min="1"
                        required
                        placeholder="How many guests?"
                        className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#B38538]/30 focus:border-[#B38538] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-[#081623]/40 transition-all duration-300 focus:ring-2 focus:ring-[#B38538]/10 bg-white"
                      />
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538] flex-shrink-0" />
                      <span>Your Message</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#081623]/60">(Optional)</span>
                    </label>
                    <textarea
                      name="Message"
                      value={formData.Message}
                      onChange={handleFormChange}
                      placeholder="Share your excitement..."
                      rows={2}
                      className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 resize-none bg-white/80"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538] flex-shrink-0" />
                      <span>Email</span>
                      <span className="text-[10px] sm:text-xs font-normal text-[#081623]/60">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleFormChange}
                      placeholder="your.email@example.com"
                      className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 bg-white/80"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-[#FFFFFF] py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>Submit RSVP</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Success Overlay */}
            {success && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#081623]/98 via-[#172652]/98 to-[#081623]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                <div className="text-center max-w-sm mx-auto">
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/20 animate-ping" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-[#081623]" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#FFFFFF] mb-2">
                    RSVP Confirmed!
                  </h4>
                  {formData.RSVP === "Yes" && (
                    <p className="text-[#FFFFFF]/95 text-sm sm:text-base mb-1">
                      We're thrilled you'll be joining us!
                    </p>
                  )}
                  {formData.RSVP === "No" && (
                    <p className="text-[#FFFFFF]/90 text-sm sm:text-base">
                      We'll miss you, but thank you for letting us know.
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <div className="w-1 h-1 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs">
                      This will close automatically
                    </p>
                    <div className="w-1 h-1 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !success && (
              <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-2 sm:p-2.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Request to Join Modal - Improved & Compact */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md sm:max-w-lg mx-2 sm:mx-3 bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-[#B38538]/40 overflow-hidden animate-in zoom-in-95 duration-300 max-h-[96vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#081623] via-[#172652] to-[#081623] p-3 sm:p-4 md:p-5 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <UserPlus className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white truncate">
                      Request to Join
                    </h3>
                  </div>
                  <p className="text-white/95 text-[10px] sm:text-xs md:text-sm font-sans leading-tight">
                    {requestFormData.Name ? (
                      <>Hi <span className="font-extrabold text-[#B38538]">{requestFormData.Name}</span> — want to celebrate with us?</>
                    ) : (
                      <>Want to celebrate with us? Send a request!</>
                    )}
                  </p>
                </div>
                <button
                  onClick={handleCloseRequestModal}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full flex-shrink-0"
                >
                  <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 md:p-5 overflow-y-auto flex-1 min-h-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmitRequest()
                }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#304C7E] flex-shrink-0" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={requestFormData.Name}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 bg-white/80"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#304C7E] flex-shrink-0" />
                    <span>Email</span>
                    <span className="text-[10px] sm:text-xs font-normal text-[#081623]/60">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={requestFormData.Email}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 bg-white/80"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538] flex-shrink-0" />
                    <span>Phone</span>
                    <span className="text-[10px] sm:text-xs font-normal text-[#081623]/60">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    value={requestFormData.Phone}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 bg-white/80"
                  />
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#304C7E] flex-shrink-0" />
                    <span>Number of Guests *</span>
                  </label>
                  <input
                    type="number"
                    name="Guest"
                    value={requestFormData.Guest}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Guest: e.target.value })}
                    min="1"
                    required
                    placeholder="How many guests?"
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 bg-white/80"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base font-semibold text-[#081623] mb-1.5 sm:mb-2 font-sans">
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#304C7E] flex-shrink-0" />
                    <span>Message</span>
                    <span className="text-[10px] sm:text-xs font-normal text-[#081623]/60">(Optional)</span>
                  </label>
                  <textarea
                    name="Message"
                    value={requestFormData.Message}
                    onChange={(e) => setRequestFormData({ ...requestFormData, Message: e.target.value })}
                    placeholder="Share why you'd like to join..."
                    rows={2}
                    className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 border-2 border-[#081623]/20 focus:border-[#304C7E] rounded-lg text-xs sm:text-sm md:text-base font-sans placeholder:text-gray-400 transition-all duration-300 focus:ring-2 focus:ring-[#304C7E]/10 resize-none bg-white/80"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#081623] to-[#172652] hover:from-[#172652] hover:to-[#081623] text-[#FFFFFF] py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        <span>Send Request</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Success Overlay */}
            {requestSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#081623]/98 via-[#172652]/98 to-[#081623]/98 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-300 p-4">
                <div className="text-center max-w-sm mx-auto">
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <div className="absolute inset-0 rounded-full border-2 border-[#FFFFFF]/20 animate-ping" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-[#081623]" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#FFFFFF] mb-2">
                    Request Sent!
                  </h4>
                  <p className="text-[#FFFFFF]/95 text-sm sm:text-base mb-1">
                    We've received your request
                  </p>
                  <p className="text-[#FFFFFF]/85 text-xs sm:text-sm">
                    We'll review it and get back to you soon
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <div className="w-1 h-1 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                    <p className="text-[#FFFFFF]/70 text-[10px] sm:text-xs">
                      This will close automatically
                    </p>
                    <div className="w-1 h-1 bg-[#FFFFFF]/60 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && !requestSuccess && (
              <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-2 sm:p-2.5">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-red-600 font-semibold text-xs sm:text-sm">{error}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Status Messages */}
      {success && !showModal && !showRequestModal && !requestSuccess && (
        <div className="fixed top-16 sm:top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-2.5 sm:p-3 shadow-lg animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-semibold text-xs sm:text-sm">{success}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
