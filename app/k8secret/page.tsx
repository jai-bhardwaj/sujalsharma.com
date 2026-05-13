import Link from 'next/link'
import CopyButton from '@/components/k8secret/CopyButton'
import './k8secret.css'

const REPO_URL = 'https://github.com/jai-bhardwaj/k8secret'
const LATEST_RELEASE_URL = 'https://github.com/jai-bhardwaj/k8secret/releases/latest'
const INSTALL_CURL =
  'curl -fsSL https://raw.githubusercontent.com/jai-bhardwaj/k8secret/main/release/install.sh | bash'

export default function K8SecretPage() {
  return (
    <div className="k8s-root">
      <Nav />
      <Hero />
      <TrustStrip />
      <Why />
      <Showcase
        eyebrow="Secrets"
        title="Decoded inline. No more base64 chains."
        body="Opaque secrets render as readable key/value pairs the moment you select them. Edit in place. Reveal on click. Bulk-import a .env or JSON with a live preview of which keys are new and which will be overwritten — before any change touches the cluster."
        bullets={[
          'Inline reveal on click — never accidentally screenshot a secret you forgot you opened',
          'Bulk import from .env, JSON, or paste — diff preview before commit',
          'Per-key search across an entire secret, across namespaces',
        ]}
        image="/k8secret/09-secret-detail.png"
        alt="A Kubernetes secret displayed as plain key/value pairs with reveal-on-click controls"
        flip={false}
      />
      <Showcase
        eyebrow="Logs"
        title="Live tail with severity filters."
        body="Each pod gets a dedicated log window. Stream in real time, filter by level, search across the stream, pop multiple windows side by side. The kind of log experience you'd build for yourself if kubectl logs -f weren't your only option."
        bullets={[
          'Per-pod log windows that survive context switches',
          'Filter by INFO / WARN / ERROR with a single keypress',
          'Multi-window — tail prod and staging side by side',
        ]}
        image="/k8secret/05-log-stream.png"
        alt="Live log streaming window with severity filters and search"
        flip={true}
      />
      <Showcase
        eyebrow="Bulk import"
        title=".env files, in. Secret manifests, out."
        body="Paste a .env or upload a JSON file. K8Secret shows the merge preview — which keys are new, which will be overwritten, which are unchanged — before any change touches the cluster. Then commit, or back out cleanly."
        bullets={[
          'Drag-drop .env, JSON, or yaml',
          'Visual merge preview with per-key diff',
          'Idempotent: re-importing the same file is a no-op',
        ]}
        image="/k8secret/10-bulk-import.png"
        alt="Bulk-import dialog showing a .env file being merged into a Kubernetes secret"
        flip={false}
      />
      <Showcase
        eyebrow="Pods"
        title="The detail view a real engineer needs."
        body="CPU and memory plotted against requests and limits. Container info, pod IP, owner reference, recent events. Everything kubectl describe shows, in a window you can scan at a glance."
        bullets={[
          'CPU/mem against requests and limits — see throttling before it hurts',
          'Owner chain (Deployment → ReplicaSet → Pod) is one click away',
          'Events feed for the pod and its containers',
        ]}
        image="/k8secret/04-pod-detail.png"
        alt="Pod detail view with metrics, container info, and events"
        flip={true}
      />
      <FeatureGrid />
      <Architecture />
      <Install />
      <Specs />
      <Roadmap />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

function Nav() {
  return (
    <nav className="k8s-nav" aria-label="Primary">
      <div className="k8s-nav-inner">
        <Link href="/k8secret" className="k8s-brand" aria-label="K8Secret home">
          <Logo />
          <span>K8Secret</span>
        </Link>
        <div className="k8s-nav-links">
          <a href="#features">Features</a>
          <a href="#install">Install</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LATEST_RELEASE_URL} className="k8s-btn k8s-btn-primary k8s-btn-sm">
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Stylized key + hexagon — secrets + k8s */}
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12.5 12h5M16 12v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="k8s-hero">
      <div className="k8s-hero-orb" aria-hidden />
      <div className="k8s-container">
        <div className="k8s-hero-grid">
          <div className="k8s-hero-content">
            <div className="k8s-eyebrow">
              <span className="k8s-dot k8s-dot-live" aria-hidden />
              <span>macOS · open source · v0.5.2</span>
            </div>
            <h1 className="k8s-h1">
              Kubernetes,{' '}
              <span className="k8s-grad">
                in a window
              </span>
              {' '}that behaves like macOS.
            </h1>
            <p className="k8s-hero-sub">
              Secrets you can read. Deployments you can scale. Logs that
              stream. K8Secret talks directly to your cluster's API —
              no Electron, no kubectl shim, no telemetry.
            </p>
            <div className="k8s-hero-ctas">
              <a
                href={LATEST_RELEASE_URL}
                className="k8s-btn k8s-btn-primary"
                aria-label="Download K8Secret for macOS"
              >
                <DownloadIcon />
                Download for macOS
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="k8s-btn k8s-btn-ghost"
              >
                <GitHubIcon />
                View on GitHub
              </a>
            </div>
            <p className="k8s-hero-meta">
              Free and open source · MIT license · macOS 14+
            </p>
          </div>

          <div className="k8s-hero-image" aria-hidden>
            <MacWindow title="K8Secret — production">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/k8secret/02-deployment-detail.png"
                alt=""
                width={1600}
                height={1000}
                fetchPriority="high"
              />
            </MacWindow>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Trust strip                                                                */
/* -------------------------------------------------------------------------- */

function TrustStrip() {
  const items = [
    { label: 'Native Swift', detail: 'no Electron, no Wails' },
    { label: 'kubeconfig auth', detail: 'token · cert · exec plugins' },
    { label: 'No telemetry', detail: 'zero phone-home' },
    { label: 'MIT license', detail: 'use it anywhere' },
  ]
  return (
    <section className="k8s-trust" aria-label="At a glance">
      <div className="k8s-container">
        <div className="k8s-trust-grid">
          {items.map((it) => (
            <div key={it.label} className="k8s-trust-item">
              <div className="k8s-trust-label">{it.label}</div>
              <div className="k8s-trust-detail">{it.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Why                                                                        */
/* -------------------------------------------------------------------------- */

function Why() {
  return (
    <section className="k8s-section" aria-labelledby="why-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">Why K8Secret</div>
          <h2 id="why-title" className="k8s-h2">
            The K8s GUI you'd build for yourself.
          </h2>
          <p className="k8s-lede">
            Two existing options. The CLI gives you everything but makes
            secrets unreadable without piping through base64. The Electron
            tools render fine but boot slow, hog RAM, and don't feel like
            macOS apps. K8Secret splits the difference.
          </p>
        </div>

        <div className="k8s-why-grid">
          <WhyItem
            icon={<KeyIcon />}
            title="Stop base64-piping"
            body="Opaque secrets render as plain key/value pairs the moment you click them. Edit in place, reveal on click, bulk-import a .env. Stop running kubectl get secret -o yaml | base64 -d on a loop."
          />
          <WhyItem
            icon={<BoltIcon />}
            title="Native, not Electron"
            body="Written in Swift. Talks to the K8s API directly through your kubeconfig — no kubectl shell-out except for port-forwards. Boots in under a second. Cmd-tab-able. Real macOS keyboard navigation."
          />
          <WhyItem
            icon={<WindowsIcon />}
            title="Multi-cluster, multi-window"
            body="Open staging and production side by side. Each window remembers its context and a custom tint. Compare without flipping kubeconfig contexts. Stop holding cluster names in your head."
          />
        </div>
      </div>
    </section>
  )
}

function WhyItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="k8s-why-item">
      <div className="k8s-why-icon" aria-hidden>
        {icon}
      </div>
      <h3 className="k8s-h3">{title}</h3>
      <p>{body}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Showcase — alternating image + copy blocks                                 */
/* -------------------------------------------------------------------------- */

function Showcase({
  eyebrow,
  title,
  body,
  bullets,
  image,
  alt,
  flip,
}: {
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  image: string
  alt: string
  flip: boolean
}) {
  return (
    <section className="k8s-section k8s-showcase" id="features" aria-label={eyebrow}>
      <div className="k8s-container">
        <div className={`k8s-showcase-grid ${flip ? 'k8s-showcase-flip' : ''}`}>
          <div className="k8s-showcase-content">
            <div className="k8s-section-eyebrow">{eyebrow}</div>
            <h2 className="k8s-h2">{title}</h2>
            <p className="k8s-lede">{body}</p>
            <ul className="k8s-bullets">
              {bullets.map((b, i) => (
                <li key={i}>
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="k8s-showcase-image">
            <MacWindow>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={alt} width={1600} height={1000} loading="lazy" />
            </MacWindow>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Feature grid (small features, complement showcases)                        */
/* -------------------------------------------------------------------------- */

const FEATURES = [
  { label: 'Port-forwards', sub: 'auto port · auto-retry on drop · browser handoff' },
  { label: 'Services',     sub: 'ClusterIP · ports · selectors · forward in two clicks' },
  { label: 'Deployments',  sub: 'scale in place · rollout watch · conditions · events' },
  { label: 'Search',       sub: 'across resources · across contexts · keyboard-driven' },
  { label: 'Themes',       sub: 'per-window tint so you know which cluster you\'re in' },
  { label: 'Auto-updates', sub: 'in-app banner · one click apply · no homebrew dance' },
]

function FeatureGrid() {
  return (
    <section className="k8s-section" aria-labelledby="features-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">More inside</div>
          <h2 id="features-title" className="k8s-h2">
            The day-to-day things that add up.
          </h2>
        </div>
        <div className="k8s-feature-grid">
          {FEATURES.map((f) => (
            <div key={f.label} className="k8s-feature-tile">
              <div className="k8s-feature-label">{f.label}</div>
              <div className="k8s-feature-sub">{f.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Architecture — how it talks to your cluster                                */
/* -------------------------------------------------------------------------- */

function Architecture() {
  return (
    <section className="k8s-section" aria-labelledby="arch-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">How it works</div>
          <h2 id="arch-title" className="k8s-h2">
            One TLS connection per cluster. No middleman.
          </h2>
          <p className="k8s-lede">
            K8Secret reads your <code>~/.kube/config</code>, opens a TLS
            connection straight to each cluster's API server, and stays
            there. It doesn't shell out to kubectl (except for port-forwards),
            doesn't proxy through an Electron sandbox, doesn't ship your
            credentials to anyone.
          </p>
        </div>

        <div className="k8s-arch">
          <ArchDiagram />
        </div>
      </div>
    </section>
  )
}

function ArchDiagram() {
  return (
    <svg
      viewBox="0 0 720 200"
      role="img"
      aria-label="K8Secret architecture: your Mac connects directly to each Kubernetes API server using kubeconfig"
      className="k8s-arch-svg"
    >
      <defs>
        <linearGradient id="k8s-arch-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Your Mac */}
      <g transform="translate(40, 60)">
        <rect width="180" height="80" rx="10" fill="#11151C" stroke="#2A3340" strokeWidth="1" />
        <text x="90" y="34" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" fill="#9CA3AF" letterSpacing="0.1em">
          YOUR MAC
        </text>
        <text x="90" y="58" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="15" fontWeight="500" fill="#F5F7FA">
          K8Secret.app
        </text>
      </g>

      {/* kubeconfig bubble */}
      <g transform="translate(280, 80)">
        <rect width="140" height="40" rx="20" fill="#0A0E13" stroke="#2A3340" strokeWidth="1" />
        <text x="70" y="25" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="12" fill="#06B6D4">
          ~/.kube/config
        </text>
      </g>

      {/* TLS link */}
      <line x1="220" y1="100" x2="280" y2="100" stroke="url(#k8s-arch-line)" strokeWidth="2" />
      <line x1="420" y1="100" x2="480" y2="100" stroke="url(#k8s-arch-line)" strokeWidth="2" />

      {/* Two cluster API servers */}
      <g transform="translate(480, 40)">
        <rect width="200" height="50" rx="8" fill="#11151C" stroke="#2A3340" strokeWidth="1" />
        <text x="100" y="22" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#9CA3AF" letterSpacing="0.1em">
          STAGING CLUSTER
        </text>
        <text x="100" y="40" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="13" fill="#F5F7FA">
          api.staging.k8s
        </text>
      </g>

      <g transform="translate(480, 110)">
        <rect width="200" height="50" rx="8" fill="#11151C" stroke="#2A3340" strokeWidth="1" />
        <text x="100" y="22" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#9CA3AF" letterSpacing="0.1em">
          PRODUCTION CLUSTER
        </text>
        <text x="100" y="40" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="13" fill="#F5F7FA">
          api.prod.k8s
        </text>
      </g>

      {/* TLS labels */}
      <text x="350" y="76" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#10B981" letterSpacing="0.16em">
        TLS · DIRECT
      </text>
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Install                                                                    */
/* -------------------------------------------------------------------------- */

function Install() {
  return (
    <section className="k8s-section" id="install" aria-labelledby="install-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">Install</div>
          <h2 id="install-title" className="k8s-h2">
            One command. No Homebrew tap. No notarization wait.
          </h2>
        </div>

        <div className="k8s-install-card">
          <div className="k8s-install-bar">
            <span className="k8s-dot k8s-dot-red" aria-hidden />
            <span className="k8s-dot k8s-dot-amber" aria-hidden />
            <span className="k8s-dot k8s-dot-green" aria-hidden />
            <span className="k8s-install-path">~/$</span>
          </div>
          <div className="k8s-install-code">
            <code>{INSTALL_CURL}</code>
            <CopyButton text={INSTALL_CURL} />
          </div>
          <div className="k8s-install-meta">
            <span>The installer fetches the manifest, downloads the signed .dmg, copies K8Secret.app into /Applications, and strips the quarantine bit so it launches without a Gatekeeper prompt.</span>
          </div>
        </div>

        <div className="k8s-install-alts">
          <a href={LATEST_RELEASE_URL} className="k8s-link-arrow" target="_blank" rel="noopener noreferrer">
            Manual .dmg download <ArrowIcon />
          </a>
          <a
            href={`${REPO_URL}#building-from-source`}
            className="k8s-link-arrow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Build from source <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Specs grid                                                                 */
/* -------------------------------------------------------------------------- */

const SPECS = [
  { label: 'Platform',  value: 'macOS 14+' },
  { label: 'Language',  value: 'Swift · SwiftUI' },
  { label: 'License',   value: 'MIT' },
  { label: 'Telemetry', value: 'None' },
  { label: 'Auth',      value: 'kubeconfig' },
  { label: 'Updates',   value: 'In-app banner' },
  { label: 'Clusters',  value: 'Multi (N windows)' },
  { label: 'Size',      value: '~6 MB DMG' },
]

function Specs() {
  return (
    <section className="k8s-section k8s-section-tight" aria-labelledby="specs-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">Specs</div>
          <h2 id="specs-title" className="k8s-h2">
            The fine print.
          </h2>
        </div>
        <dl className="k8s-specs-grid">
          {SPECS.map((s) => (
            <div key={s.label} className="k8s-spec">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Roadmap                                                                    */
/* -------------------------------------------------------------------------- */

function Roadmap() {
  const rows: Array<{ status: 'shipped' | 'wip' | 'planned'; label: string; sub: string }> = [
    { status: 'shipped', label: 'macOS',   sub: 'Native Swift · ad-hoc signed DMG · multi-window' },
    { status: 'wip',     label: 'Windows', sub: 'Planned · native runtime under evaluation' },
    { status: 'planned', label: 'Linux',   sub: 'Planned · AppImage / .deb' },
  ]
  return (
    <section className="k8s-section" aria-labelledby="roadmap-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">Roadmap</div>
          <h2 id="roadmap-title" className="k8s-h2">
            macOS is just the first window.
          </h2>
        </div>
        <div className="k8s-roadmap">
          {rows.map((r) => (
            <div key={r.label} className="k8s-roadmap-row">
              <div className="k8s-roadmap-status">
                <StatusPill status={r.status} />
              </div>
              <div className="k8s-roadmap-meta">
                <div className="k8s-roadmap-label">{r.label}</div>
                <div className="k8s-roadmap-sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatusPill({ status }: { status: 'shipped' | 'wip' | 'planned' }) {
  const map = {
    shipped: { text: 'Shipped',     cls: 'k8s-pill-shipped' },
    wip:     { text: 'In progress', cls: 'k8s-pill-wip' },
    planned: { text: 'Planned',     cls: 'k8s-pill-planned' },
  }[status]
  return <span className={`k8s-pill ${map.cls}`}>{map.text}</span>
}

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

const FAQS = [
  {
    q: 'Will macOS Gatekeeper block it?',
    a: 'No. The DMG is ad-hoc signed and the installer strips the quarantine bit before launch, so you won\'t see a Gatekeeper prompt. The trade-off: no Apple-issued notarization (yet), which would require a paid developer account.',
  },
  {
    q: 'Do I need kubectl installed?',
    a: 'Only for port-forwarding. K8Secret talks to the Kubernetes API directly for everything else — list pods, scale deployments, view secrets, stream logs. Port-forward shells out to kubectl because re-implementing SPDY/SPDY-over-WebSocket inside the app isn\'t worth the bytes.',
  },
  {
    q: 'Does it phone home?',
    a: 'No telemetry, no crash reporting, no analytics. The only outbound calls are (1) to your own cluster API servers, and (2) to raw.githubusercontent.com to check the update manifest on launch. You can disable the update check by editing one constant in source.',
  },
  {
    q: 'Multi-cluster?',
    a: 'Yes. Open as many windows as you have contexts. Each window remembers its cluster and an optional tint color, so prod and staging are instantly distinguishable. The sidebar shows all your contexts; switch with a dropdown or cmd-key.',
  },
  {
    q: 'Which auth methods work?',
    a: 'Anything kubeconfig supports: bearer tokens, client certs, and exec credential plugins (AWS IAM Authenticator, gke-gcloud-auth-plugin, etc). If kubectl works against your cluster, K8Secret works.',
  },
  {
    q: 'When are Windows and Linux coming?',
    a: 'When the macOS app has settled and the architecture has earned the right to port. The current Swift codebase has Mac-specific bits (NavigationSplitView, native menus) — porting cleanly means picking a cross-platform UI stack that doesn\'t feel like Electron. Updates on the GitHub repo.',
  },
]

function FAQ() {
  return (
    <section className="k8s-section" aria-labelledby="faq-title">
      <div className="k8s-container">
        <div className="k8s-section-head">
          <div className="k8s-section-eyebrow">FAQ</div>
          <h2 id="faq-title" className="k8s-h2">
            Quick answers.
          </h2>
        </div>
        <div className="k8s-faq">
          {FAQS.map((f, i) => (
            <details key={i} className="k8s-faq-item">
              <summary>
                <span>{f.q}</span>
                <ChevronIcon />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="k8s-cta" aria-labelledby="cta-title">
      <div className="k8s-container">
        <div className="k8s-cta-inner">
          <h2 id="cta-title" className="k8s-h2 k8s-cta-title">
            Run it on one cluster.<br />
            See if it sticks.
          </h2>
          <div className="k8s-hero-ctas">
            <a href={LATEST_RELEASE_URL} className="k8s-btn k8s-btn-primary">
              <DownloadIcon />
              Download for macOS
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="k8s-btn k8s-btn-ghost"
            >
              <GitHubIcon />
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="k8s-footer">
      <div className="k8s-container">
        <div className="k8s-footer-inner">
          <div className="k8s-footer-brand">
            <Logo />
            <span>K8Secret</span>
          </div>
          <div className="k8s-footer-links">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LATEST_RELEASE_URL} target="_blank" rel="noopener noreferrer">
              Releases
            </a>
            <a
              href={`${REPO_URL}/blob/main/LICENSE`}
              target="_blank"
              rel="noopener noreferrer"
            >
              License (MIT)
            </a>
            <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
              Issues
            </a>
          </div>
          <div className="k8s-footer-credit">
            Built by{' '}
            <Link href="/" className="k8s-footer-author">
              Sujal Sharma
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/* macOS window framing                                                       */
/* -------------------------------------------------------------------------- */

function MacWindow({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="k8s-window" role="presentation">
      <div className="k8s-window-bar">
        <span className="k8s-dot k8s-dot-red" />
        <span className="k8s-dot k8s-dot-amber" />
        <span className="k8s-dot k8s-dot-green" />
        {title && <span className="k8s-window-title">{title}</span>}
      </div>
      <div className="k8s-window-body">{children}</div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 11l9-9m-3 3l2 2m-5 1l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="4" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="2" y="13" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="k8s-faq-chev">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
