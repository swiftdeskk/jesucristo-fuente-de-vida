import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button, CtaBand, IconMark, Section, SectionHeader } from '../components/ui'

import { beliefs, mission, team, timeline, values, vision } from '../data/about'

/* --- Historia: carril vertical con hitos --- */
function Timeline() {
  return (
    <ol className="relative flex flex-col gap-8 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-brand-400 before:via-ink-200 before:to-transparent sm:pl-10 dark:before:via-ink-800">
      {timeline.map((item, i) => (
        <li key={item.year} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-8 grid size-4 place-items-center rounded-full border-2 border-brand-500 bg-white sm:-left-10 dark:bg-ink-950"
          >
            <span className="size-1.5 rounded-full bg-brand-500" />
          </span>

          <Reveal delay={i * 0.05}>
            <div className="card p-6 sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[0.72rem] font-bold tracking-[0.12em] text-brand-800 uppercase dark:bg-brand-500/10 dark:text-brand-200">
                <span className="tabular">{String(i + 1).padStart(2, '0')}</span>
                {item.year}
              </span>
              <p className="mt-4 max-w-2xl text-[0.97rem] leading-relaxed text-ink-600 dark:text-ink-400">
                {item.text}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

export default function Nosotros() {
  return (
    <>
      <Seo
        title="Quiénes Somos"
        description="Conoce la historia, misión, visión y valores de la Iglesia Jesucristo Fuente de Vida para Todas las Generaciones."
      />

      <PageHero
        title="Quiénes somos"
        subtitle="Una iglesia fundada en la Palabra de Dios, comprometida con todas las generaciones"
        breadcrumb="Quiénes Somos"
      />

      {/* ---------- HISTORIA ---------- */}
      <Section>
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader
              overline="Nuestro camino"
              title="Nuestra historia"
              subtitle="Cómo Dios nos ha guiado paso a paso hasta aquí."
              className="lg:sticky lg:top-28 lg:self-start"
            />

            <div>
              <Reveal>
                <p className="max-w-2xl text-[1.1rem] leading-relaxed text-ink-600 dark:text-ink-300">
                  La Iglesia{' '}
                  <strong className="font-bold text-ink-900 dark:text-ink-50">
                    Jesucristo Fuente de Vida para Todas las Generaciones
                  </strong>{' '}
                  nació de una manera sencilla, pero con un gran propósito en el corazón: servir a
                  Dios y compartir Su Palabra en la ciudad de Huaral. Creemos que cada paso de
                  nuestra historia ha sido guiado por la fidelidad del Señor.
                </p>
              </Reveal>

              <div className="mt-12">
                <Timeline />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- MISIÓN Y VISIÓN ---------- */}
      <Section tone="muted" className="aura">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2">
            {[mission, vision].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <div className="card-hover h-full p-8">
                  <IconMark name={card.icon} />
                  <h2 className="mt-6 font-display text-2xl font-bold">{card.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink-600 dark:text-ink-400">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- VALORES ---------- */}
          <div className="mt-20">
            <SectionHeader overline="Lo que nos define" title="Nuestros valores" align="center" />

            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="card-hover flex h-full gap-4 p-6">
                    <IconMark name={v.icon} size="sm" />
                    <div>
                      <h3 className="font-display text-base font-bold">{v.title}</h3>
                      <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* ---------- EN QUÉ CREEMOS ---------- */}
      <Section>
        <div className="container-page">
          <SectionHeader
            overline="Declaración de fe"
            title="En qué creemos"
            subtitle="Los fundamentos bíblicos que sostienen todo lo que enseñamos y practicamos."
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((b, i) => (
              <StaggerItem key={b.title}>
                <article className="card-hover h-full p-6">
                  <span className="tabular inline-grid size-9 place-items-center rounded-full bg-ink-100 font-display text-[0.85rem] font-bold text-ink-500 dark:bg-ink-800 dark:text-ink-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                    {b.text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- EQUIPO PASTORAL ---------- */}
      <Section tone="muted">
        <div className="container-page">
          <SectionHeader
            overline="Liderazgo"
            title="Nuestro equipo pastoral"
            subtitle="Líderes comprometidos con el servicio a Dios."
            align="center"
          />

          <div className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08}>
                <article className="card-hover overflow-hidden">
                  <SmartImage
                    src={person.image}
                    alt={person.name}
                    ratio="4/5"
                    sizes="(max-width: 640px) 100vw, 380px"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold">{person.name}</h3>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[0.78rem] font-bold text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
                      <Icon name="cross" className="size-3" />
                      {person.role}
                    </p>
                    <p className="mt-3.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                      {person.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        overline="Te esperamos"
        title="¿Quieres ser parte de nuestra familia?"
        text="Te invitamos a conocernos personalmente. Ven y experimenta el amor de Cristo en una comunidad que te recibirá con los brazos abiertos."
      >
        <Button to="/#horarios" variant="white" size="lg">
          Ver horarios
        </Button>
        <Button to="/contacto" variant="outline" size="lg">
          Contáctanos
        </Button>
      </CtaBand>
    </>
  )
}
