import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'
import useTheme from '../hooks/useTheme'
import { navLinks, site } from '../data/site'

function ThemeToggle({ onDark }) {
  const { isDark, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={`grid size-9 place-items-center rounded-full transition-colors ${
        onDark
          ? 'text-white/75 hover:bg-white/15 hover:text-white'
          : 'text-ink-500 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-100'
      }`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} className="size-[17px]" />
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)

  /* Solo la portada tiene una imagen a sangre bajo la barra: ahí conviene que
     la cápsula sea transparente hasta que el visitante empieza a bajar. */
  const overHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      {/* Cápsula flotante: despegada del borde superior, se vuelve vidrio al
          hacer scroll. Sobre la portada queda transparente. */}
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <nav className="container-page" aria-label="Navegación principal">
          <div
            className={`flex h-14 items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-300 sm:h-[3.75rem] sm:px-4 ${
              overHero
                ? 'border border-transparent'
                : 'glass border border-ink-200/70 shadow-[var(--shadow-soft)] dark:border-ink-800 dark:shadow-none'
            }`}
          >
            <Link to="/" className="flex items-center gap-2.5" aria-label="Ir al inicio">
              <img
                src="/images/logo.png"
                alt=""
                width="60"
                height="36"
                className="h-9 w-auto object-contain"
              />
              <span className="hidden leading-tight sm:block">
                <span
                  className={`block font-display text-[0.9rem] font-bold ${
                    overHero ? 'text-white' : 'text-ink-900 dark:text-ink-50'
                  }`}
                >
                  {site.name}
                </span>
                <span
                  className={`block text-[0.66rem] font-semibold tracking-[0.08em] uppercase ${
                    overHero ? 'text-white/60' : 'text-ink-400 dark:text-ink-500'
                  }`}
                >
                  {site.tagline}
                </span>
              </span>
            </Link>

            <ul className="hidden items-center gap-0.5 xl:flex">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      [
                        'rounded-full px-3 py-2 text-[0.88rem] whitespace-nowrap transition-colors',
                        overHero
                          ? isActive
                            ? 'bg-white/15 font-semibold text-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                          : isActive
                            ? 'bg-ink-100 font-semibold text-ink-900 dark:bg-ink-800 dark:text-ink-50'
                            : 'text-ink-600 hover:bg-ink-100/70 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800/70 dark:hover:text-ink-100',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <ThemeToggle onDark={overHero} />

              <a
                href={`https://wa.me/${site.phone.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all active:scale-[0.98] xl:inline-flex ${
                  overHero
                    ? 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10'
                    : 'bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_20px_-8px_rgb(53_122_189/0.55)] hover:from-brand-400 hover:to-brand-600'
                }`}
              >
                <Icon name="whatsapp" className="size-4" />
                Escríbenos
              </a>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-movil"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                className={`grid size-9 place-items-center rounded-full transition-colors xl:hidden ${
                  overHero
                    ? 'text-white hover:bg-white/15'
                    : 'text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
                }`}
              >
                <Icon name={open ? 'x' : 'menu'} className="size-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/55 xl:hidden"
              aria-hidden="true"
            />
            <motion.div
              id="menu-movil"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[min(21rem,88vw)] flex-col overflow-y-auto rounded-l-3xl border-l border-ink-200 bg-white shadow-[var(--shadow-overlay)] xl:hidden dark:border-ink-800 dark:bg-ink-950"
            >
              <div className="flex h-16 items-center justify-between border-b border-ink-100 px-5 dark:border-ink-800">
                <span className="flex items-center gap-2.5">
                  <img
                    src="/images/logo.png"
                    alt=""
                    width="47"
                    height="28"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-display text-[0.9rem] font-bold text-ink-900 dark:text-ink-50">
                    Menú
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="grid size-9 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
                >
                  <Icon name="x" className="size-5" />
                </button>
              </div>

              <ul className="flex flex-col gap-1 p-3">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3 text-[0.97rem] transition-colors ${
                          isActive
                            ? 'bg-brand-50 font-semibold text-brand-800 dark:bg-brand-500/10 dark:text-brand-200'
                            : 'text-ink-600 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {isActive && (
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto border-t border-ink-100 p-5 dark:border-ink-800">
                <a
                  href={`https://wa.me/${site.phone.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 text-[0.95rem] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] transition-all hover:from-brand-400 hover:to-brand-600 active:scale-[0.98]"
                >
                  <Icon name="whatsapp" className="size-4" />
                  Escríbenos por WhatsApp
                </a>

                <div className="mt-5 space-y-1 text-sm text-ink-500 dark:text-ink-400">
                  <p>{site.address.full}</p>
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="block font-semibold text-ink-700 hover:underline dark:text-ink-200"
                  >
                    {site.phone.display}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
