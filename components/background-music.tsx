"use client"

import { useEffect, useRef } from "react"

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const handleUserInteraction = () => {
      audioEl.play().then(() => {
        document.removeEventListener("click", handleUserInteraction)
        document.removeEventListener("touchstart", handleUserInteraction)
      }).catch((error: unknown) => {
        console.log("Playback blocked:", error)
      })
    }

    const setupUserInteraction = () => {
      document.addEventListener("click", handleUserInteraction)
      document.addEventListener("touchstart", handleUserInteraction)
    }

    // Attempt autoplay immediately and fall back to interaction listeners
    audioEl.play().catch((error: unknown) => {
      console.log("Autoplay blocked, waiting for user interaction:", error)
      setupUserInteraction()
    })

    return () => {
      audioRef.current?.pause()
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      // Use an encoded URI to avoid issues with spaces/parentheses on some mobile browsers
      src={encodeURI("/background_music/I Choose You The Wedding Song  Ryann Darling Original  On iTunes & Spotify.mp3")}
      loop
      preload="auto"
      // playsInline helps iOS treat this as inline media rather than requiring fullscreen behavior
      playsInline
      // Keep element non-visible; playback is initiated on first user interaction
      style={{ display: "none" }}
    />
  )
}

export default BackgroundMusic