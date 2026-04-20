import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sujalsharma.com'),
  title: 'Sujal Sharma · Race my C++ match engine',
  description:
    "Software engineer at Orbital (2 yrs). Built Mach-Zero — an HFT-style match engine in C++20 — as a side project. Race it in the browser; your reaction time vs sub-microsecond execution.",
  keywords: [
    'Sujal Sharma',
    'HFT',
    'high frequency trading',
    'C++ engineer',
    'Mach-Zero',
    'ultra-low latency',
    'software engineer',
    'trading systems',
    'portfolio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sujal Sharma · Race my C++ match engine',
    description:
      "Your reaction time vs an ultra-low-latency match engine. 180ms vs 800ns. Play the game.",
    siteName: 'Sujal Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sujal Sharma · Race my C++ match engine',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
