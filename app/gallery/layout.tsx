"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the global navbar while on /gallery
    const navbar = document.querySelector("nav") as HTMLElement | null
    if (navbar) navbar.style.display = "none"
    return () => {
      if (navbar) navbar.style.display = ""
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Simple top bar with only Back link - compact */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-[#081623]/90 border-b border-[#B38538]/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#FFFFFF] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#B38538]/50 hover:bg-[#B38538]/20 hover:border-[#B38538] transition-all duration-200 font-sans text-xs sm:text-sm"
          >
            ← Back to main page
          </Link>
          <div className="text-[10px] sm:text-xs text-[#FFFFFF]/60 font-sans">Gallery</div>
        </div>
      </div>
      {children}
    </div>
  )
}
