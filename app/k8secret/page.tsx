import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Background from '@/components/bg/Background'
import Spread from '@/components/notebook/Spread'
import Stamp from '@/components/notebook/Stamp'

const REPO_RAW = 'https://raw.githubusercontent.com/jai-bhardwaj/k8secret/main/docs/screenshots'
const REPO_URL = 'https://github.com/jai-bhardwaj/k8secret'
const INSTALL_CURL =
  'curl -fsSL https://raw.githubusercontent.com/jai-bhardwaj/k8secret/main/release/install.sh | bash'
const MANIFEST_URL = 'https://github.com/jai-bhardwaj/k8secret/releases/latest'

export default function K8SecretPage() {
  return (
    <>
      <Background />
      <Header />
      <Spread>
        <Hero />
        <Why />
        <Features />
        <Showcase />
        <Install />
        <Specs />
        <Roadmap />
        <BackToNotebook />
      </Spread>
      <Footer />
    </>
  )
}

/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section
      className="relative reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="K8Secret cover"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-12 gap-y-6 items-start">
        <div>
          <div
            className="label tab"
            style={{ color: 'var(--graphite)', marginBottom: 'var(--s-5)' }}
          >
            FIG. K8 · OSS · MIT
          </div>

          <h1
            className="display"
            style={{
              fontSize: 'var(--t-2xl)',
              fontStyle: 'italic',
              color: 'var(--ink)',
              fontWeight: 500,
            }}
          >
            K8Secret<span style={{ color: 'var(--graphite)' }}>.</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-lg)',
              lineHeight: 1.5,
              color: 'var(--ink)',
              marginTop: 'var(--s-6)',
              maxWidth: '40ch',
            }}
          >
            A native macOS app for Kubernetes. Secrets you can read,
            deployments you can scale, logs that stream — in a window that
            behaves like a real app, not a terminal.
          </p>
        </div>

        <div className="absolute right-0 top-0 md:static md:pt-12">
          <Stamp text="macOS" rotation={-3} />
        </div>
      </div>

      {/* Hero screenshot — deployment detail */}
      <div
        className="reveal"
        style={{
          marginTop: 'var(--s-7)',
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          padding: 'var(--s-3)',
        }}
      >
        <Screenshot
          src={`${REPO_RAW}/02-deployment-detail.png`}
          alt="K8Secret showing a deployment detail view with replicas, container info, and recent events"
        />
      </div>

      {/* CTA row */}
      <div
        className="flex flex-wrap items-baseline gap-x-6 gap-y-3"
        style={{
          marginTop: 'var(--s-6)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-sm)',
        }}
      >
        <a
          href={MANIFEST_URL}
          className="link-ink"
          style={{
            color: 'var(--stamp)',
            textDecorationColor: 'var(--stamp)',
          }}
        >
          → Download for macOS (.dmg)
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-ink"
          style={{ color: 'var(--ink)' }}
        >
          → View source on GitHub
        </a>
        <span className="label" style={{ color: 'var(--graphite)' }}>
          macOS 14+ · MIT · No telemetry
        </span>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Why() {
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Why K8Secret"
    >
      <FigHeader number="01" title="Why bother with another K8s GUI" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
        <WhyItem
          label="Stop base64-piping"
          body="Opaque secrets render as plain key/value pairs the moment you click them. Edit in place. Reveal on click. Bulk import a .env. No more kubectl get secret -o yaml | base64 -d on repeat."
        />
        <WhyItem
          label="Native, not Electron"
          body="Written in Swift. Talks to the K8s API directly over your kubeconfig — no kubectl shell-out except for port-forwards. Boots instantly. Cmd-tab-able. Behaves like a real macOS app."
        />
        <WhyItem
          label="Multi-cluster, multi-window"
          body="Open staging and production side by side. Each window remembers its own context and theme tint. Keyboard-driven sidebar. No context-switching headache."
        />
      </div>
    </section>
  )
}

function WhyItem({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div
        className="label"
        style={{ color: 'var(--ink)', marginBottom: 'var(--s-3)' }}
      >
        — {label}
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-base)',
          lineHeight: 1.55,
          color: 'var(--ink)',
        }}
      >
        {body}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

const FEATURES: Array<{ label: string; sub: string }> = [
  { label: 'Secrets',       sub: 'decoded · edit-in-place · bulk import' },
  { label: 'Deployments',   sub: 'scale · rollout · conditions · events' },
  { label: 'Pods',          sub: 'cpu/mem · logs · ip · owner · events' },
  { label: 'Services',      sub: 'clusterip · ports · port-forward' },
  { label: 'Logs',          sub: 'live stream · severity · search' },
  { label: 'Port-forwards', sub: 'auto port · auto-retry · browser handoff' },
]

function Features() {
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Features"
    >
      <FigHeader number="02" title="What it does" />
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6"
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          padding: 'var(--s-card)',
        }}
      >
        {FEATURES.map((f) => (
          <div key={f.label}>
            <div
              className="tab"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-base)',
                color: 'var(--ink)',
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {f.label}
            </div>
            <div
              className="label"
              style={{ color: 'var(--graphite)', lineHeight: 1.55 }}
            >
              {f.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Showcase() {
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Screenshots"
    >
      <FigHeader number="03" title="Inside the app" />

      <Shot
        eyebrow="The killer feature"
        title="Secrets, decoded inline."
        body="Opaque secrets render as readable key/value pairs the moment you select them. Edit in place, reveal on click, bulk-import a .env or JSON — with a live preview of what the merge will look like before you commit."
        src={`${REPO_RAW}/09-secret-detail.png`}
        alt="A Kubernetes secret rendered as plain key/value pairs with reveal-on-click"
      />

      <Shot
        eyebrow="Logs"
        title="Live tail with severity filters."
        body="Each pod gets its own log window. Tail in real time, filter by level, search across the stream, pop multiple windows side by side."
        src={`${REPO_RAW}/05-log-stream.png`}
        alt="Live log streaming window with severity filters"
      />

      <Shot
        eyebrow="Bulk import"
        title=".env in, secret out."
        body="Paste a .env file or upload JSON. K8Secret shows the merge preview — which keys are new, which will be overwritten — before any change touches the cluster."
        src={`${REPO_RAW}/10-bulk-import.png`}
        alt="Bulk-import dialog showing a .env file being merged into a Kubernetes secret"
      />

      <Shot
        eyebrow="Pods"
        title="The detail view a real engineer needs."
        body="CPU/memory against requests and limits, container info, pod IP, owner reference, recent events. Everything kubectl describe would show, in a window you can scan in a glance."
        src={`${REPO_RAW}/04-pod-detail.png`}
        alt="Pod detail view with metrics, container info, and events"
      />
    </section>
  )
}

function Shot({
  eyebrow,
  title,
  body,
  src,
  alt,
}: {
  eyebrow: string
  title: string
  body: string
  src: string
  alt: string
}) {
  return (
    <div
      style={{ marginBottom: 'var(--s-7)' }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-10 gap-y-5 items-start"
    >
      <div>
        <div
          className="label"
          style={{ color: 'var(--graphite)', marginBottom: 'var(--s-2)' }}
        >
          — {eyebrow}
        </div>
        <h3
          className="display"
          style={{
            fontSize: 'var(--t-xl)',
            color: 'var(--ink)',
            fontWeight: 500,
            marginBottom: 'var(--s-3)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--t-base)',
            lineHeight: 1.6,
            color: 'var(--ink)',
            maxWidth: '38ch',
          }}
        >
          {body}
        </p>
      </div>
      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          padding: 'var(--s-3)',
        }}
      >
        <Screenshot src={src} alt={alt} />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Install() {
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Install"
    >
      <FigHeader number="04" title="Install" />
      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--rule)',
          padding: 'var(--s-card)',
        }}
      >
        <div
          className="label"
          style={{ color: 'var(--graphite)', marginBottom: 'var(--s-3)' }}
        >
          One-liner — pulls the latest signed .dmg, copies K8Secret.app into /Applications
        </div>
        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-sm)',
            color: 'var(--ink)',
            background: 'oklch(0.16 0.022 65)',
            border: '1px solid var(--rule)',
            padding: 'var(--s-4)',
            overflowX: 'auto',
            lineHeight: 1.5,
            whiteSpace: 'pre',
          }}
        >
          <code>{INSTALL_CURL}</code>
        </pre>
        <div
          className="flex flex-wrap items-baseline gap-x-6 gap-y-3"
          style={{
            marginTop: 'var(--s-5)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--graphite)',
          }}
        >
          <a href={MANIFEST_URL} className="link-ink" style={{ color: 'var(--ink)' }}>
            → manual .dmg / latest.json
          </a>
          <a
            href={`${REPO_URL}#building-from-source`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ink"
            style={{ color: 'var(--ink)' }}
          >
            → build from source
          </a>
          <span>ships ad-hoc signed · no Gatekeeper prompt</span>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Specs() {
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Specs"
    >
      <FigHeader number="05" title="Specs" />
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5">
        <Spec label="Platform"  value="macOS 14+"  sub="Sonoma, Sequoia" />
        <Spec label="Lang"      value="Swift"      sub="SwiftUI · NavigationSplitView" />
        <Spec label="License"   value="MIT"        sub="OSS · use anywhere" />
        <Spec label="Telemetry" value="None"       sub="zero phone-home" />
        <Spec label="Auth"      value="kubeconfig" sub="token · cert · exec plugins" />
        <Spec label="Updates"   value="In-app"     sub="one-click apply" />
        <Spec label="Clusters"  value="Multi"      sub="open N at once" />
        <Spec label="Tooling"   value="kubectl"    sub="optional · port-forward only" />
      </dl>
    </section>
  )
}

function Spec({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div>
      <div
        className="label"
        style={{ color: 'var(--graphite)', marginBottom: 4 }}
      >
        {label}
      </div>
      <div
        className="tab"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-base)',
          color: 'var(--ink)',
          fontWeight: 500,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--graphite)',
          marginTop: 2,
        }}
      >
        {sub}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Roadmap() {
  const rows: Array<{ status: 'shipped' | 'wip' | 'planned'; label: string; sub: string }> = [
    { status: 'shipped', label: 'macOS',   sub: 'Swift · SwiftUI · ad-hoc signed DMG' },
    { status: 'wip',     label: 'Windows', sub: 'planned · native runtime TBD' },
    { status: 'planned', label: 'Linux',   sub: 'planned · AppImage or .deb' },
  ]
  return (
    <section
      className="reveal"
      style={{ marginBottom: 'var(--s-section)' }}
      aria-label="Roadmap"
    >
      <FigHeader number="06" title="Roadmap" />
      <div style={{ border: '1px solid var(--rule)' }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="grid grid-cols-[auto_1fr_auto] gap-x-6 items-baseline"
            style={{
              padding: 'var(--s-4) var(--s-5)',
              borderTop: i === 0 ? 'none' : '1px solid var(--rule-soft)',
            }}
          >
            <span
              className="tab"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--t-base)',
                color: 'var(--ink)',
                fontWeight: 500,
                minWidth: 80,
              }}
            >
              {row.label}
            </span>
            <span
              className="label"
              style={{ color: 'var(--graphite)' }}
            >
              {row.sub}
            </span>
            <StatusPill status={row.status} />
          </div>
        ))}
      </div>
    </section>
  )
}

function StatusPill({ status }: { status: 'shipped' | 'wip' | 'planned' }) {
  const config = {
    shipped: { text: 'shipped', color: 'var(--stamp)' },
    wip:     { text: 'in progress', color: 'var(--ink)' },
    planned: { text: 'planned', color: 'var(--graphite)' },
  }[status]
  return (
    <span
      className="tab"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: config.color,
        border: `1px solid ${config.color}`,
        padding: '3px 8px',
        borderRadius: 2,
        whiteSpace: 'nowrap',
      }}
    >
      {config.text}
    </span>
  )
}

/* -------------------------------------------------------------------------- */

function BackToNotebook() {
  return (
    <section
      className="reveal"
      style={{
        marginTop: 'var(--s-section)',
        paddingTop: 'var(--s-7)',
        borderTop: '1px solid var(--ink)',
      }}
    >
      <div
        className="label"
        style={{ color: 'var(--ink)', marginBottom: 'var(--s-3)' }}
      >
        — End of file
      </div>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-base)',
          lineHeight: 1.55,
          color: 'var(--ink)',
          maxWidth: '54ch',
          marginBottom: 'var(--s-4)',
        }}
      >
        K8Secret is one of three things in my notebook. The other two —
        a C++20 match engine and a multi-broker algo trading platform —
        live alongside it.
      </p>
      <a
        href="/"
        className="link-ink"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-sm)',
          color: 'var(--ink)',
        }}
      >
        ← back to notebook
      </a>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

function FigHeader({ number, title }: { number: string; title: string }) {
  return (
    <header
      className="flex items-baseline gap-4 flex-wrap"
      style={{ marginBottom: 'var(--s-6)' }}
    >
      <span
        className="label tab"
        style={{ color: 'var(--ink)', letterSpacing: '0.18em' }}
      >
        FIG. {number}
      </span>
      <span
        className="rule-soft-b flex-1"
        style={{ height: 1, marginBottom: 6 }}
        aria-hidden
      />
      <h2
        className="display"
        style={{
          fontSize: 'var(--t-xl)',
          color: 'var(--ink)',
          fontStyle: 'normal',
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
    </header>
  )
}

function Screenshot({ src, alt }: { src: string; alt: string }) {
  // Plain <img> instead of next/image to avoid configuring remotePatterns
  // for raw.githubusercontent.com. Screenshots are PNG and load once.
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        borderRadius: 2,
      }}
    />
  )
}
