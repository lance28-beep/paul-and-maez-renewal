"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Check, Download } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const hashtags = ["#TeamPaulMaez", "#PaulAndMaez2025"]
  const shareText = `Join us in celebrating our special day! Check out our wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedHashtag(true)
      setTimeout(() => setCopiedHashtag(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "wedding-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section id="snap-share" className="relative bg-transparent py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 text-balance">
            Snap & Share
          </h2>
          <p className="font-sans text-[#FFFFFF]/90 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm md:text-base px-2 sm:px-4">
            Help us document our special day by sharing moments using our official hashtags.
          </p>
          <div className="mx-auto mt-2 sm:mt-3 h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#B38538]/60 to-transparent" />
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="p-[1.5px] rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#B38538]/50 via-[#74A0C5]/35 to-[#B38538]/50"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-[#B38538]/30">
              <div className="text-center">
                <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4">
                  {hashtags.map((hashtag) => (
                    <div key={hashtag} className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#B38538]/10 to-[#74A0C5]/15 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl shadow-md border border-[#B38538]/25 w-full sm:w-auto mx-auto">
                      <span className="font-sans text-xs sm:text-sm md:text-base font-bold text-[#081623] break-all sm:break-normal tracking-wide">{hashtag}</span>
                      <button
                        onClick={() => copyToClipboard(hashtag)}
                        className="p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm flex-shrink-0 ring-1 ring-[#B38538]/40"
                        title="Copy hashtag"
                      >
                        {copiedHashtag ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#172652]" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-[#081623]/60" />}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-[#081623] text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3">Use these hashtags on your posts to be featured in our gallery.</p>
              </div>

              <div className="mt-4 sm:mt-5 md:mt-6">
                <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#081623] mb-2 sm:mb-3 md:mb-4 text-center">Our Favorite Moments</h4>
                {/* Two squares on top, one landscape below */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                  <motion.div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md ring-1 ring-[#B38538]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (19).jpg" alt="Favorite moment 1" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md ring-1 ring-[#B38538]/40" whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }}>
                    <Image src="/mobile-background/couple (15).jpg" alt="Favorite moment 2" fill className="object-cover" />
                  </motion.div>
                  <motion.div className="relative col-span-2 aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden shadow-md ring-1 ring-[#B38538]/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.25 }}>
                    <Image src="/desktop-background/couple (4).jpg" alt="Favorite moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className="font-sans text-[#081623] text-[9px] sm:text-[10px] md:text-xs text-center mt-2 sm:mt-3 px-2">Share your photos using our hashtag to be featured here!</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
            <div className="p-[1.5px] rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-[#B38538]/50 via-[#74A0C5]/35 to-[#B38538]/50">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-[#B38538]/30 text-center">
                <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#081623] mb-2 sm:mb-3 md:mb-4">Share Our Website</h4>
                <div className="mx-auto inline-flex flex-col items-center bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md border border-[#081623]/10 mb-3 sm:mb-4">
                  <div className="mb-2 sm:mb-3 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#B38538]/40 via-[#FFFFFF]/40 to-white ring-1 ring-[#B38538]/40">
                    <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm">
                      <QRCodeCanvas id="snapshare-qr" value={websiteUrl} size={isMobile ? 100 : 128} includeMargin className="bg-white" />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md text-[10px] sm:text-xs md:text-sm font-sans"
                    style={{ backgroundColor: '#081623', color: 'white' }}
                  >
                    <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: 'white' }} />
                    <span>Download QR</span>
                  </button>
                </div>
                <p className="font-sans text-[#081623] text-[9px] sm:text-[10px] md:text-xs">Scan with any camera app</p>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-[#B38538]/30">
              <h5 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#081623] mb-2 sm:mb-3 md:mb-4 text-center">Share on Social Media</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[10px] sm:text-xs md:text-sm">Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[10px] sm:text-xs md:text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/10"
                >
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[10px] sm:text-xs md:text-sm">TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-white/20"
                >
                  <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[10px] sm:text-xs md:text-sm">Twitter</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-4 sm:mt-6 md:mt-8" variants={fadeInUp}>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg border border-[#B38538]/30 max-w-3xl mx-auto">
            <p className="font-sans text-[#081623] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-2 sm:mb-3 md:mb-4">
              We are so excited to celebrate our love with you! See you on our special day!
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="text-center">
                <span className="block font-serif text-[#081623] font-bold text-sm sm:text-base md:text-lg lg:text-xl">– Paul & Maez –</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
