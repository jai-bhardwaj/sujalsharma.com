export const PERSON = {
  firstName: 'Sujal',
  lastName: 'Sharma',
  full: 'Sujal Sharma',
  handle: 'sujal',
  role: 'software engineer',
  tagline: 'I build ultra-low-latency systems.',
  years: 2,
  company: 'Orbital',
  companyUrl: 'https://withorbital.com',
  location: 'Hyderabad, India',
  workMode: 'onsite',
  availability: 'open to opportunities',
  focus: 'low-latency systems · HFT · execution engines',
  stack: [
    'C++20',
    'TypeScript',
    'React',
    'Next.js',
    'Python',
    'PostgreSQL',
    'Linux',
  ],
  education: {
    degree: 'B.Tech · Computer Science',
    school: 'Dr. A.P.J. Abdul Kalam Technical University',
    years: '2020–2024',
  },
} as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/jai-bhardwaj',
  githubHandle: 'jai-bhardwaj',
  email: '0987sujals@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sharmasujal/',
} as const

export const NAV_LINKS = [
  { label: 'Arena', href: '#home' },
  { label: 'Profile', href: '#profile' },
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

export interface ProjectBar {
  label: string
  value: string
  /** fill pct 0–100 */
  fill: number
  tone?: 'cyan' | 'green' | 'orange' | 'magenta'
}

export interface Project {
  id: string
  title: string
  proc: string
  pid: number
  startedAt: string
  kicker: string
  description: string
  longDescription: string
  featured: boolean
  technologies: string[]
  links: { github?: string; demo?: string }
  info?: Record<string, string>
  bars?: ProjectBar[]
}

export const PROJECTS: Project[] = [
  {
    id: 'mach-zero',
    title: 'Mach-Zero',
    proc: 'mach-zero-engine',
    pid: 8421,
    startedAt: '2026-01-03T00:00:00Z',
    kicker: 'side_project_01 · open source',
    description: 'HFT-style execution engine, built solo to learn low-latency C++',
    longDescription:
      "A C++20 HFT-style execution engine I built solo to learn low-latency systems from the ground up. Simulates order flow against Binance and NSE market data with matching, risk checks, and replay — paired with a Next.js 16 control plane. Not production; it's how I learn by building what I wish existed.",
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
    info: {
      core: 'C++20',
      markets: 'binance · nse',
      control: 'next.js 16',
      storage: 'postgres · questdb',
    },
    bars: [
      { label: 'target p50', value: '< 1 μs', fill: 96, tone: 'cyan' },
      { label: 'target p99', value: '< 2.5 μs', fill: 88, tone: 'cyan' },
      { label: 'target tick→trade', value: '< 25 μs', fill: 82, tone: 'green' },
      { label: 'target throughput', value: '1M+ msg/s', fill: 92, tone: 'orange' },
    ],
  },
  {
    id: 'tcp-engine',
    title: 'TCP Engine',
    proc: 'tcp-engine',
    pid: 4512,
    startedAt: '2026-02-12T00:00:00Z',
    kicker: 'primitive_02 · open source',
    description: 'Zero-copy TCP server on io_uring',
    longDescription:
      "Lock-free TCP server built on io_uring with zero-copy buffers — a learning project exploring the networking substrate HFT engines sit on top of. Targets 1M+ msg/s on commodity hardware.",
    featured: false,
    technologies: ['C++20', 'io_uring', 'Linux', 'epoll', 'Socket Programming'],
    links: { github: 'https://github.com/jai-bhardwaj' },
    info: {
      kernel: 'io_uring',
      syscalls: 'zero-copy',
      platform: 'linux',
    },
    bars: [
      { label: 'target throughput', value: '1M+ msg/s', fill: 92, tone: 'orange' },
      { label: 'target cpu', value: '< 8% / core', fill: 12, tone: 'green' },
    ],
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
