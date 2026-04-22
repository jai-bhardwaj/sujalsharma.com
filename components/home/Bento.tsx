import { PROJECTS } from '@/lib/constants'
import NameTile from './tiles/NameTile'
import MetaTile from './tiles/MetaTile'
import RaceTile from './tiles/RaceTile'
import ProjectTile from './tiles/ProjectTile'
import AboutTile from './tiles/AboutTile'
import ContactTile from './tiles/ContactTile'

export default function Bento() {
  const mach = PROJECTS.find((p) => p.id === 'mach-zero') ?? PROJECTS[0]
  const tcp = PROJECTS.find((p) => p.id === 'tcp-engine') ?? PROJECTS[1]

  return (
    <section className="px-4 md:px-6 pt-4 md:pt-6 pb-16">
      <div
        className="max-w-[1400px] mx-auto grid gap-3 md:gap-4"
        style={{
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gridAutoRows: 'minmax(180px, auto)',
        }}
      >
        <NameTile />
        <MetaTile />

        <RaceTile />

        <ProjectTile
          project={mach}
          label="SS · 04"
          className="md:col-span-5 md:row-span-2 min-h-[300px]"
          delay={0.12}
        />

        <AboutTile
          className="md:col-span-7 md:row-span-2 min-h-[280px]"
          delay={0.16}
        />

        <ProjectTile
          project={tcp}
          label="SS · 04"
          className="md:col-span-5 md:row-span-2 min-h-[280px]"
          delay={0.2}
        />

        <ContactTile
          className="md:col-span-12 md:row-span-2 min-h-[280px]"
          delay={0.24}
        />
      </div>
    </section>
  )
}
