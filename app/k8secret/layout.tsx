import type { Metadata } from 'next'

const TITLE = 'K8Secret — a native macOS app for Kubernetes'
const DESC =
  'View, edit, and bulk-import secrets. Stream logs. Scale deployments. Port-forward with retry. Multi-cluster, multi-window, keyboard-driven. Native Swift. MIT. No telemetry.'
const PAGE_URL = 'https://sujalsharma.com/k8secret'
const OG_IMAGE = 'https://sujalsharma.com/k8secret/02-deployment-detail.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://sujalsharma.com'),
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: TITLE,
    description: DESC,
    siteName: 'K8Secret',
    images: [{ url: OG_IMAGE, width: 1600, height: 1000, alt: 'K8Secret deployment detail view' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  keywords: [
    'Kubernetes',
    'K8s',
    'macOS',
    'native app',
    'kubectl alternative',
    'secrets manager',
    'log streaming',
    'port-forward',
    'multi-cluster',
    'SwiftUI',
    'OSS',
    'open source',
  ],
  robots: { index: true, follow: true },
}

// JSON-LD structured data for SoftwareApplication. Helps Google show
// price/rating chips and the install CTA in rich results.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'K8Secret',
  description: DESC,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS 14+',
  url: PAGE_URL,
  downloadUrl: 'https://github.com/jai-bhardwaj/k8secret/releases/latest',
  softwareVersion: '0.5.2',
  license: 'https://github.com/jai-bhardwaj/k8secret/blob/main/LICENSE',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'Sujal Sharma',
    url: 'https://sujalsharma.com',
  },
  image: OG_IMAGE,
}

export default function K8SecretLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // Safe: literal object, controlled string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      {children}
    </>
  )
}
