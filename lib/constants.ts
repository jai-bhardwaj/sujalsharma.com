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
  status: 'OSS' | 'WIP' | 'ARCHIVED'
  lastCommit: string
  description: string
  longDescription: string
  featured: boolean
  technologies: string[]
  links: { github?: string; demo?: string }
  metrics?: { label: string; target: string; note?: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'mach-zero',
    ticker: 'MACH-0',
    title: 'Mach-Zero',
    lang: 'C++20',
    status: 'OSS',
    lastCommit: '2d ago',
    featured: true,
    description: 'HFT-style match engine, built solo to learn low-latency C++',
    longDescription:
      "A C++20 match engine I built solo to learn low-latency systems from the ground up. Simulates order flow against Binance and NSE market data with matching, risk checks, and replay — paired with a Next.js 16 control plane. Not production; it's how I learn by building what I wish existed.",
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
    metrics: [
      { label: 'match p50',    target: '< 1 μs',      note: 'target' },
      { label: 'match p99',    target: '< 2.5 μs',    note: 'target' },
      { label: 'tick→trade',   target: '< 25 μs',     note: 'target' },
      { label: 'throughput',   target: '1M+ msg/s',   note: 'target' },
    ],
  },
  {
    id: 'tcp-engine',
    ticker: 'TCP-1',
    title: 'TCP Engine',
    lang: 'C++20',
    status: 'OSS',
    lastCommit: '14d ago',
    featured: false,
    description: 'Zero-copy TCP server on io_uring',
    longDescription:
      "Lock-free TCP server on io_uring with zero-copy buffers — a learning project exploring the networking substrate HFT engines sit on top of. Targets 1M+ msg/s on commodity hardware.",
    technologies: ['C++20', 'io_uring', 'Linux', 'epoll', 'Socket Programming'],
    links: { github: 'https://github.com/jai-bhardwaj' },
    metrics: [
      { label: 'throughput',   target: '1M+ msg/s',   note: 'target' },
      { label: 'cpu',          target: '< 8% / core', note: 'target' },
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

