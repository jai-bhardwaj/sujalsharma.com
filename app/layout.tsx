import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sujalsharma.com'),
  title: 'Sujal Sharma — Software Engineer',
  description:
    'I build software that has to be fast. Software engineer at Orbital (2y), based in Hyderabad. On the side: Mach-Zero, a C++20 HFT-style match engine built for learning.',
  keywords: [
    'Sujal Sharma',
    'software engineer',
    'C++',
    'Mach-Zero',
    'Orbital',
    'Hyderabad',
    'low latency',
    'portfolio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Sujal Sharma — Software Engineer',
    description:
      'I build software that has to be fast. Orbital engineer, Hyderabad. Try the race — it will beat you by ~300,000×.',
    siteName: 'Sujal Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sujal Sharma — Software Engineer',
    description: 'I build software that has to be fast. Race my C++ match engine.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
