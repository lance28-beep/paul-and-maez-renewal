import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import MasonryGallery from "@/components/masonry-gallery"

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const [desktop, mobile] = await Promise.all([
    getImagesFrom("desktop-background"),
    getImagesFrom("mobile-background"),
  ])
  const images = [
    ...desktop.map((src) => ({ src, category: "desktop" as const })),
    ...mobile.map((src) => ({ src, category: "mobile" as const })),
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6]/90 to-[#1e3a8a] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#d4af37]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#d4af37]/5 to-transparent" />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Header - compact */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 drop-shadow-md">
            Gallery
          </h1>
          <p className="mt-2 sm:mt-3 text-[#FFFFFF]/90 font-sans font-light text-xs sm:text-sm md:text-base">
            A collection from our favorite moments
          </p>
          <div className="mx-auto mt-3 sm:mt-4 h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
        </div>

        {images.length === 0 ? (
          <div className="text-center text-[#FFFFFF]/80 px-4">
            <p className="text-sm sm:text-base">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-white/10 rounded border border-[#B38538]/30 text-[#FFFFFF]/90 text-xs sm:text-sm">
                public/desktop-background
              </code>{" "}
              or{" "}
              <code className="px-2 py-1 bg-white/10 rounded border border-[#B38538]/30 text-[#FFFFFF]/90 text-xs sm:text-sm">
                public/mobile-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}

        {/* CTA Section - compact */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#B38538]/30 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B38538]/20 border border-[#B38538]/40 rounded-full text-[#B38538] font-sans font-medium text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
              <span>📸</span>
              <span>Upload Photo Coming Soon</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#FFFFFF] mb-2 sm:mb-3 md:mb-4">
              Share Your Moments
            </h2>
            <p className="text-[#FFFFFF]/90 font-sans font-light text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 leading-relaxed px-2">
              Be ready to share photos and they'll appear here! Use our wedding hashtags to share your photos and be featured in our gallery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B38538]/20 border border-[#B38538]/40 rounded-full text-[#B38538] font-sans font-medium text-xs sm:text-sm">
                #TeamPaulMaez
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#B38538]/20 border border-[#B38538]/40 rounded-full text-[#B38538] font-sans font-medium text-xs sm:text-sm">
                #PaulAndMaez2025
              </span>
            </div>
            <Link
              href="/#snap-share"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-[#B38538] to-[#B38538]/90 text-[#FFFFFF] font-semibold rounded-full border border-[#B38538] hover:from-[#B38538]/90 hover:to-[#B38538] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans text-xs sm:text-sm md:text-base"
            >
              Learn More About Sharing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
