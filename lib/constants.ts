export const PERSON = {
  firstName: 'Sujal',
  lastName: 'Sharma',
  full: 'Sujal Sharma',
  handle: 'sujal',
  role: 'software engineer',
  level: 'SWE:L2',
  years: 2,
  company: 'Orbital',
  companyBlurb: 'AI sales intel for SMBs',
  companyUrl: 'https://withorbital.com',
  orbitalStartDate: '2024-06-01T00:00:00Z',
  orbitalBlurb:
    "I ship things that prospect, enrich, and verify SMB data at scale. Most of what I write touches backend throughput, messy real-world data, and the glue that turns it into something a sales rep can actually use. (Sujal: replace this with specifics — team size, 2 things shipped this quarter, the tech you touch day-to-day.)",
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
    schoolShort: 'AKTU',
    years: '2020–2024',
  },
} as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/jai-bhardwaj',
  githubHandle: 'jai-bhardwaj',
  email: '0987sujals@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sharmasujal/',
  linkedinHandle: 'sharmasujal',
} as const

export interface Project {
  id: string
  ticker: string
  title: string
  lang: string
  status: 'OSS' | 'WIP' | 'PRIVATE' | 'ARCHIVED'
  lastCommit: string
  description: string
  longDescription: string
  featured: boolean
  technologies: string[]
  repos?: Array<{ label: string; url: string }>
  demo?: string
  metrics?: { label: string; target: string; note?: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'mach-zero',
    ticker: 'MACH-0',
    title: 'Mach-Zero',
    lang: 'C++20',
    status: 'PRIVATE',
    lastCommit: 'private repo',
    featured: true,
    description: 'HFT-style match engine, built solo to learn low-latency C++',
    longDescription:
      "A C++20 match engine I built solo to learn low-latency systems from the ground up. Simulates order flow against Binance and NSE market data with matching, risk checks, and replay — paired with a Next.js 16 control plane. Code is private; demo and benchmark are open.",
    technologies: [
      'C++20',
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'QuestDB',
      'WebSocket',
    ],
    demo: 'https://mach-zero.vercel.app',
    metrics: [
      { label: 'match p50',    target: '< 1 μs',      note: 'target' },
      { label: 'match p99',    target: '< 2.5 μs',    note: 'target' },
      { label: 'tick→trade',   target: '< 25 μs',     note: 'target' },
      { label: 'throughput',   target: '1M+ msg/s',   note: 'target' },
    ],
  },
  {
    id: 'pinnacle',
    ticker: 'PNCL',
    title: 'Pinnacle Trading Platform',
    lang: 'Python · TypeScript',
    status: 'OSS',
    lastCommit: 'oct 2025',
    featured: true,
    description: 'Multi-user algo trading platform: pub/sub backend + Next.js control plane',
    longDescription:
      "End-to-end algorithmic trading platform. Python backend pushes signals from a strategy engine through Redis pub/sub to an order manager that executes against Angel One (paper or live). Next.js 15 frontend on Prisma/Postgres for users, strategies, orders, and portfolio tracking. Two repos, one system.",
    technologies: [
      'Python',
      'Redis',
      'Angel One API',
      'Next.js 15',
      'Prisma',
      'PostgreSQL',
      'MobX',
      'Tailwind CSS',
    ],
    repos: [
      { label: 'backend', url: 'https://github.com/jai-bhardwaj/trading-backend' },
      { label: 'frontend', url: 'https://github.com/jai-bhardwaj/pinnaclealgo' },
    ],
    metrics: [
      { label: 'broker',      target: 'Angel One',     note: 'live + paper' },
      { label: 'transport',   target: 'Redis pub/sub', note: 'fan-out' },
      { label: 'strategies',  target: 'MA · RSI · …',   note: 'extensible' },
    ],
  },
  {
    id: 'k8secret',
    ticker: 'K8S-1',
    title: 'K8Secret',
    lang: 'Swift',
    status: 'OSS',
    lastCommit: '1d ago',
    featured: false,
    description: 'Native macOS app for managing Kubernetes — secrets, deployments, pods, logs, port-forwards',
    longDescription:
      "A native macOS app that talks directly to the Kubernetes API. Decodes Opaque secrets in-place, edits with bulk .env import, scales deployments, streams pod logs with severity filters, and handles port-forwarding with retry. Multi-cluster, multi-window, keyboard-driven. MIT.",
    technologies: ['Swift', 'SwiftUI', 'macOS', 'Kubernetes API', 'kubectl'],
    repos: [
      { label: 'source', url: 'https://github.com/jai-bhardwaj/k8secret' },
    ],
    metrics: [
      { label: 'platform',    target: 'macOS native', note: 'menu bar + windows' },
      { label: 'license',     target: 'MIT',           note: 'OSS' },
      { label: 'multi-cluster', target: '✓',           note: 'context-aware' },
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

