import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'K8Secret — a native macOS app for Kubernetes',
  description:
    'View, edit, and bulk-import secrets. Stream logs. Scale deployments. Port-forward with retry. Multi-cluster, multi-window, keyboard-driven. macOS · MIT.',
  openGraph: {
    title: 'K8Secret — a native macOS app for Kubernetes',
    description:
      'Native Swift, talks to the K8s API directly, decodes secrets in place. macOS · MIT.',
    images: [
      'https://raw.githubusercontent.com/jai-bhardwaj/k8secret/main/docs/screenshots/02-deployment-detail.png',
    ],
  },
}

export default function K8SecretLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
