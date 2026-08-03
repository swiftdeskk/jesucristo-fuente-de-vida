import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { Button, Overline } from '../components/ui'
import { navLinks } from '../data/site'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" description="La página que buscas no existe." />

      <section className="aura flex min-h-[85svh] items-center pt-28">
        <div className="container-page">
          <div className="max-w-xl">
            <Overline tone="accent">Error 404</Overline>

            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold sm:text-5xl">
              No encontramos esta página
            </h1>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-500 dark:text-ink-400">
              Puede que el enlace haya cambiado o que la dirección esté mal escrita. Estos son los
              lugares a los que sí puedes ir:
            </p>

            <ul className="mt-9 grid gap-2 sm:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="card group flex items-center justify-between px-5 py-3.5 text-[0.95rem] font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-800 dark:text-ink-300 dark:hover:border-brand-500/40 dark:hover:text-brand-200"
                  >
                    {link.label}
                    <Icon
                      name="arrow-right"
                      className="size-4 text-ink-300 transition-transform duration-200 group-hover:translate-x-1 dark:text-ink-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button to="/" size="lg" icon="home">
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
