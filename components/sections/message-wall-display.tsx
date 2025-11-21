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
      <div className="space-y-2.5 sm:space-y-5">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-[#304C7E]/20 shadow-md bg-[#FFFFFF]/95 backdrop-blur-sm rounded-xl">
            <CardContent className="p-3 sm:p-5">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-3 w-20 sm:h-4 sm:w-28" />
                    <Skeleton className="h-2.5 w-16 sm:h-3 sm:w-20" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-12 sm:h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 sm:py-14 px-3">
        <div className="relative inline-block mb-4 sm:mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#74A0C5]/20 to-[#304C7E]/15 rounded-full blur-xl scale-150 animate-pulse"></div>
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#304C7E]/25 to-[#172652]/15 rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-[#74A0C5]" />
          </div>
        </div>
        <h3 className="text-lg sm:text-2xl lg:text-3xl font-playfair font-bold text-[#FFFFFF] mb-2 sm:mb-3">
          No Messages Yet
        </h3>
        <p className="text-xs sm:text-base lg:text-lg text-[#FFFFFF]/90 font-lora max-w-md mx-auto leading-relaxed">
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-6 flex justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#B38538] animate-pulse" />
            <span className="text-[10px] sm:text-sm font-lora text-[#FFFFFF]/85">Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#B38538] animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2.5 sm:space-y-5">
      {visibleMessages.map((msg, index) => (
        <Card
          key={index}
          className={`relative border border-[#304C7E]/30 shadow-[0_4px_20px_rgba(23,38,82,0.12)] bg-[#FFFFFF]/95 backdrop-blur-sm hover:shadow-[0_8px_28px_rgba(23,38,82,0.18)] transition-all duration-500 group overflow-hidden transform rounded-xl ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* Card background effects with new blue/gold palette */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#172652]/5 via-transparent to-[#B38538]/8 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#304C7E]/30 via-[#B38538] to-[#304C7E]/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute -inset-[1px] rounded-xl pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(48,76,126,0.12)' }} />
          
          <CardContent className="relative p-3 sm:p-5 lg:p-6">
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#304C7E] to-[#172652] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-white font-lora text-[10px] sm:text-sm font-semibold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  {/* Avatar glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#74A0C5]/30 to-[#304C7E]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-lora text-[#081623] text-sm sm:text-base font-semibold truncate leading-tight">{msg.name}</h4>
                  <span className="text-[10px] sm:text-xs text-[#081623]/55 font-lora leading-tight block mt-0.5">
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
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-1">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#304C7E]/60 fill-[#304C7E]/15 group-hover:fill-[#304C7E]/35 group-hover:text-[#304C7E] transition-all duration-300" />
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#B38538]/70 group-hover:text-[#B38538] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="relative">
              <span className="absolute -left-0.5 -top-0.5 sm:-left-1 sm:-top-1 text-xl sm:text-3xl text-[#304C7E]/25 font-playfair group-hover:text-[#304C7E]/40 transition-colors duration-300">"</span>
              <p className="text-[#081623]/80 text-[11px] sm:text-sm leading-relaxed pl-3 sm:pl-5 pr-2 font-lora group-hover:text-[#081623]/95 transition-colors duration-300 py-1">{msg.message}</p>
              <span className="absolute -right-0.5 -bottom-0.5 sm:-right-1 sm:-bottom-1 text-xl sm:text-3xl text-[#304C7E]/25 font-playfair group-hover:text-[#304C7E]/40 transition-colors duration-300">"</span>
            </div>
            
            {/* Message bottom accent */}
            <div className="mt-2 sm:mt-3 flex justify-end">
              <div className="w-10 sm:w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#B38538]/50 to-transparent group-hover:via-[#B38538]/70 transition-colors duration-300"></div>
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
