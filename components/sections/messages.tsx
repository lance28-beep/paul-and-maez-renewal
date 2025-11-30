"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { MessageCircle, Heart, Sparkles, Send } from "lucide-react"
import { Section } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MessageWallDisplay from "./message-wall-display"
import Image from "next/image"

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageFormProps {
  onSuccess?: () => void
  onMessageSent?: () => void
}

function MessageForm({ onSuccess, onMessageSent }: MessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [messageValue, setMessageValue] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const message = formData.get("message") as string

    const googleFormData = new FormData()
    googleFormData.append("entry.405401269", name)
    googleFormData.append("entry.893740636", message)

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdEqUu2xjp1xwreWXcxw5Ryc5-63psuMwkWjOoPGaP2UkarUg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: googleFormData,
        }
      )

      toast({
        title: "Message Sent! 💌",
        description: "Your heartfelt wishes have been delivered",
        duration: 3000,
      })

      setIsSubmitted(true)
      setNameValue("")
      setMessageValue("")
      formRef.current?.reset()
      
      // Reset submitted state after animation
      setTimeout(() => setIsSubmitted(false), 1000)
      
      if (onSuccess) onSuccess()
      if (onMessageSent) onMessageSent()
    } catch (error) {
      toast({
        title: "Unable to send message",
        description: "Please try again in a moment",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto px-3 sm:px-4">
      {/* Enhanced decorative background elements */}
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#B38538]/20 rounded-full blur-sm animate-pulse sm:w-10 sm:h-10 sm:-top-4 sm:-left-4"></div>
      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#74A0C5]/15 rounded-full blur-md animate-pulse sm:w-12 sm:h-12 sm:-bottom-4 sm:-right-4"></div>
      <div className="absolute top-1/2 -left-1 w-4 h-4 bg-[#304C7E]/15 rounded-full blur-sm animate-pulse sm:w-6 sm:h-6 sm:-left-2"></div>
      
      <Card className={`relative w-full border-2 border-[#304C7E]/40 shadow-[0_8px_32px_rgba(23,38,82,0.25)] bg-[#FFFFFF]/90 backdrop-blur-md transition-all duration-500 group overflow-hidden rounded-xl sm:rounded-2xl ${
        isFocused ? 'scale-[1.01] border-[#B38538]/60 bg-[#FFFFFF]/95' : 'hover:bg-[#FFFFFF]/95'
      } ${isSubmitted ? 'animate-bounce' : ''}`}>
        {/* Glass effect overlays */}
        <div className="absolute inset-0 bg-[#172652]/5"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-[#FFFFFF]/5"></div>
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-[#B38538]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Success animation overlay */}
        {isSubmitted && (
          <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center gap-1.5 animate-pulse">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <p className="text-green-600 font-semibold text-base sm:text-lg">Sent!</p>
            </div>
          </div>
        )}
        
        <CardContent className="relative p-3.5 sm:p-5 md:p-6">
          {/* Header with icon */}
          <div className="text-center mb-2.5 sm:mb-4">
            <div className="relative inline-block mb-1.5 sm:mb-2">
              <div className="absolute inset-0 bg-[#B38538]/20 rounded-full blur-md"></div>
              <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-[#304C7E] rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-[#FFFFFF]" />
              </div>
            </div>
            <h3 className="text-sm sm:text-base font-playfair font-bold text-[#081623] mb-0.5 sm:mb-1">
              Share Your Love
            </h3>
            <p className="text-[10px] sm:text-xs text-[#081623]/70 font-lora">
              Your message will be treasured forever
            </p>
          </div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="space-y-2.5 sm:space-y-3"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Name Field */}
            <div className="space-y-1">
              <label className="block text-xs sm:text-sm font-medium text-[#081623] font-lora flex items-center gap-1.5">
                <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-[#B38538]/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusedField === 'name' ? 'scale-110 bg-[#B38538]/40' : ''
                }`}>
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#B38538]" />
                </div>
                Your Name
              </label>
              <div className="relative">
                <Input
                  name="name"
                  required
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your name"
                  className={`w-full border-2 rounded-lg py-1.5 sm:py-2 px-2.5 sm:px-3 text-xs sm:text-sm font-lora placeholder:text-[#081623]/40 transition-all duration-300 bg-[#FFFFFF]/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg ${
                    focusedField === 'name' 
                      ? 'border-[#B38538] focus:border-[#B38538] focus:ring-2 focus:ring-[#B38538]/20 shadow-lg' 
                      : 'border-[#304C7E]/30 hover:border-[#304C7E]/50'
                  }`}
                />
                {nameValue && (
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-medium text-[#081623] font-lora flex items-center gap-1.5">
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-[#B38538]/20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    focusedField === 'message' ? 'scale-110 bg-[#B38538]/40' : ''
                  }`}>
                    <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#B38538]" />
                  </div>
                  Your Message
                </label>
                {messageValue && (
                  <span className={`text-[10px] sm:text-xs font-lora transition-colors ${
                    messageValue.length > 500 ? 'text-red-500' : 'text-[#081623]/50'
                  }`}>
                    {messageValue.length}/500
                  </span>
                )}
              </div>
              <div className="relative">
                <Textarea
                  name="message"
                  required
                  value={messageValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setMessageValue(e.target.value)
                    }
                  }}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Share your love and wishes..."
                  className={`w-full border-2 rounded-lg min-h-[70px] sm:min-h-[90px] text-xs sm:text-sm font-lora placeholder:text-[#081623]/40 transition-all duration-300 resize-none bg-[#FFFFFF]/80 backdrop-blur-sm shadow-sm hover:shadow-md focus:shadow-lg py-1.5 sm:py-2 px-2.5 sm:px-3 ${
                    focusedField === 'message' 
                      ? 'border-[#B38538] focus:border-[#B38538] focus:ring-2 focus:ring-[#B38538]/20 shadow-lg' 
                      : 'border-[#304C7E]/30 hover:border-[#304C7E]/50'
                  }`}
                />
                {messageValue && (
                  <div className="absolute right-2 sm:right-3 top-2 sm:top-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !nameValue.trim() || !messageValue.trim()}
              className="w-full bg-[#304C7E] hover:bg-[#172652] text-[#FFFFFF] py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-lora font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#304C7E] disabled:hover:scale-100 border-2 border-[#B38538]/50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-1.5">
                  <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMessages = useCallback(() => {
    setLoading(true)
    fetch(
      "https://script.google.com/macros/s/AKfycbz_K_ofGoydauGOhc3ni3iNjUJIvaR1SSSMLSyC8hKIOsRanafOOEjrFvLAtWgbiYQ/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const rows: string[][] = data.GoogleSheetData
        const [header, ...entries] = rows
        const idxName = header.findIndex((h: string) => h.toLowerCase().includes("name"))
        const idxMsg = header.findIndex((h: string) => h.toLowerCase().includes("message"))
        const idxTime = header.findIndex((h: string) => h.toLowerCase().includes("timestamp"))
        const parsed = entries
          .map((row: string[]) => ({
            timestamp: row[idxTime],
            name: row[idxName],
            message: row[idxMsg],
          }))
          .reverse()
        setMessages(parsed)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch messages:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <Section id="messages" className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#d4af37]/3 to-transparent" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none">
        <Image
          src="/decoration/corner-top-left.png"
          alt="Corner decoration top left"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto"
          priority={false}
        />
      </div>
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
        <Image
          src="/decoration/corner-right-down.png"
          alt="Corner decoration bottom right"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto"
          priority={false}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="relative z-10 text-center mb-10 sm:mb-12 md:mb-16 px-4">
          {/* Love Messages Container */}
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 shadow-lg mb-3 sm:mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black">
              Love Messages
            </h2>
          </div>
          
        </div>

        {/* Form Section */}
        <div className="relative z-10 flex justify-center mb-12 sm:mb-16 lg:mb-20">
          <div className="relative w-full max-w-md">
            {/* Card halo */}
            <div className="absolute -inset-3 bg-gradient-to-br from-[#B38538]/20 via-[#74A0C5]/15 to-transparent rounded-3xl blur-2xl opacity-70" />
            <div className="absolute -inset-1 bg-gradient-to-br from-[#B38538]/10 via-transparent to-transparent rounded-3xl blur-md opacity-80" />
            <MessageForm onMessageSent={fetchMessages} />
          </div>
        </div>

        {/* Messages Display Section */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            {/* Messages from Loved Ones Container */}
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 shadow-lg mb-3 sm:mb-4">
              <div className="relative inline-block mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B38538]/20 to-[#B38538]/10 rounded-full blur-xl scale-150"></div>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#B38538] to-[#d4af37] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-black mb-2 sm:mb-3">
                Messages from Loved Ones
              </h3>
            </div>
            
            {/* Description Container */}
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 shadow-lg">
              <p className="text-sm sm:text-base md:text-lg text-black/80 font-lora leading-relaxed">
                Read the beautiful messages shared by family and friends
              </p>
            </div>
          </div>
          
          <MessageWallDisplay messages={messages} loading={loading} />
        </div>

      </div>
    </Section>
  )
}
