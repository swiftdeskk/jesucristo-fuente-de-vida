import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'

/**
 * Preguntas frecuentes.
 *
 * Tarjetas redondeadas independientes: la abierta se distingue por el borde
 * del acento y un fondo apenas teñido. Los disparadores son botones reales
 * con aria-expanded/aria-controls.
 */
export default function Accordion({ items, allowMultiple = false }) {
  const [open, setOpen] = useState([])
  const baseId = useId()

  const toggle = (i) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((v) => v !== i) : allowMultiple ? [...prev, i] : [i],
    )

  return (
    <div className="flex max-w-2xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open.includes(i)

        return (
          <div
            key={item.q}
            className={`rounded-2xl border transition-colors duration-300 ${
              isOpen
                ? 'border-brand-300/70 bg-brand-50/50 dark:border-brand-500/30 dark:bg-brand-500/5'
                : 'border-ink-200/70 bg-white hover:border-ink-300 dark:border-ink-800 dark:bg-ink-900/60 dark:hover:border-ink-700'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-button-${i}`}
                className="group flex w-full items-center justify-between gap-6 px-5 py-4.5 text-left sm:px-6"
              >
                <span
                  className={`text-[1rem] leading-snug font-semibold transition-colors ${
                    isOpen
                      ? 'text-ink-900 dark:text-ink-50'
                      : 'text-ink-700 group-hover:text-ink-900 dark:text-ink-300 dark:group-hover:text-ink-100'
                  }`}
                >
                  {item.q}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                    isOpen
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                      : 'bg-ink-100 text-ink-500 dark:bg-ink-800 dark:text-ink-400'
                  }`}
                >
                  <Icon name="chevron-down" className="size-4" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-button-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-ink-600 sm:px-6 dark:text-ink-400">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
