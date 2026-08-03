import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button, CtaBand, IconMark, Section, SectionHeader, VerseBlock } from '../components/ui'

import { ministries, ministriesIntro } from '../data/ministries'
import { whatsappLink } from '../data/site'

function MinistryDetail({ ministry, index, reversed }) {
  return (
    <article id={ministry.id} className="scroll-mt-28 py-10 sm:py-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reversed ? 'lg:order-2' : ''}>
          <div className="relative">
            <SmartImage
              src={ministry.image}
              alt={ministry.title}
              ratio="4/3"
              className="rounded-3xl shadow-[var(--shadow-lift)] dark:shadow-none"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            {/* Número grande como marca de agua de la fotografía. */}
            <span
              aria-hidden="true"
              className="glass tabular absolute top-4 left-4 grid size-12 place-items-center rounded-2xl border border-white/40 font-display text-base font-bold text-ink-800 dark:border-ink-700 dark:text-ink-100"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.06} className={reversed ? 'lg:order-1' : ''}>
          <IconMark name={ministry.icon} />

          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">{ministry.title}</h2>

          <p className="mt-4 max-w-xl leading-relaxed text-ink-500 dark:text-ink-400">
            {ministry.desc}
          </p>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {ministry.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <Icon name="check" className="size-3" />
                </span>
                <span className="text-[0.93rem] font-medium text-ink-700 dark:text-ink-300">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-2xl border border-ink-200/70 bg-ink-50 p-5 dark:border-ink-800 dark:bg-ink-900/40">
            <h3 className="flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] text-ink-500 uppercase dark:text-ink-400">
              <Icon name="clock" className="size-3.5 text-brand-600 dark:text-brand-300" />
              {ministry.scheduleLabel}
            </h3>
            <div className="mt-2 space-y-1 text-[0.95rem] text-ink-700 dark:text-ink-300">
              {ministry.schedule.map((s, i) => (
                <p key={i}>
                  {s.strong && (
                    <strong className="font-bold text-ink-900 dark:text-ink-100">
                      {s.strong}{' '}
                    </strong>
                  )}
                  {s.text}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <Button
              href={whatsappLink(
                `Hola, bendiciones. Deseo información para unirme al ${ministry.title}. Muchas gracias.`,
              )}
              external
              variant="secondary"
              icon="whatsapp"
              aria-label={`Unirme al ${ministry.title} por WhatsApp`}
            >
              Unirme al ministerio
            </Button>
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export default function Ministerios() {
  return (
    <>
      <Seo
        title="Ministerios"
        description="Conoce los ministerios de la Iglesia Jesucristo Fuente de Vida: Niños, Jóvenes, Alabanza, Ayuda Social y Encargados."
      />

      <PageHero
        title="Nuestros ministerios"
        subtitle="Sirviendo a Dios en cada área de la iglesia"
        breadcrumb="Ministerios"
      />

      {/* ---------- INTRODUCCIÓN ---------- */}
      <Section className="pb-8 sm:pb-10">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader overline="Servir juntos" title={ministriesIntro.title} />

            <div>
              <Reveal>
                <p className="max-w-2xl text-[1.1rem] leading-relaxed text-ink-600 dark:text-ink-300">
                  {ministriesIntro.text}
                </p>
              </Reveal>

              <Reveal delay={0.08} className="mt-9">
                <VerseBlock
                  text={ministriesIntro.verse.text}
                  reference={ministriesIntro.verse.ref}
                  className="max-w-2xl"
                />
              </Reveal>

              {/* Índice de anclas: salta directo al ministerio elegido. */}
              <Stagger className="mt-10 flex flex-wrap gap-2.5">
                {ministries.map((m) => (
                  <StaggerItem key={m.id}>
                    <a
                      href={`#${m.id}`}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-ink-200/80 bg-white px-4 text-sm font-semibold text-ink-700 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-800 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-300 dark:shadow-none dark:hover:border-brand-500/40 dark:hover:text-brand-200"
                    >
                      <Icon name={m.icon} className="size-3.5 text-brand-600 dark:text-brand-300" />
                      {m.name}
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- DETALLE DE CADA MINISTERIO ---------- */}
      <Section className="pt-0">
        <div className="container-page divide-y divide-ink-100 dark:divide-ink-800/70">
          {ministries.map((m, i) => (
            <MinistryDetail key={m.id} ministry={m} index={i} reversed={i % 2 === 1} />
          ))}
        </div>
      </Section>

      <CtaBand
        overline="Tu lugar"
        title="¿Listo para servir?"
        text="Dios tiene un lugar especial para ti en su obra. Descubre tu llamado y únete a uno de nuestros ministerios. ¡Tu servicio marca la diferencia!"
      >
        <Button to="/contacto" variant="white" size="lg">
          Contáctanos
        </Button>
        <Button to="/nuevos" variant="outline" size="lg">
          Más información
        </Button>
      </CtaBand>
    </>
  )
}
