"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { Narrative } from "@/components/sections/narrative"
import { Gallery } from "@/components/sections/gallery"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"
import Image from "next/image"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })
const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

export default function Home() {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== 'false'

  return (
    <main className="relative">
      {enableDecor && <BackgroundMusic />}
      {/* Silk Background Animation */}
      {enableDecor && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
            <Silk speed={5} scale={1.1} color="#1e3a8a" noiseIntensity={0.8} rotation={0.3} />
          </Suspense>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Countdown />
        {/* <Narrative /> */}
        <Gallery />
        <Messages />
        <Details />
        <Entourage />
        <GuestList />
        <BookOfGuests />
        <Registry />
        <FAQ />
        <SnapShare />
        {/* Mobile-only full-width image */}
        <div className="relative w-full h-screen md:hidden">
          <Image
            src="/decoration/image-1542369876902874.jfif"
            alt="Wedding decoration"
            fill
            className="object-cover"
            priority={false}
            quality={90}
          />
        </div>
        <Footer />
      </div>
    </main>
  )
}
