import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button, IconMark, Section, SectionHeader } from '../components/ui'

import { maps, site, socials } from '../data/site'
import {
  attentionSchedule,
  contactCards,
  directions,
  formFeatures,
  subjectOptions,
} from '../data/contact'

const MAX_MENSAJE = 500

const initialValues = {
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
  privacidad: false,
}

/** Reglas de validación equivalentes a las del forms.js original. */
function validate(values) {
  const errors = {}

  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre completo.'
  else if (values.nombre.trim().length < 3)
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.'

  if (!values.email.trim()) errors.email = 'Escribe tu correo electrónico.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Ese correo no parece válido.'

  if (!values.telefono.trim()) errors.telefono = 'Escribe tu teléfono.'
  else if (!/^[+\d][\d\s()-]{6,}$/.test(values.telefono.trim()))
    errors.telefono = 'Ese teléfono no parece válido.'

  if (!values.asunto) errors.asunto = 'Selecciona un asunto.'

  if (!values.mensaje.trim()) errors.mensaje = 'Escribe tu mensaje.'
  else if (values.mensaje.trim().length < 10)
    errors.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'

  if (!values.privacidad) errors.privacidad = 'Debes aceptar la política de privacidad.'

  return errors
}

function FieldError({ error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-[0.82rem] font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.85rem] font-bold text-ink-700 dark:text-ink-300"
      >
        {label}
      </label>
      {children}
      <FieldError error={error} />
    </div>
  )
}

const inputClass = (hasError) =>
  [
    'w-full rounded-xl border px-4 py-3 text-[0.95rem] transition-all outline-none',
    'bg-ink-50/60 focus:bg-white dark:bg-ink-900/60 dark:text-ink-100 dark:focus:bg-ink-900',
    'placeholder:text-ink-400 dark:placeholder:text-ink-600',
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
      : 'border-ink-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-ink-700 dark:focus:border-brand-400',
  ].join(' ')

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          telefono: values.telefono,
          asunto: subjectOptions.find((o) => o.value === values.asunto)?.label ?? values.asunto,
          mensaje: values.mensaje,
          _subject: `Nuevo mensaje desde la web: ${values.nombre}`,
        }),
      })

      if (!res.ok) throw new Error('Formspree respondió con error')
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="card p-8 sm:p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Icon name="check-circle" className="size-7" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold">Mensaje enviado</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-ink-500 dark:text-ink-400">
          Gracias por escribirnos. Nos pondremos en contacto contigo lo antes posible, normalmente
          en menos de 24 horas.
        </p>
        <Button variant="secondary" className="mt-7" onClick={() => setStatus('idle')}>
          Enviar otro mensaje
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="space-y-6">
        <Field label="Nombre completo *" htmlFor="nombre" error={errors.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={values.nombre}
            onChange={(e) => update('nombre', e.target.value)}
            placeholder="Tu nombre completo"
            aria-invalid={Boolean(errors.nombre)}
            className={inputClass(errors.nombre)}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Correo electrónico *" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              aria-invalid={Boolean(errors.email)}
              className={inputClass(errors.email)}
            />
          </Field>

          <Field label="Teléfono *" htmlFor="telefono" error={errors.telefono}>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={values.telefono}
              onChange={(e) => update('telefono', e.target.value)}
              placeholder="+51 999 999 999"
              aria-invalid={Boolean(errors.telefono)}
              className={inputClass(errors.telefono)}
            />
          </Field>
        </div>

        <Field label="Asunto *" htmlFor="asunto" error={errors.asunto}>
          <select
            id="asunto"
            name="asunto"
            value={values.asunto}
            onChange={(e) => update('asunto', e.target.value)}
            aria-invalid={Boolean(errors.asunto)}
            className={inputClass(errors.asunto)}
          >
            {subjectOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Mensaje *" htmlFor="mensaje" error={errors.mensaje}>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={6}
            maxLength={MAX_MENSAJE}
            value={values.mensaje}
            onChange={(e) => update('mensaje', e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            aria-invalid={Boolean(errors.mensaje)}
            className={`${inputClass(errors.mensaje)} resize-y`}
          />
          <p className="tabular mt-1.5 text-right text-[0.78rem] font-medium text-ink-400 dark:text-ink-500">
            {values.mensaje.length} / {MAX_MENSAJE}
          </p>
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink-600 dark:text-ink-400">
            <input
              type="checkbox"
              name="privacidad"
              checked={values.privacidad}
              onChange={(e) => update('privacidad', e.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-ink-300 accent-brand-600"
            />
            <span>He leído y acepto la política de privacidad *</span>
          </label>
          <FieldError error={errors.privacidad} />
        </div>

        {status === 'error' && (
          <p className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-[0.9rem] font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            <Icon name="info" className="mt-0.5 size-4 shrink-0" />
            No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === 'sending'}
          icon={status === 'sending' ? 'loader' : 'send'}
        >
          {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  )
}

export default function Contacto() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Estamos aquí para servirte. Escríbenos, llámanos o visítanos en Av. Lima 185, Huaral."
      />

      <PageHero
        title="Contáctanos"
        subtitle="Estamos aquí para servirte. Escríbenos o visítanos"
        breadcrumb="Contacto"
      />

      {/* ---------- VÍAS DE CONTACTO ---------- */}
      <Section>
        <div className="container-page">
          <SectionHeader
            overline="Hablemos"
            title="Ponte en contacto"
            subtitle="Estamos disponibles para ti de múltiples formas."
            align="center"
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <StaggerItem key={card.title}>
                <div className="card-hover h-full p-6">
                  <IconMark name={card.icon} size="sm" />
                  <h3 className="mt-4 font-display text-lg font-bold">{card.title}</h3>

                  {card.lines && (
                    <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-600 dark:text-ink-400">
                      {card.lines.map((l, i) => (
                        <span key={i}>
                          {l}
                          {i < card.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}

                  {card.link && (
                    <a
                      href={card.link.href}
                      {...(card.link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="mt-2 block text-[0.93rem] font-semibold text-ink-800 underline-offset-4 hover:underline dark:text-ink-200"
                    >
                      {card.link.label}
                    </a>
                  )}

                  {card.note && (
                    <p className="mt-2 text-[0.85rem] text-ink-500 dark:text-ink-400">
                      {card.note}
                    </p>
                  )}

                  {card.action && (
                    <a
                      href={card.action.href}
                      {...(card.action.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-brand-700 dark:text-brand-300"
                    >
                      {card.action.label}
                      <Icon
                        name="arrow-right"
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- FORMULARIO ---------- */}
      <Section tone="muted" className="aura">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            {/* La columna de apoyo acompaña al formulario mientras se rellena
                en pantallas altas, en vez de dejar un hueco muerto. */}
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                overline="Escríbenos"
                title="Envíanos un mensaje"
                subtitle="Completa el formulario y nos pondremos en contacto contigo lo antes posible. Tu mensaje es importante para nosotros."
              />

              <ul className="mt-9 space-y-3">
                {formFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <span className="text-[0.95rem] font-medium text-ink-700 dark:text-ink-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-ink-200/70 pt-8 dark:border-ink-800">
                <h3 className="text-[0.72rem] font-bold tracking-[0.16em] text-ink-500 uppercase dark:text-ink-400">
                  Síguenos en redes sociales
                </h3>
                <div className="mt-4 flex gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="grid size-11 place-items-center rounded-full border border-ink-200/80 bg-white text-ink-600 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-400 dark:shadow-none dark:hover:border-brand-500/40 dark:hover:text-brand-300"
                    >
                      <Icon name={s.icon} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- MAPA ---------- */}
      <Section>
        <div className="container-page">
          <SectionHeader
            overline="Cómo llegar"
            title="Nuestra ubicación"
            subtitle="Encuéntranos en el corazón de Huaral."
          />

          <Reveal className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-ink-200/70 shadow-[var(--shadow-soft)] dark:border-ink-800 dark:shadow-none">
              <iframe
                src={maps.contacto}
                title="Ubicación de la iglesia en Google Maps"
                className="h-[26rem] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {directions.map((d) => (
              <StaggerItem key={d.title}>
                <div className="card flex h-full gap-4 p-6">
                  <IconMark name={d.icon} size="sm" />
                  <div>
                    <h3 className="font-display text-base font-bold">{d.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
                      {d.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* ---------- HORARIOS DE ATENCIÓN ---------- */}
      <Section tone="muted">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[24rem_1fr] lg:gap-20">
            <SectionHeader
              overline="Te atendemos"
              title="Horarios de atención"
              subtitle="Estamos disponibles para atenderte."
            />

            <Stagger as="dl" className="flex flex-col gap-3">
              {attentionSchedule.map((s) => (
                <StaggerItem key={s.day}>
                  <div className="card grid gap-2 p-5 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-6">
                    <dt className="flex items-center gap-3 font-bold text-ink-900 dark:text-ink-100">
                      <Icon name="clock" className="size-4 text-brand-600 dark:text-brand-300" />
                      {s.day}
                    </dt>
                    <dd className="tabular text-[0.95rem] font-semibold text-ink-700 dark:text-ink-300">
                      {s.time}
                    </dd>
                    <dd className="text-[0.85rem] text-ink-500 dark:text-ink-400">{s.note}</dd>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>
    </>
  )
}
