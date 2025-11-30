"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { siteConfig } from "@/content/site"
import StaggeredMenu from "./StaggeredMenu"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")

  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null
        setIsScrolled(window.scrollY > 50)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      window.removeEventListener("scroll", onScroll as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const sectionIds = navLinks.map(l => l.href.substring(1))
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))
        if (visible.length > 0) {
          const topMost = visible[0]
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`
            setActiveSection(prev => (prev === newActive ? prev : newActive))
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const menuItems = useMemo(() => navLinks.map((l) => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })), [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#172652]/95 backdrop-blur-md shadow-lg border-b border-[#B38538]/20' 
        : 'bg-[#081623]/90 backdrop-blur-sm border-b border-[#304C7E]/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo/Brand */}
          <Link href="#home" className="flex-shrink-0 group relative">
            <div className="flex items-center gap-2 sm:gap-3">
              <Heart
                size={24}
                className="sm:size-7 text-[#B38538] group-hover:fill-[#B38538] transition-all duration-300"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-serif font-semibold text-[#FFFFFF] group-hover:text-[#B38538] transition-colors duration-300">
                  {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
                </span>
                <span className="text-[10px] sm:text-xs font-sans tracking-widest text-[#74A0C5]/80 uppercase">
                  {siteConfig.ceremony.date}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 relative ${
                    isActive 
                      ? 'text-[#081623] bg-[#B38538]' 
                      : 'text-[#FFFFFF]/90 hover:text-[#FFFFFF] hover:bg-[#304C7E]/30'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B38538]" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#FFFFFF"
              openMenuButtonColor="#B38538"
              changeMenuColorOnOpen={true}
              colors={["#081623", "#172652", "#304C7E", "#74A0C5", "#B38538"]}
              accentColor="#B38538"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
