"use client"

import type { JSX } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { SectionLabel } from "@/components/section-label"
import { Camera, Sparkles, Utensils } from "lucide-react"

interface TimelineEvent {
  time: string
  title: string
  Icon: () => JSX.Element
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "2:00 PM",
    title: "Ceremony",
    Icon: RingsIcon,
  },
  {
    time: "3:00 PM",
    title: "Pictorial",
    Icon: CameraIcon,
  },
  {
    time: "4:00 PM",
    title: "Reception",
    Icon: SparklesIcon,
  },
  {
    time: "5:00 PM",
    title: "Dinner",
    Icon: UtensilsIcon,
  },
]

export function WeddingTimeline() {
  return (
    <Section id="wedding-timeline" className="relative overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative overlays (match hero implementation) */}
      <div className="absolute top-0 left-0 right-0 w-full h-[25%] sm:h-[30%] pointer-events-none z-10">
        <Image
          src="/decoration/goldernnavybluedecorationlower.png"
          alt="Wedding timeline top decoration"
          fill
          className="object-cover object-top scale-y-[-1]"
          priority={false}
          quality={90}
        />
      </div>
      <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 left-0 right-0 w-full h-[30%] sm:h-[35%] md:h-[40%] pointer-events-none z-10">
        <Image
          src="/decoration/goldernnavybluedecorationlower.png"
          alt="Wedding timeline bottom decoration"
          fill
          className="object-cover object-bottom"
          priority={false}
          quality={90}
        />
      </div>

      {/* Enhanced background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#B38538]/10 via-[#B38538]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#B38538]/10 via-[#B38538]/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50" />
        
        {/* Floating decorative circles */}
        <div className="absolute top-12 left-12 w-32 h-32 sm:w-40 sm:h-40 bg-[#B38538]/15 rounded-full blur-2xl opacity-80 animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 sm:w-32 sm:h-32 bg-[#081623]/10 rounded-full blur-xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-24 w-28 h-28 sm:w-36 sm:h-36 bg-[#B38538]/15 rounded-full blur-2xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-24 right-16 w-24 h-24 sm:w-28 sm:h-28 bg-[#081623]/10 rounded-full blur-xl opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-[#B38538]/10 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
        <div className="inline-flex flex-col gap-2 sm:gap-3 items-center">
          <div className="inline-block bg-white/95 backdrop-blur-sm border border-[#B38538]/40 rounded-full px-3.5 sm:px-7 md:px-9 py-2.5 sm:py-3.5 shadow-lg shadow-[#B38538]/20">
            <SectionLabel
              text="Wedding Timeline"
              textClassName="text-black text-2xl sm:text-3xl md:text-4xl"
              className="mb-0"
              showDivider={false}
            />
          </div>
          <div className="inline-block bg-white/85 backdrop-blur-sm border border-[#B38538]/25 rounded-full px-4 sm:px-6 md:px-7 py-2.5 sm:py-3 shadow-sm shadow-[#081623]/10 max-w-xl">
            <p
              className="text-xs sm:text-sm md:text-base text-[#081623]/80 font-light leading-relaxed tracking-wide"
              style={{
                fontFamily: '"Inter", sans-serif',
              }}
            >
              A glimpse of the moments we'll share
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Mobile: Vertical Timeline */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Vertical line for mobile */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#081623]/20 via-[#B38538]/60 to-[#081623]/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#B38538]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#B38538]" />
            </div>
            <div className="space-y-8 sm:space-y-10">
              {timelineEvents.map((event, index) => (
                <TimelineEventMobile
                  key={`${event.title}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Alternating Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Central vertical line for desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#081623]/20 via-[#B38538]/60 to-[#081623]/20 -translate-x-1/2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B38538]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#B38538]" />
            </div>
            <div className="space-y-12 lg:space-y-16">
              {timelineEvents.map((event, index) => (
                <TimelineEventDesktop
                  key={`${event.title}-${index}`}
                  event={event}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// Mobile Timeline Event Component
function TimelineEventMobile({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <div className="relative pl-20 pr-4">
      {/* Connector line to main timeline */}
      <div className="absolute left-8 top-6 w-12 h-0.5 bg-[#B38538]/40" />
      
      {/* Icon Badge */}
      <div className="absolute left-0 top-0 z-10">
        <IconBadge Icon={event.Icon} />
      </div>
      {/* Content Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-lg border border-[#081623]/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="space-y-2">
          <p 
            className="text-xs sm:text-sm font-semibold tracking-[0.15em] text-[#B38538] uppercase"
            style={{ 
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {event.time}
          </p>
          <h3 
            className="text-lg sm:text-xl text-[#081623] tracking-wide"
            style={{ 
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500
            }}
          >
            {event.title}
          </h3>
        </div>
      </div>
    </div>
  )
}

// Desktop Timeline Event Component
function TimelineEventDesktop({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven = index % 2 === 0
  
  return (
    <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content Card */}
      <div className={`w-[45%] ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-[#081623]/10 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
          <div className={`space-y-3 ${isEven ? 'text-right' : 'text-left'}`}>
            <p 
              className="text-sm lg:text-base font-semibold tracking-[0.2em] text-[#B38538] uppercase"
              style={{ 
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {event.time}
            </p>
            <h3 
              className="text-xl lg:text-2xl xl:text-3xl text-[#081623] tracking-wide"
              style={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500
              }}
            >
              {event.title}
            </h3>
          </div>
        </div>
      </div>
      {/* Central Icon Badge */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <IconBadge Icon={event.Icon} />
      </div>
      {/* Spacer for opposite side */}
      <div className="w-[45%]" />
    </div>
  )
}

// Enhanced Icon Badge Component
function IconBadge({ Icon }: { Icon: () => JSX.Element }) {
  return (
    <div className="relative group">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#B38538]/20 blur-md group-hover:bg-[#B38538]/30 transition-all duration-300 scale-110" />
      
      {/* Main badge */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#B38538] bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(179,133,56,0.25)] group-hover:shadow-[0_12px_32px_rgba(179,133,56,0.35)] transition-all duration-300 group-hover:scale-110">
        <Icon />
      </div>
    </div>
  )
}

function RingsIcon() {
  return (
    <svg 
      viewBox="0 0 32 32" 
      className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#B38538]" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      <circle cx="13" cy="19" r="7" />
      <circle cx="21" cy="13" r="7" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <Camera className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#B38538]" strokeWidth={1.5} />
  )
}

function SparklesIcon() {
  return (
    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#B38538]" strokeWidth={1.5} />
  )
}

function UtensilsIcon() {
  return (
    <Utensils className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#B38538]" strokeWidth={1.5} />
  )
}

