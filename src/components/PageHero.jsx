import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Icon from './Icon'
import { easeOut } from './Reveal'

/**
 * Cabecera de las páginas internas.
 *
 * La fotografía queda como textura muy tenue bajo un degradado azul marino de
 * marca; el peso lo lleva el título en la display. La base se curva hacia el
 * contenido para que la página no arranque con un corte recto.
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  image = '/images/hero-iglesia.jpg',
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <picture>
        <source srcSet={image.replace(/\.jpe?g$/i, '.webp')} type="image/webp" />
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover opacity-20"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-950/80 via-brand-950/70 to-ink-950/85"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 right-[-10%] -z-10 size-96 rounded-full bg-brand-500/15 blur-3xl"
      />

      <div className="container-page">
        <motion.nav
          aria-label="Ruta de navegación"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ol className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/30 px-4 py-1.5 text-[0.8rem] text-white/60">
            <li>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Icon name="home" className="size-3.5" />
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevron-right" className="size-3 opacity-50" />
            </li>
            <li className="font-semibold text-white/90">{breadcrumb ?? title}</li>
          </ol>
        </motion.nav>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.05 }}
          className="mt-7 max-w-3xl font-display text-4xl leading-[1.05] font-bold text-white sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.12 }}
            className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Curva de transición hacia el contenido. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-8 rounded-t-[2.5rem] bg-white sm:h-10 dark:bg-ink-950"
      />
    </section>
  )
}
