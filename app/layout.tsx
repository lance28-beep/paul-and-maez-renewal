import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// Using Shippori Mincho font for the serif/elegant text
const shipporiMincho = { style: { fontFamily: '"Shippori Mincho", serif' }, variable: "--font-serif" }

export const metadata: Metadata = {
  title: "Paul & Maez - Renewal of Vows Invitation",
  description:
    "You're invited to the renewal of vows of Paul & Maez! Join us on December 22, 2025 at Kangara Gymnasium, Carigara, Leyte. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Paul Maez renewal of vows, Filipino wedding, vow renewal, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 celebrations, love story, guestbook, wedding registry, wedding details, Kangara Gymnasium, Carigara Leyte, #PaulAndMaezRenewal",
  authors: [
    { name: "Paul" },
    { name: "Maez" },
  ],
  creator: "Paul & Maez",
  publisher: "Paul & Maez",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://paul-and-maez-renewal.vercel.app/"),
  alternates: {
    canonical: "https://paul-and-maez-renewal.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Paul & Maez Renewal of Vows | December 22, 2025",
    description:
      "Celebrate the renewal of vows of Paul & Maez on December 22, 2025 at Kangara Gymnasium, Carigara, Leyte. Discover their love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://paul-and-maez-renewal.vercel.app/",
    siteName: "Paul and Maez Renewal of Vows",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://paul-and-maez-renewal.vercel.app/desktop-background/couple (10).jpg",
        width: 1200,
        height: 630,
        alt: "Paul & Maez Renewal of Vows - December 22, 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul & Maez Renewal of Vows Invitation",
    description:
      "You're invited to the renewal of vows of Paul & Maez! December 22, 2025. RSVP, view our gallery, and leave a message! #PaulAndMaezRenewal",
    images: ["https://paul-and-maez-renewal.vercel.app/desktop-background/couple (10).jpg"],
    creator: "@paulandmaez",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Paul & Maez Renewal of Vows",
      startDate: "2025-12-22T14:00:00+08:00",
      endDate: "2025-12-22T20:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Kangara Gymnasium",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kangara",
            addressLocality: "Carigara",
            addressRegion: "Leyte",
            postalCode: "",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://paul-and-maez-renewal.vercel.app/desktop-background/couple (10).jpg"],
      description:
        "You're invited to the renewal of vows of Paul & Maez! Join us on December 22, 2025 at Kangara Gymnasium, Carigara, Leyte. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Paul & Maez",
      },
      offers: {
        "@type": "Offer",
        url: "https://paul-and-maez-renewal.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#PaulAndMaezRenewal",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho&family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} font-inter antialiased text-foreground`} style={{ fontFamily: 'var(--font-inter), "Shippori Mincho", serif' }}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
