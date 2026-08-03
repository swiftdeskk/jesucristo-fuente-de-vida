import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Counter from '../components/Counter'
import { Reveal, Stagger, StaggerItem, easeOut } from '../components/Reveal'
import {
  Button,
  CtaBand,
  IconMark,
  Overline,
  Section,
  SectionHeader,
  TestimonialCard,
  TextLink,
  VerseBlock,
} from '../components/ui'

import { maps, site } from '../data/site'
import { aboutCards, anexos, hero, schedule, stats, testimonials } from '../data/home'
import { ministries } from '../data/ministries'

/* ==========================================================================
   PORTADA
   ========================================================================== */

/** Las dos últimas palabras del título llevan el degradado del acento. */
function AccentTitle({ text }) {
  const words = text.split(' ')
  const head = words.slice(0, -2).join(' ')
  const tail = words.slice(-2).join(' ')

  return (
    <>
      {head}{' '}
      <span className="bg-gradient-to-r from-brand-300 to-brand-400 bg-clip-text text-transparent">
        {tail}
      </span>
    </>
  )
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink-950">
      <picture>
        <source srcSet={hero.image.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
        <img
          src={hero.image}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Velo doble: azul marino de marca desde abajo + oscurecido lateral
          para que el texto se sostenga sin tapar la fotografía. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/72 to-ink-950/35"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/60 to-transparent"
      />

      <div className="container-page pt-36 pb-12 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
          className="max-w-3xl"
        >
          <Overline tone="inverse">Iglesia cristiana en Huaral</Overline>

          <h1 className="mt-7 font-display text-[2.75rem] leading-[1.03] font-bold text-white sm:text-6xl lg:text-7xl">
            <AccentTitle text={hero.title} />
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{hero.description}</p>

          <VerseBlock
            text={hero.verse.text}
            reference={hero.verse.ref}
            tone="inverse"
            className="mt-9 max-w-lg"
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="#horarios" variant="white" size="lg" iconRight="chevron-down">
              Visítanos
            </Button>
            <Button to="/nosotros" variant="outline" size="lg" iconRight="arrow-right">
              Conócenos
            </Button>
          </div>
        </motion.div>

        {/* Los horarios, a la vista sin necesidad de bajar: es lo primero que
            alguien busca en la web de una iglesia. */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: easeOut }}
          className="mt-14 grid gap-3 sm:grid-cols-3"
        >
          {schedule.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/12 bg-ink-950/35 p-5 transition-colors duration-300 hover:border-white/25 hover:bg-ink-950/50"
            >
              <dt className="flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.08em] text-white/55 uppercase">
                <Icon name={item.icon} className="size-4 text-brand-300" />
                {item.title}
              </dt>
              <dd className="mt-2 font-display text-xl font-bold text-white">{item.time}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

/* ==========================================================================
   HORARIOS (detalle)
   ========================================================================== */

function Schedule() {
  return (
    <Section id="horarios">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
          <SectionHeader
            overline="Nos reunimos"
            title="Nuestros horarios"
            subtitle="Te esperamos con los brazos abiertos. No necesitas avisar ni traer nada: solo venir."
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="mt-7">
              <TextLink to="/nuevos">Qué esperar en tu primera visita</TextLink>
            </div>
          </SectionHeader>

          <Stagger className="flex flex-col gap-4">
            {schedule.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card-hover flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-7">
                  <IconMark name={item.icon} />
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    <p className="mt-1.5 max-w-md text-[0.95rem] text-ink-500 dark:text-ink-400">
                      {item.desc}
                    </p>
                  </div>
                  <p className="tabular inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 font-display text-[0.97rem] font-bold whitespace-nowrap text-brand-800 dark:border-brand-500/25 dark:bg-brand-500/10 dark:text-brand-200">
                    <Icon name="clock" className="size-3.5" />
                    {item.time}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}

/* ==========================================================================
   CIFRAS
   ========================================================================== */

function Stats() {
  return (
    <section className="aura border-y border-ink-200/70 bg-ink-50 dark:border-ink-800 dark:bg-ink-900/25">
      <div className="container-page">
        <Stagger className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                className="tabular block bg-gradient-to-b from-brand-600 to-brand-800 bg-clip-text font-display text-4xl font-bold text-transparent sm:text-5xl dark:from-brand-300 dark:to-brand-500"
              />
              <p className="mt-2 text-sm font-semibold text-ink-500 dark:text-ink-400">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ==========================================================================
   QUIÉNES SOMOS
   ========================================================================== */

function About() {
  return (
    <Section id="nosotros">
      <div className="container-page">
        <SectionHeader
          overline="Nuestra identidad"
          title="Quiénes somos"
          subtitle="Una iglesia comprometida con el evangelio de Cristo."
          align="center"
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-3">
          {aboutCards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="card-hover h-full p-7">
                <IconMark name={card.icon} />
                <h3 className="mt-5 font-display text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500 dark:text-ink-400">
                  {card.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 text-center">
          <TextLink to="/nosotros">Conoce nuestra historia</TextLink>
        </Reveal>
      </div>
    </Section>
  )
}

/* ==========================================================================
   MINISTERIOS
   ========================================================================== */

function Ministries() {
  return (
    <Section id="ministerios" tone="muted">
      <div className="container-page">
        <SectionHeader
          overline="Servir juntos"
          title="Nuestros ministerios"
          subtitle="Un lugar para servir y crecer en Cristo."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <StaggerItem key={m.id}>
              <Link to={`/ministerios#${m.id}`} className="card-hover group flex h-full flex-col p-7">
                <div className="flex items-center gap-3.5">
                  <IconMark name={m.icon} size="sm" />
                  <h3 className="font-display text-lg font-bold">{m.name}</h3>
                </div>

                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-500 dark:text-ink-400">
                  {m.short}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300">
                  Más información
                  <Icon
                    name="arrow-right"
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* ==========================================================================
   ANEXOS
   ========================================================================== */

function Anexos() {
  return (
    <Section id="anexos">
      <div className="container-page">
        <SectionHeader
          overline="Dónde estamos"
          title="Nuestros anexos"
          subtitle="Llevando la Palabra de Dios a diferentes lugares de nuestra comunidad."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {anexos.map((zone, i) => (
            <Reveal key={zone.zone} delay={i * 0.06}>
              <div className="card h-full p-7">
                <h3 className="flex items-center gap-3 font-display text-lg font-bold">
                  <IconMark name="map-pin" size="sm" />
                  {zone.zone}
                </h3>

                <ul className="mt-6 divide-y divide-ink-100 dark:divide-ink-800">
                  {zone.items.map((anexo) => (
                    <li
                      key={anexo.name}
                      className="flex items-center justify-between gap-4 py-3.5"
                    >
                      <span className="text-[0.97rem] font-medium text-ink-800 dark:text-ink-200">
                        {anexo.name}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.75rem] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                        {anexo.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink-500 dark:text-ink-400">
            Si deseas más información sobre alguno de nuestros anexos, horarios de reuniones o cómo
            llegar, no dudes en{' '}
            <Link
              to="/contacto"
              className="font-semibold text-brand-700 underline underline-offset-4 dark:text-brand-300"
            >
              contactarnos
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

/* ==========================================================================
   TESTIMONIOS
   ========================================================================== */

function Testimonials() {
  return (
    <Section tone="muted" className="aura">
      <div className="container-page">
        <SectionHeader
          overline="Vidas transformadas"
          title="Testimonios"
          subtitle="Vidas transformadas por el poder de Dios."
          align="center"
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard {...t} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* ==========================================================================
   FACEBOOK
   Puente hacia /facebook: un panel ligero teñido del acento, distinto del
   panel oscuro de llamada a la acción para que no compitan entre sí.
   ========================================================================== */

function FacebookBand() {
  return (
    <section className="bg-white pt-16 pb-4 sm:pt-20 dark:bg-ink-950">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start gap-7 rounded-3xl border border-brand-200/70 bg-brand-50/60 p-8 sm:p-10 lg:flex-row lg:items-center dark:border-brand-500/20 dark:bg-brand-500/10">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]">
              <Icon name="facebook" className="size-7" />
            </span>

            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold sm:text-[1.7rem]">
                Síguenos en Facebook
              </h2>
              <p className="mt-2 max-w-xl text-[0.97rem] leading-relaxed text-ink-600 dark:text-ink-300">
                Fotos de los cultos, anuncios y palabras de aliento durante la semana. Mira
                nuestras últimas publicaciones sin salir del sitio.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button to="/facebook" iconRight="arrow-right">
                Ver publicaciones
              </Button>
              <Button
                href="https://www.facebook.com/jesucristofuentedevidahuaral"
                external
                variant="secondary"
                icon="external-link"
              >
                Ir a la página
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==========================================================================
   VISÍTANOS
   ========================================================================== */

const contactItems = [
  {
    icon: 'map-pin',
    title: 'Dirección',
    content: (
      <>
        {site.address.line1}
        <br />
        {site.address.line2}
      </>
    ),
  },
  {
    icon: 'phone',
    title: 'Teléfono',
    content: (
      <a href={`tel:${site.phone.tel}`} className="hover:underline">
        {site.phone.display}
      </a>
    ),
  },
  {
    icon: 'mail',
    title: 'Email',
    content: (
      <a href={`mailto:${site.email}`} className="hover:underline">
        {site.email}
      </a>
    ),
  },
  {
    icon: 'clock',
    title: 'Horario de oficina',
    content: (
      <>
        {site.office.days}
        <br />
        {site.office.hours}
      </>
    ),
  },
]

function Visit() {
  return (
    <Section id="contacto">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              overline="Ven a vernos"
              title="Visítanos"
              subtitle="Estamos ubicados en el corazón de Huaral."
            />

            {/* dl con divs de agrupación: es HTML válido y da el par
                etiqueta/valor correcto a los lectores de pantalla. */}
            <Stagger as="dl" className="mt-10 flex flex-col gap-3">
              {contactItems.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="card flex items-start gap-4 p-5">
                    <IconMark name={item.icon} size="sm" />
                    <div>
                      <dt className="text-[0.78rem] font-bold tracking-[0.1em] text-ink-400 uppercase dark:text-ink-500">
                        {item.title}
                      </dt>
                      <dd className="mt-1 text-[0.95rem] font-medium text-ink-800 dark:text-ink-200">
                        {item.content}
                      </dd>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal direction="up" className="lg:pt-4">
            <div className="h-[24rem] overflow-hidden rounded-3xl border border-ink-200/70 shadow-[var(--shadow-soft)] lg:h-full lg:min-h-[28rem] dark:border-ink-800 dark:shadow-none">
              <iframe
                src={maps.home}
                title="Ubicación de la iglesia en Google Maps"
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ==========================================================================
   PÁGINA
   ========================================================================== */

export default function Home() {
  return (
    <>
      <Seo
        description="Iglesia Jesucristo Fuente de Vida para Todas las Generaciones. Un lugar de fe, esperanza y comunidad en Huaral."
        image="/images/preview.jpg"
      />

      <Hero />
      <Schedule />
      <Stats />
      <About />
      <Ministries />
      <Anexos />
      <Testimonials />
      <FacebookBand />

      <CtaBand
        overline="Primera visita"
        title="¿Primera vez aquí?"
        text="Nos encantaría conocerte. Descubre qué esperar en tu primera visita y cómo puedes ser parte de nuestra familia en Cristo."
      >
        <Button to="/nuevos" variant="white" size="lg">
          Soy Nuevo
        </Button>
        <Button to="/contacto" variant="outline" size="lg">
          Contáctanos
        </Button>
      </CtaBand>

      <Visit />
    </>
  )
}
