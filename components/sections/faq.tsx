"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import { SectionLabel } from "@/components/section-label"
import { siteConfig } from "@/content/site"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Build FAQ items dynamically from siteConfig
  const faqItems: FAQItem[] = [
    {
      question: "What is the dress code?",
      answer: `Principal Sponsors: ${siteConfig.dressCode.sponsors.ladies} for ladies and ${siteConfig.dressCode.sponsors.gentlemen} for gentlemen.\n\nGuests: ${siteConfig.dressCode.guests.ladies} for ladies and ${siteConfig.dressCode.guests.gentlemen} for gentlemen.\n\nNote: ${siteConfig.dressCode.note}`,
    },
    {
      question: "When and where is the ceremony?",
      answer: `The ceremony is on ${siteConfig.ceremony.day}, ${siteConfig.ceremony.date} at ${siteConfig.ceremony.time} at ${siteConfig.ceremony.location}.`,
    },
    {
      question: "Where is the reception?",
      answer: `The reception is at ${siteConfig.reception.time} on ${siteConfig.reception.date} at ${siteConfig.reception.location}.`,
    },
    {
      question: "When is the RSVP deadline?",
      answer: `Kindly RSVP by ${siteConfig.details.rsvp.deadline}. Your response helps us finalize our guest list. Thank you! [RSVP_LINK]Click here to RSVP[/RSVP_LINK]`,
    },
    {
      question: "Do you have a gift registry?",
      answer:
        "Your presence is the greatest gift. If you feel inclined to give, we would appreciate monetary gifts given in person so we can thank you personally. Envelopes will be provided for your convenience.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes! Ample parking is available at the venue. We recommend arriving 15-20 minutes early to secure a spot.",
    },
    {
      question: "Can I bring a plus one?",
      answer:
        "We kindly ask that any additional guests be included or declared in your RSVP so we can make the proper arrangements. Thank you so much for your understanding — we can't wait to celebrate together on our special day!",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP.",
    },
    {
      question: "Can I take photos during the ceremony?",
      answer:
        "We have a professional photographer, but you're welcome to take photos! We'll have a dedicated time for group photos after the ceremony.",
    },
    {
      question: "What should I do if I need to cancel my RSVP?",
      answer:
        "Please contact us as soon as possible if your plans change. You can update your RSVP by searching for your name in the RSVP section.",
    },
  ]

  return (
    <div style={{ backgroundColor: "#081623" }}>
    <Section
      id="faq"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-25">
        <Image
            src="/decoration/galleryNewBG.jpg"
          alt="FAQ background"
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

      {/* Section Header - compact */}
      <div className="relative z-10 text-center mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4">
        <SectionLabel text="Frequently Asked Questions" tone="light" className="mb-4 sm:mb-5 max-w-4xl mx-auto" />
        <p className="text-xs sm:text-sm md:text-base text-[#FFFFFF]/90 font-sans font-light max-w-2xl mx-auto px-2 leading-relaxed">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content - compact */}
      <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-3 md:px-4">
        {/* Main card */}
        <div className="bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 hover:scale-[1.01] group relative overflow-hidden max-w-5xl mx-auto">
          {/* Inner gold border */}
          <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border border-[#B38538] rounded-md sm:rounded-lg md:rounded-xl pointer-events-none" />
          
          {/* FAQ items - compact */}
          <div className="relative p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index
                const contentId = `faq-item-${index}`
                return (
                  <div
                    key={index}
                    className="rounded-lg sm:rounded-xl border border-[#B38538]/30 bg-white hover:bg-[#B38538]/5 transition-all duration-300 hover:shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="group w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#B38538]/50 focus-visible:ring-offset-1 transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                    >
                      <span className="font-semibold text-[#081623] pr-3 sm:pr-4 text-xs sm:text-sm md:text-base font-sans leading-tight sm:leading-relaxed group-hover:text-[#172652] transition-colors duration-200">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-[#B38538] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={contentId}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[#B38538]/10 border-t border-[#B38538]/20">
                          {item.answer.includes("[RSVP_LINK]") ? (
                            <p className="text-[#081623] leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
                              {item.answer.split("[RSVP_LINK]")[0]}
                              <a 
                                href="#guest-list" 
                                className="text-[#172652] underline font-semibold hover:text-[#081623] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault()
                                  document.getElementById('guest-list')?.scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                {item.answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
                              </a>
                              {item.answer.split("[/RSVP_LINK]")[1]}
                            </p>
                          ) : (
                            <p className="text-[#081623] leading-relaxed text-xs sm:text-sm md:text-base font-sans whitespace-pre-line">
                              {item.answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
    </div>
  )
}
