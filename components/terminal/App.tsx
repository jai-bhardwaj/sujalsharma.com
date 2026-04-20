'use client'

import Shell from '@/components/terminal/Shell'
import TickerTape from '@/components/terminal/TickerTape'
import LeftRail from '@/components/terminal/LeftRail'
import StatusBar from '@/components/terminal/StatusBar'
import NowPanel from '@/components/panels/NowPanel'
import BuildsPanel from '@/components/panels/BuildsPanel'
import BenchPanel from '@/components/panels/BenchPanel'
import ContactPanel from '@/components/panels/ContactPanel'
import { useHashPanel } from '@/hooks/useHashPanel'
import type { PanelId } from '@/lib/constants'

const PANEL_MAP: Record<PanelId, React.FC> = {
  now: NowPanel,
  builds: BuildsPanel,
  bench: BenchPanel,
  contact: ContactPanel,
}

export default function App() {
  const { active, navigate } = useHashPanel()
  const ActivePanel = PANEL_MAP[active]

  return (
    <Shell
      ticker={<TickerTape />}
      rail={<LeftRail active={active} onNavigate={navigate} />}
      status={<StatusBar />}
    >
      <ActivePanel />
    </Shell>
  )
}
