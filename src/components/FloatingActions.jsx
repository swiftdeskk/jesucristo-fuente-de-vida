import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'
import { site } from '../data/site'

/**
 * WhatsApp siempre accesible y «volver arriba» cuando ya hay recorrido.
 * Es un atajo, no un anuncio: sin ondas expansivas ni globos.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="glass grid size-11 place-items-center rounded-full border border-ink-200/80 text-ink-600 shadow-[var(--shadow-soft)] transition-colors hover:text-ink-900 dark:border-ink-700 dark:text-ink-300 dark:hover:text-ink-50"
          >
            <Icon name="arrow-up" className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${site.phone.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="grid size-13 place-items-center rounded-full bg-gradient-to-b from-[#2ee06f] to-[#1eb857] text-white shadow-[0_10px_28px_-8px_rgb(30_184_87/0.6)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 active:scale-95"
      >
        <Icon name="whatsapp" className="size-6" />
      </a>
    </div>
  )
}
