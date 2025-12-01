"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { IntroImage } from "@/components/sections/intro-image"
import { Hero } from "@/components/sections/hero"
import { Countdown } from "@/components/sections/countdown"
import { Narrative } from "@/components/sections/narrative"
import { Gallery } from "@/components/sections/gallery"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { WeddingTimeline } from "@/components/sections/wedding-timeline"
import { Entourage } from "@/components/sections/entourage"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { SnapShare } from "@/components/sections/snap-share"
import { Footer } from "@/components/sections/footer"
import BackgroundMusic from "@/components/background-music"
import Image from "next/image"
import { Lavishly_Yours } from "next/font/google"

const lavishlyYours = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
})

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
        <IntroImage />
        <Hero />
        <Countdown />
        {/* <Narrative /> */}
        <Gallery />
        <Messages />
        <Details />
        <WeddingTimeline />
        <Entourage />
        <GuestList />
        <BookOfGuests />
        <Registry />
        <FAQ />
        <SnapShare />
        {/* Mobile-only full-width image with dim overlay and message */}
        <div className="relative w-full h-screen md:hidden text-white">
          <Image
            src="/gally/couple (14).JPG"
            alt="Wedding decoration"
            fill
            className="object-cover"
            priority={false}
            quality={90}
          />
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Overlay text */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-10 text-center ${lavishlyYours.className}`}
          >
            <p className="text-7xl sm:text-8xl leading-tight sm:leading-tight tracking-wide">
              <span className="block mb-1">
                <span className="inline-block text-8xl sm:text-9xl">W</span>
                <span className="inline-block align-middle ml-1 text-6xl sm:text-7xl">e</span>
              </span>
              <span className="block mb-1 text-7xl sm:text-8xl">can&apos;t</span>
              <span className="block mb-1 text-7xl sm:text-8xl">wait to see</span>
              <span className="block mb-1 text-7xl sm:text-8xl">you</span>
              <span className="block text-7xl sm:text-8xl">there!</span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
