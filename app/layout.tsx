import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sujalsharma.com'),
  title: 'Sujal Sharma — Software Engineer',
  description:
    "Engineer's notebook. Software engineer at Orbital (2y). Building Mach-Zero, a C++20 HFT-style match engine, for fun. Hyderabad, India.",
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
    title: "Sujal Sharma — Engineer's Notebook",
    description:
      "Software engineer at Orbital. On the side: Mach-Zero, a C++ match engine. Race it — you'll lose by ~300,000×.",
    siteName: 'Sujal Sharma',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sujal Sharma — Engineer's Notebook",
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
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,700;1,6..96,500&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
