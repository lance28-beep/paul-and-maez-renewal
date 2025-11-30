"use client"

import { useEffect, useRef, useState } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasTriedAutoplay = useRef(false)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    // Function to start playing with fade-in effect
    const startPlayback = async () => {
      if (isPlaying) return

      try {
        // Start with low volume
        audioEl.volume = 0.3
        await audioEl.play()
        setIsPlaying(true)
        
        // Fade in the volume smoothly
        let currentVolume = 0.3
        const fadeInterval = setInterval(() => {
          if (currentVolume < 0.5) {
            currentVolume += 0.05
            audioEl.volume = Math.min(currentVolume, 0.5)
          } else {
            clearInterval(fadeInterval)
          }
        }, 100)

        return fadeInterval
      } catch (error) {
        console.log("Autoplay prevented, waiting for user interaction:", error)
        return null
      }
    }

    // Try to autoplay immediately when component mounts
    if (!hasTriedAutoplay.current) {
      hasTriedAutoplay.current = true
      
      // Small delay to ensure audio element is ready
      const autoplayTimeout = setTimeout(() => {
        startPlayback()
      }, 500)

      return () => clearTimeout(autoplayTimeout)
    }

    // Fallback: play on user interaction if autoplay was blocked
    const handleUserInteraction = () => {
      if (!isPlaying) {
        startPlayback().then((fadeInterval) => {
          // Remove listeners once playback starts
          document.removeEventListener("click", handleUserInteraction)
          document.removeEventListener("touchstart", handleUserInteraction)
          document.removeEventListener("scroll", handleUserInteraction)
          document.removeEventListener("keydown", handleUserInteraction)
        })
      }
    }

    // Add multiple event listeners for better coverage
    document.addEventListener("click", handleUserInteraction, { once: true })
    document.addEventListener("touchstart", handleUserInteraction, { once: true })
    document.addEventListener("scroll", handleUserInteraction, { once: true })
    document.addEventListener("keydown", handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("scroll", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src={encodeURI(
        "/background_music/I Choose You The Wedding Song  Ryann Darling Original  On iTunes & Spotify.mp3"
      )}
      loop
      preload="auto"
      playsInline
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic


