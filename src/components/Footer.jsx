import { Link } from 'react-router-dom'
import Icon from './Icon'
import { footerLinks, site, socials } from '../data/site'

function LinkColumn({ group }) {
  return (
    <div>
      <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-white/40 uppercase">
        {group.title}
      </h3>
      <ul className="mt-5 space-y-3">
        {group.items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="group inline-flex items-center gap-2 text-[0.93rem] text-white/65 transition-colors hover:text-white"
            >
              <span
                aria-hidden="true"
                className="h-px w-0 bg-brand-400 transition-all duration-200 group-hover:w-3"
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Halo del acento en la esquina: el pie respira sin dejar de ser sobrio. */}
      <div
        aria-hidden="true"
        className="absolute -top-40 right-0 -z-10 size-[30rem] rounded-full bg-brand-600/10 blur-3xl"
      />

      <div className="container-page pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] lg:gap-14">
          {/* Identidad */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt=""
                width="73"
                height="44"
                className="h-11 w-auto object-contain"
              />
              <span className="leading-tight">
                <span className="block font-display text-base font-bold">{site.name}</span>
                <span className="block text-[0.66rem] font-semibold tracking-[0.08em] text-white/45 uppercase">
                  {site.tagline}
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-xs text-[0.93rem] leading-relaxed text-white/55">
              {site.description}
            </p>

            <div className="mt-7 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-10 place-items-center rounded-full border border-white/12 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/15 hover:text-white"
                >
                  <Icon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn group={footerLinks.rapidos} />
          <LinkColumn group={footerLinks.recursos} />

          {/* Contacto */}
          <div>
            <h3 className="text-[0.7rem] font-bold tracking-[0.16em] text-white/40 uppercase">
              Contacto
            </h3>
            <ul className="mt-5 space-y-4 text-[0.93rem] text-white/65">
              <li className="flex gap-3">
                <Icon name="map-pin" className="mt-1 size-3.5 shrink-0 text-brand-400" />
                <span>{site.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-1 size-3.5 shrink-0 text-brand-400" />
                <a href={`tel:${site.phone.tel}`} className="transition-colors hover:text-white">
                  {site.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-1 size-3.5 shrink-0 text-brand-400" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-1 size-3.5 shrink-0 text-brand-400" />
                <span>
                  {site.office.days}
                  <br />
                  {site.office.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-[0.85rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.fullName}
          </p>
          <p className="font-display font-medium text-gold-300/70">
            «Porque contigo está el manantial de la vida» — Salmo 36:9
          </p>
        </div>
      </div>
    </footer>
  )
}
