import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import Accordion from '../components/Accordion'
import Counter from '../components/Counter'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import {
  Button,
  CtaBand,
  IconMark,
  Section,
  SectionHeader,
  VerseBlock,
} from '../components/ui'

import { bankDetails, cashOptions, donationFaqs, usage, whyDonate, yape } from '../data/donations'

/** Barra de porcentaje que se llena al entrar en pantalla. */
function UsageBar({ percentage }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  return (
    <div
      ref={ref}
      className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800"
      role="presentation"
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${percentage}%` } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
      />
    </div>
  )
}

export default function Donaciones() {
  const [copied, setCopied] = useState(false)

  const copyBankDetails = async () => {
    const text = bankDetails.map((d) => `${d.label}: ${d.value}`).join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      window.prompt('Copia los datos bancarios:', text)
    }
  }

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(t)
  }, [copied])

  const scrollToMethods = () =>
    document
      .getElementById('formas-de-donar')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      <Seo
        title="Donaciones"
        description="Apoya la obra de Dios con tu ofrenda. Iglesia Jesucristo Fuente de Vida para Todas las Generaciones."
      />

      <PageHero
        title="Donaciones"
        subtitle="Tu generosidad hace posible la obra de Dios"
        breadcrumb="Donaciones"
      />

      {/* ---------- POR QUÉ DONAR ---------- */}
      <Section>
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader overline="El principio" title={whyDonate.title} />
              <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-600 dark:text-ink-300">
                {whyDonate.text}
              </p>
              <VerseBlock
                text={whyDonate.verse.text}
                reference={whyDonate.verse.ref}
                className="mt-8 max-w-xl"
              />
            </Reveal>

            <Reveal delay={0.06}>
              <SmartImage
                src={whyDonate.image}
                alt="Ofrenda"
                ratio="4/3"
                className="rounded-3xl shadow-[var(--shadow-lift)] dark:shadow-none"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- EN QUÉ SE USA ---------- */}
      <Section tone="muted" className="aura">
        <div className="container-page">
          <SectionHeader
            overline="Transparencia"
            title="¿En qué usamos tu ofrenda?"
            subtitle="Así se reparte cada sol que entra en la iglesia."
            align="center"
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {usage.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card-hover h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <IconMark name={item.icon} size="sm" />
                    <Counter
                      value={item.percentage}
                      suffix="%"
                      className="tabular bg-gradient-to-b from-brand-600 to-brand-800 bg-clip-text font-display text-[2.1rem] font-bold text-transparent dark:from-brand-300 dark:to-brand-500"
                    />
                  </div>

                  <UsageBar percentage={item.percentage} />

                  <h3 className="mt-5 font-display text-base leading-snug font-bold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- FORMAS DE DONAR ---------- */}
      <Section id="formas-de-donar">
        <div className="container-page">
          <SectionHeader
            overline="Elige tu método"
            title="Formas de donar"
            subtitle="Elige el que más te convenga. Todos llegan al mismo sitio."
            align="center"
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {/* Transferencia bancaria */}
            <Reveal>
              <article className="card-hover flex h-full flex-col p-7">
                <div className="flex items-center gap-3.5">
                  <IconMark name="landmark" size="sm" />
                  <h3 className="font-display text-lg font-bold">Transferencia bancaria</h3>
                </div>
                <p className="mt-3 text-[0.93rem] text-ink-500 dark:text-ink-400">
                  Realiza tu donación directamente a nuestra cuenta bancaria.
                </p>

                <dl className="mt-6 flex-1 divide-y divide-ink-100 rounded-2xl border border-ink-100 px-4 dark:divide-ink-800 dark:border-ink-800">
                  {bankDetails.map((d) => (
                    <div key={d.label} className="flex flex-wrap items-baseline gap-x-4 py-2.5">
                      <dt className="min-w-[8.5rem] text-[0.82rem] font-medium text-ink-400 dark:text-ink-500">
                        {d.label}
                      </dt>
                      <dd className="tabular flex-1 text-[0.9rem] font-bold text-ink-900 dark:text-ink-100">
                        {d.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Button
                  variant="secondary"
                  className="mt-6 w-full"
                  icon={copied ? 'check' : 'copy'}
                  onClick={copyBankDetails}
                >
                  {copied ? 'Datos copiados' : 'Copiar datos'}
                </Button>
              </article>
            </Reveal>

            {/* Yape / Plin */}
            <Reveal delay={0.06}>
              <article className="card-hover flex h-full flex-col p-7">
                <div className="flex items-center gap-3.5">
                  <IconMark name="smartphone" size="sm" />
                  <h3 className="font-display text-lg font-bold">Yape / Plin</h3>
                </div>
                <p className="mt-3 text-[0.93rem] text-ink-500 dark:text-ink-400">
                  Dona de forma rápida y segura con tu celular.
                </p>

                <div className="mx-auto mt-6 w-full max-w-[13rem] overflow-hidden rounded-2xl border-4 border-brand-100 shadow-[var(--shadow-soft)] dark:border-brand-500/20 dark:shadow-none">
                  <SmartImage src={yape.qr} alt="Código QR de Yape" ratio="1/1" sizes="220px" />
                </div>

                <p className="tabular mt-6 text-center font-display text-2xl font-bold text-ink-900 dark:text-ink-50">
                  {yape.number}
                </p>
                <p className="mt-auto pt-4 text-center text-[0.85rem] text-ink-500 dark:text-ink-400">
                  {yape.note}
                </p>
              </article>
            </Reveal>

            {/* Efectivo */}
            <Reveal delay={0.12}>
              <article className="card-hover flex h-full flex-col p-7">
                <div className="flex items-center gap-3.5">
                  <IconMark name="banknote" size="sm" />
                  <h3 className="font-display text-lg font-bold">En efectivo</h3>
                </div>
                <p className="mt-3 text-[0.93rem] text-ink-500 dark:text-ink-400">
                  Entrega tu ofrenda durante los cultos o en nuestra oficina.
                </p>

                <div className="mt-6 flex flex-1 flex-col gap-3">
                  {cashOptions.map((opt) => (
                    <div
                      key={opt.title}
                      className="rounded-2xl border border-ink-100 bg-ink-50 p-5 dark:border-ink-800 dark:bg-ink-900/40"
                    >
                      <h4 className="flex items-center gap-2 text-[0.9rem] font-bold text-ink-900 dark:text-ink-100">
                        <Icon
                          name={opt.icon}
                          className="size-4 text-brand-600 dark:text-brand-300"
                        />
                        {opt.title}
                      </h4>
                      <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-600 dark:text-ink-400">
                        {opt.lines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < opt.lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- PREGUNTAS FRECUENTES ---------- */}
      <Section tone="muted">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader
              overline="Dudas comunes"
              title="Preguntas frecuentes"
              subtitle="Resuelve tus dudas sobre las donaciones."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <Accordion items={donationFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        overline="Gracias"
        title="Tu generosidad transforma vidas"
        text="Cada donación, grande o pequeña, hace una diferencia. Gracias por ser parte de esta misión de llevar el evangelio a todas las generaciones."
      >
        <Button variant="white" size="lg" onClick={scrollToMethods}>
          Donar ahora
        </Button>
        <Button to="/contacto" variant="outline" size="lg">
          Más información
        </Button>
      </CtaBand>

      {/* Aviso de copiado */}
      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 right-5 z-[60] flex items-center gap-3 rounded-2xl bg-ink-900 py-3 pr-5 pl-3.5 text-[0.9rem] font-semibold text-white shadow-[var(--shadow-overlay)] dark:bg-ink-800"
          >
            <span className="grid size-7 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Icon name="check" className="size-4" />
            </span>
            Datos bancarios copiados
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
