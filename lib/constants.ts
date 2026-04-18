export const PERSON = {
  firstName: 'Sujal',
  lastName: 'Sharma',
  full: 'Sujal Sharma',
  handle: 'sujal',
  role: 'software engineer',
  tagline: 'I build ultra-low-latency systems.',
} as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/jai-bhardwaj',
  githubHandle: 'jai-bhardwaj',
  email: '0987sujals@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jai-bhardwaj/',
} as const

export const NAV_LINKS = [
  { label: 'Arena', href: '#home' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

export const COLORS = {
  bgPrimary: '#0A0E13',
  bgSecondary: '#111722',
  bgCard: '#151B28',
  textPrimary: '#F5F7FA',
  textSecondary: '#8A94A6',
  accentCyan: '#00E5FF',
  accentOrange: '#FF6B35',
  accentMagenta: '#FF2E92',
  accentGreen: '#00FF94',
  accentYellow: '#FFD600',
} as const

export interface Project {
  id: string
  title: string
  kicker: string
  description: string
  longDescription: string
  featured: boolean
  technologies: string[]
  links: { github?: string; demo?: string }
  metrics?: Record<string, string>
}

export const PROJECTS: Project[] = [
  {
    id: 'mach-zero',
    title: 'Mach-Zero',
    kicker: 'strategy_01 · live',
    description: 'Ultra-low latency algorithmic trading engine',
    longDescription:
      'Nanosecond-precision execution engine with a C++20 core and a Next.js 16 control plane. Runs across Binance (crypto) and NSE (India equities) with multi-tenant risk monitoring, a strategy marketplace, and replayable order flow.',
    featured: true,
    technologies: [
      'C++20',
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'QuestDB',
      'WebSocket',
    ],
    links: {
      github: 'https://github.com/jai-bhardwaj/mach-zero',
      demo: 'https://mach-zero.vercel.app',
    },
    metrics: {
      'Match Latency': '< 1μs',
      'Tick-to-Trade': '< 25μs',
      'Markets': 'Binance · NSE',
    },
  },
  {
    id: 'tcp-engine',
    title: 'TCP Engine',
    kicker: 'primitive_02',
    description: 'Zero-copy TCP server in C++20',
    longDescription:
      'Lock-free TCP client-server built on io_uring with zero-copy buffers. Sustains 1M+ msgs/sec on commodity hardware — the networking substrate that powers Mach-Zero.',
    featured: false,
    technologies: ['C++20', 'io_uring', 'Linux', 'epoll', 'Socket Programming'],
    links: { github: 'https://github.com/jai-bhardwaj' },
    metrics: {
      'Throughput': '1M+ msg/s',
      'Syscalls': 'zero-copy',
    },
  },
]

/** Realistic HFT engine latency distribution, in nanoseconds.
 *  Calibrated to Mach-Zero p50/p99 targets — biased lognormal. */
export const ENGINE_LATENCY = {
  p50_ns: 800,
  p99_ns: 2400,
  floor_ns: 420,
  ceil_ns: 6500,
} as const

export type ArenaResult = {
  userMs: number
  engineNs: number
  multiplier: number
  at: number
}
