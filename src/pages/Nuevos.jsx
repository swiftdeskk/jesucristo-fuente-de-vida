import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Accordion from '../components/Accordion'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import {
  Button,
  CtaBand,
  IconMark,
  Section,
  SectionHeader,
  TestimonialCard,
  VerseBlock,
} from '../components/ui'

import { maps, site } from '../data/site'
import { expectSteps, faqs, newTestimonials, nextSteps, welcome } from '../data/nuevos'

export default function Nuevos() {
  return (
    <>
      <Seo
        title="Soy Nuevo"
        description="¿Primera vez en nuestra iglesia? Descubre qué esperar, cómo llegar y cómo integrarte a la familia de Jesucristo Fuente de Vida."
      />

      <PageHero
        title="Te damos la bienvenida"
        subtitle="Nos alegra mucho que estés aquí. Eres parte de nuestra familia"
        breadcrumb="Soy Nuevo"
      />

      {/* ---------- BIENVENIDA ---------- */}
      <Section>
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader
              overline="Antes de venir"
              title={welcome.title}
              className="lg:sticky lg:top-28 lg:self-start"
            />

            <div>
              <Reveal>
                <p className="max-w-2xl text-[1.1rem] leading-relaxed text-ink-600 dark:text-ink-300">
                  {welcome.text}
                </p>
              </Reveal>
              <Reveal delay={0.08} className="mt-9">
                <VerseBlock
                  text={welcome.verse.text}
                  reference={welcome.verse.ref}
                  className="max-w-2xl"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- QUÉ ESPERAR ---------- */}
      <Section tone="muted" className="aura">
        <div className="container-page">
          <SectionHeader
            overline="Tu primera visita"
            title="¿Qué puedo esperar?"
            subtitle="Te contamos cómo es una reunión típica en nuestra iglesia."
            align="center"
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {expectSteps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="card-hover h-full p-6">
                  <div className="flex items-center justify-between">
                    <IconMark name={step.icon} size="sm" />
                    <span className="tabular font-display text-[2rem] leading-none font-bold text-ink-200 dark:text-ink-800">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                    {step.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- PREGUNTAS FRECUENTES ---------- */}
      <Section>
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader
              overline="Resolvemos tus dudas"
              title="Preguntas frecuentes"
              subtitle="Las respuestas que casi todo el mundo busca antes de venir por primera vez."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <Accordion items={faqs} />
          </div>
        </div>
      </Section>

      {/* ---------- CÓMO LLEGAR ---------- */}
      <Section tone="muted">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                overline="Ubicación"
                title="¿Cómo llegar?"
                subtitle="Te esperamos en el corazón de Huaral."
              />

              <Stagger className="mt-10 flex flex-col gap-3">
                <StaggerItem>
                  <div className="card flex items-start gap-4 p-5">
                    <IconMark name="map-pin" size="sm" />
                    <div>
                      <h3 className="text-[0.78rem] font-bold tracking-[0.1em] text-ink-400 uppercase dark:text-ink-500">
                        Dirección
                      </h3>
                      <p className="mt-1 text-[0.97rem] font-medium text-ink-800 dark:text-ink-200">
                        {site.address.line1}
                        <br />
                        {site.address.line2}
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="card flex items-start gap-4 p-5">
                    <IconMark name="bus" size="sm" />
                    <div>
                      <h3 className="text-[0.78rem] font-bold tracking-[0.1em] text-ink-400 uppercase dark:text-ink-500">
                        En transporte público
                      </h3>
                      <p className="mt-1 max-w-md text-[0.95rem] leading-relaxed text-ink-700 dark:text-ink-300">
                        Las líneas de transporte Trompito Santa Inés, Turismo Garcilazo y Nuevo
                        Trompo pasan cerca. Desciende en la esquina del Coliseo Campeones de Huaral
                        y camina dos cuadras.
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="card flex items-start gap-4 p-5">
                    <IconMark name="phone" size="sm" />
                    <div>
                      <h3 className="text-[0.78rem] font-bold tracking-[0.1em] text-ink-400 uppercase dark:text-ink-500">
                        ¿Necesitas ayuda?
                      </h3>
                      <p className="mt-1 text-[0.97rem] text-ink-700 dark:text-ink-300">
                        Llámanos:{' '}
                        <a
                          href={`tel:${site.phone.tel}`}
                          className="font-semibold text-brand-700 underline underline-offset-4 dark:text-brand-300"
                        >
                          {site.phone.display}
                        </a>
                        <br />
                        WhatsApp disponible
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>
            </div>

            <Reveal className="lg:pt-4">
              <div className="h-[24rem] overflow-hidden rounded-3xl border border-ink-200/70 shadow-[var(--shadow-soft)] lg:h-full lg:min-h-[26rem] dark:border-ink-800 dark:shadow-none">
                <iframe
                  src={maps.nuevos}
                  title="Cómo llegar a la iglesia"
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

      {/* ---------- PRÓXIMOS PASOS ---------- */}
      <Section>
        <div className="container-page">
          <SectionHeader
            overline="Integrarte"
            title="Tus próximos pasos"
            subtitle="Así puedes integrarte a nuestra familia."
            align="center"
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step) => (
              <StaggerItem key={step.badge}>
                <div className="card-hover h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <IconMark name={step.icon} size="sm" />
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-[0.7rem] font-bold tracking-[0.12em] text-brand-800 uppercase dark:bg-brand-500/10 dark:text-brand-200">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug font-bold">{step.title}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                    {step.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- TESTIMONIOS ---------- */}
      <Section tone="muted" className="aura">
        <div className="container-page">
          <SectionHeader
            overline="Historias reales"
            title="Ellos también fueron nuevos"
            subtitle="Historias de personas que encontraron su hogar aquí."
            align="center"
          />

          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {newTestimonials.map((t) => (
              <StaggerItem key={t.name}>
                <TestimonialCard {...t} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CtaBand
        overline="Este domingo"
        title="¿Listo para visitarnos?"
        text="No esperes más. Ven este domingo y experimenta el amor de Cristo en una comunidad que te recibirá con los brazos abiertos. ¡Te estamos esperando!"
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
