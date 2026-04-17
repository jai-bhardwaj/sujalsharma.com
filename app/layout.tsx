import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://jaibhardwaj.dev'),
  title: 'Jai Bhardwaj · Race my C++ match engine',
  description:
    "Think you're fast? Race jai-bhardwaj's ultra-low-latency match engine in the browser. Your reaction time vs Mach-Zero's sub-microsecond execution. Spoiler: you lose by ~300,000×.",
  keywords: [
    'Jai Bhardwaj',
    'HFT',
    'high frequency trading',
    'C++ engineer',
    'Mach-Zero',
    'ultra-low latency',
    'systems engineer',
    'trading systems',
    'portfolio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Jai Bhardwaj · Race my C++ match engine',
    description:
      "Your reaction time vs an ultra-low-latency match engine. 180ms vs 800ns. Play the game.",
    siteName: 'Jai Bhardwaj',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Bhardwaj · Race my C++ match engine',
    description:
      '180ms vs 800ns. Race my engine. You will lose by ~300,000×.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
