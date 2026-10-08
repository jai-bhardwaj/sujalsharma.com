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
    "At Orbital I'm building the sync system — pulling objects from different CRMs and CSVs, and moving prospect records out of a ClickHouse directory into our Postgres object tables on BullMQ workers under Kubernetes. Most of what I write touches backend throughput, messy real-world data, and the glue that turns it into something a sales rep can actually use.",
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
    status: 'OSS',
    lastCommit: 'oct 2026',
    featured: true,
    description: 'C++20 algorithmic trading system, built solo with heavy AI assistance',
    longDescription:
      "A C++20 trading system I built solo with heavy AI assistance, to learn low-latency engineering from the ground up. Order book, pre-trade risk gate, strategy engine and a replayable WAL over Aeron IPC and an SBE wire format, with a QuestDB tick store and a Next.js 16 control plane. ~11,100 lines of hand-written C++ plus a 24,300-line dashboard, 173 tests. The repo also documents a latency table I withdrew: the harness was timing a single operation between two steady_clock reads, and on Apple silicon that clock's 41.7ns tick meant every published figure was one or two ticks of the instrument rather than a measurement of the code.",
    technologies: [
      'C++20',
      'Next.js 16',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'QuestDB',
      'WebSocket',
    ],
    repos: [{ label: 'github', url: 'https://github.com/jai-bhardwaj/mach-zero' }],
    demo: 'https://mach-zero.vercel.app',
    metrics: [
      { label: 'match p50',    target: '< 1 μs',      note: 'target' },
      { label: 'match p99',    target: '< 2.5 μs',    note: 'target' },
      { label: 'tick→trade',   target: '< 25 μs',     note: 'target' },
      { label: 'throughput',   target: '1M+ msg/s',   note: 'target' },
    ],
  },
  {
    id: 'restore-proof',
    ticker: 'RSTR',
    title: 'restore-proof',
    lang: 'PostgreSQL · Bash',
    status: 'OSS',
    lastCommit: 'oct 2026',
    featured: true,
    description: 'A backup you have not restored is not a backup, it is a claim',
    longDescription:
      "Backup tooling reports the claim as the fact: the dump exited zero, the file is on disk, the dashboard is green. None of that establishes the data can come back. This runs Postgres with streaming replication and WAL archiving, then continuously tries to disprove its own backups by restoring each one into a throwaway instance and querying it. Three states and no fourth \u2014 VERIFIED, UNVERIFIED, FAILED \u2014 and the backup script writes UNVERIFIED on success, because exiting zero is not evidence. It caught its own failure mode while being built: a permissions mistake meant the restored container ran initdb and came up as a pristine empty cluster, perfectly healthy and completely empty. Only the query step noticed.",
    technologies: ['PostgreSQL', 'Replication', 'PITR', 'Ansible', 'Prometheus', 'Docker'],
    repos: [{ label: 'github', url: 'https://github.com/jai-bhardwaj/restore-proof' }],
  },
  {
    id: 'driftscan',
    ticker: 'DRIFT',
    title: 'driftscan',
    lang: 'Python',
    status: 'OSS',
    lastCommit: 'oct 2026',
    featured: true,
    description: 'A sync that reports success has not told you the two stores agree',
    longDescription:
      "The sync failure that matters is not the one that pages you, it is the one where the job completes, logs a row count and is quietly wrong. Checking properly means comparing every row on both sides every time, so nobody runs it. driftscan buckets the key space and compares a row count plus an order-independent XOR of row hashes per bucket \u2014 one grouped query per side whatever the table size \u2014 then opens only the buckets that disagree: finding six bad rows in fifty thousand reads 1,195 of them. It normalises decimal scale, timestamp precision and bool/int before hashing, because a detector that reports every type round-trip as drift stops being read after the third false alarm; each normalisation is lossy on purpose, so each is named in the report. And it has three verdicts rather than two, because \u201cI found nothing\u201d and \u201cI stopped looking\u201d call for opposite responses.",
    technologies: ['Python', 'BLAKE2b', 'ClickHouse', 'PostgreSQL', 'Zero deps'],
    repos: [{ label: 'github', url: 'https://github.com/jai-bhardwaj/driftscan' }],
  },
  {
    id: 'evalgate',
    ticker: 'EVAL',
    title: 'evalgate',
    lang: 'Python',
    status: 'OSS',
    lastCommit: 'oct 2026',
    featured: true,
    description: 'An eval harness that refuses to report a difference it cannot defend',
    longDescription:
      "Most eval tooling reports that prompt A scored 73% and prompt B scored 76%, and leaves you to draw the obvious conclusion. On sixty cases at a non-zero temperature that conclusion is usually wrong. evalgate repeats every case, pairs the comparison so case difficulty cancels, and separates \u201cno difference\u201d from \u201cnot measured\u201d \u2014 withholding a winner when the bootstrap interval spans zero and saying how many cases would have been needed. Detecting a +3-point improvement on a 73% baseline takes roughly 3,300 cases per variant; most published comparisons use 50\u2013100.",
    technologies: ['Python', 'Wilson intervals', 'Paired bootstrap', 'Zero deps'],
    repos: [{ label: 'github', url: 'https://github.com/jai-bhardwaj/evalgate' }],
  },
  {
    id: 'spsc-queue',
    ticker: 'SPSC',
    title: 'spsc-queue',
    lang: 'C++20',
    status: 'OSS',
    lastCommit: 'oct 2026',
    featured: false,
    description: 'Wait-free SPSC ring buffer, with a benchmark that polices itself',
    longDescription:
      "Single-producer/single-consumer queue: power-of-two capacity so the wrap is a mask rather than a division, cache-line padded indices so the producer's store does not invalidate the consumer's line, and each side caching the other's cursor so the steady state touches no shared line at all. Release/acquire ordering is verified by a 500,000-item two-thread soak under ThreadSanitizer. The first version of its README claimed a 4.3\u00d7 speedup over a mutex; that turned out to be a measurement artifact, and the benchmark now reports per-run spread and withholds every derived ratio when the machine is too busy for the number to mean anything.",
    technologies: ['C++20', 'ThreadSanitizer', 'CMake', 'Atomics'],
    repos: [{ label: 'github', url: 'https://github.com/jai-bhardwaj/spsc-queue' }],
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

