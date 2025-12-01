"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      // Stagger the animation of messages
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="relative border border-[#B38538]/50 bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-[0_4px_16px_rgba(8,22,35,0.2)] hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 group overflow-hidden"
          >
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 sm:h-5 sm:w-32" />
                    <Skeleton className="h-3 w-20 sm:h-3.5 sm:w-28" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-16 sm:h-20 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-14 px-3">
        <div className="inline-block bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 py-6 sm:py-8 shadow-[0_4px_16px_rgba(8,22,35,0.2)] border border-[#B38538]/50 hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B38538]/20 to-[#B38538]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#B38538] to-[#d4af37] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-playfair font-bold text-black mb-2 sm:mb-3">
            No Messages Yet
          </h3>
          <p className="text-xs sm:text-base lg:text-lg text-black/80 font-lora max-w-md mx-auto leading-relaxed mb-4">
            Be the first to share your heartfelt wishes for the happy couple!
          </p>
          <div className="flex justify-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#B38538] animate-pulse" />
              <span className="text-[10px] sm:text-sm font-lora text-black/70">Your message will appear here</span>
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#B38538] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-[#B38538]/50 bg-gradient-to-br from-[#FFFFFF] via-[#74A0C5]/25 to-[#FFFFFF] backdrop-blur-md shadow-[0_4px_16px_rgba(8,22,35,0.2)] hover:border-[#B38538] hover:shadow-[0_6px_24px_rgba(8,22,35,0.3)] transition-all duration-700 group overflow-hidden transform rounded-2xl sm:rounded-3xl ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B38538]/5 via-transparent to-[#B38538]/8 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B38538]/30 via-[#B38538] to-[#B38538]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          
          <CardContent className="relative p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#B38538] to-[#d4af37] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-white font-lora text-xs sm:text-sm font-semibold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B38538]/30 to-[#d4af37]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-black text-base sm:text-lg font-semibold truncate leading-tight">{msg.name}</h4>
                  <span className="text-xs sm:text-sm text-black/60 font-lora leading-tight block mt-1">
                    {new Date(msg.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-[#B38538]/60 fill-[#B38538]/20 group-hover:fill-[#B38538]/40 group-hover:text-[#B38538] transition-all duration-300" />
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#B38538]/70 group-hover:text-[#B38538] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative bg-white/50 rounded-lg p-3 sm:p-4 border border-[#B38538]/10">
              <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 text-2xl sm:text-4xl text-[#B38538]/30 font-playfair group-hover:text-[#B38538]/50 transition-colors duration-300">"</span>
              <p className="text-black/80 text-sm sm:text-base leading-relaxed pl-4 sm:pl-6 pr-2 sm:pr-4 font-lora group-hover:text-black/95 transition-colors duration-300 py-1">{msg.message}</p>
              <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-2xl sm:text-4xl text-[#B38538]/30 font-playfair group-hover:text-[#B38538]/50 transition-colors duration-300">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-3 sm:mt-4 flex justify-end">
              <div className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#B38538]/50 to-transparent group-hover:via-[#B38538]/70 transition-colors duration-300"></div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
