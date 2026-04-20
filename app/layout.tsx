import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sujalsharma.com'),
  title: 'SUJAL SHARMA · SWE:L2',
  description:
    'Software engineer at Orbital (2y). Building Mach-Zero, an HFT-style C++20 match engine, for fun. Hyderabad, IN. Open to opportunities.',
  keywords: [
    'Sujal Sharma',
    'software engineer',
    'C++',
    'HFT',
    'low latency',
    'Mach-Zero',
    'Orbital',
    'Hyderabad',
    'portfolio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'SUJAL SHARMA · SWE:L2 · OPEN',
    description:
      'Software engineer at Orbital. Building Mach-Zero on the side. Race my C++ match engine — you will lose.',
    siteName: 'Sujal Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUJAL SHARMA · SWE:L2 · OPEN',
    description: 'Race my C++ match engine. You will lose by ~300,000×.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
