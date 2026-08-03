import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Reveal } from './Reveal'

/* ==========================================================================
   BOTÓN
   Un componente que rinde <Link>, <a> o <button> según lo que reciba.
   Píldora con estados claros; los hovers son CSS puro por rendimiento.
   ========================================================================== */

const variants = {
  primary: [
    'bg-gradient-to-b from-brand-500 to-brand-600 text-white',
    'shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_20px_-8px_rgb(53_122_189/0.55)]',
    'hover:from-brand-400 hover:to-brand-600 active:from-brand-600 active:to-brand-700',
  ].join(' '),
  secondary: [
    'border border-ink-300/80 bg-white text-ink-800 shadow-[var(--shadow-soft)]',
    'hover:border-ink-400 hover:bg-ink-50 active:bg-ink-100',
    'dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100 dark:shadow-none dark:hover:bg-ink-800',
  ].join(' '),
  white: 'bg-white text-ink-900 shadow-[var(--shadow-soft)] hover:bg-ink-100 active:bg-ink-200',
  outline: 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
  ghost:
    'text-brand-700 hover:bg-brand-50 active:bg-brand-100 dark:text-brand-300 dark:hover:bg-ink-900',
}

const sizes = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-6 text-[0.95rem] gap-2',
  lg: 'h-12 px-7 text-[0.95rem] gap-2.5',
}

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  external = false,
  ...rest
}) {
  const classes = [
    'group inline-flex items-center justify-center rounded-full font-semibold',
    'transition-all duration-200 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-55',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  const content = (
    <>
      {icon && (
        <Icon
          name={icon}
          className={`size-[1.05em] shrink-0 ${icon === 'loader' ? 'animate-spin' : ''}`}
        />
      )}
      <span>{children}</span>
      {iconRight && (
        <Icon
          name={iconRight}
          className="size-[1.05em] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (to)
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )

  if (href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

/* ==========================================================================
   ENLACE DE TEXTO
   ========================================================================== */

export function TextLink({ to, href, external, children, icon = 'arrow-right', className = '' }) {
  const classes = `group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline dark:text-brand-300 ${className}`
  const inner = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (to)
    return (
      <Link to={to} className={classes}>
        {inner}
      </Link>
    )

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  )
}

/* ==========================================================================
   ETIQUETA DE SECCIÓN (eyebrow)
   Una píldora discreta con punto de acento: ancla la vista al inicio del
   bloque sin competir con el título.
   ========================================================================== */

export function Overline({ children, className = '', tone = 'default' }) {
  const tones = {
    default:
      'border-ink-200/80 bg-white text-ink-600 shadow-[var(--shadow-soft)] dark:border-ink-800 dark:bg-ink-900/70 dark:text-ink-300 dark:shadow-none',
    accent:
      'border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-500/25 dark:bg-brand-500/10 dark:text-brand-200',
    inverse: 'border-white/20 bg-white/10 text-white/85',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.72rem] font-bold tracking-[0.14em] uppercase ${tones[tone]} ${className}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  )
}

/* ==========================================================================
   CABECERA DE SECCIÓN
   ========================================================================== */

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  tone = 'default',
  className = '',
  children,
}) {
  const centered = align === 'center'

  return (
    <Reveal
      className={`flex max-w-2xl flex-col ${centered ? 'mx-auto items-center text-center' : 'items-start'} ${className}`}
    >
      {overline && (
        <Overline tone={tone === 'inverse' ? 'inverse' : 'default'} className="mb-6">
          {overline}
        </Overline>
      )}

      <h2
        className={`font-display text-3xl leading-[1.08] font-bold sm:text-4xl lg:text-[2.75rem] ${
          tone === 'inverse' ? 'text-white' : ''
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-5 text-[1.05rem] leading-relaxed ${
            tone === 'inverse' ? 'text-white/70' : 'text-ink-500 dark:text-ink-400'
          }`}
        >
          {subtitle}
        </p>
      )}

      {children}
    </Reveal>
  )
}

/* ==========================================================================
   SECCIÓN
   ========================================================================== */

export function Section({ children, className = '', id, tone = 'default', ...rest }) {
  const tones = {
    default: 'bg-white dark:bg-ink-950',
    muted: 'bg-ink-50 dark:bg-ink-900/25',
    dark: 'bg-ink-950 text-ink-300',
  }

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

/* ==========================================================================
   CITA BÍBLICA
   Panel sereno con el dorado como único adorno: comilla grande, texto en la
   display y referencia pequeña. El dorado no se usa en nada más del sitio.
   ========================================================================== */

export function VerseBlock({ text, reference, className = '', tone = 'default' }) {
  const inverse = tone === 'inverse'

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
        inverse
          ? 'border-white/15 bg-ink-950/30'
          : 'border-gold-300/40 bg-gradient-to-br from-gold-100/50 to-transparent dark:border-gold-500/20 dark:from-gold-500/10'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-3 right-4 font-display text-[6rem] leading-none font-bold select-none ${
          inverse ? 'text-white/8' : 'text-gold-400/15 dark:text-gold-400/10'
        }`}
      >
        &rdquo;
      </span>

      <blockquote
        className={`relative font-display text-[1.1rem] leading-normal font-medium sm:text-[1.2rem] ${
          inverse ? 'text-white/90' : 'text-ink-800 dark:text-ink-100'
        }`}
      >
        {text}
      </blockquote>
      <figcaption
        className={`relative mt-3 text-sm font-semibold tracking-wide ${
          inverse ? 'text-white/55' : 'text-gold-600 dark:text-gold-300'
        }`}
      >
        {reference}
      </figcaption>
    </figure>
  )
}

/* ==========================================================================
   ICONO DE APOYO
   Una baldosa suave del acento. Marca la entrada de la tarjeta, nada más.
   ========================================================================== */

export function IconMark({ name, className = '', size = 'md' }) {
  const boxes = {
    sm: 'size-10 rounded-xl',
    md: 'size-12 rounded-2xl',
  }
  const icons = { sm: 'size-[18px]', md: 'size-5' }

  return (
    <span
      className={`grid shrink-0 place-items-center border border-brand-200/70 bg-gradient-to-b from-brand-50 to-brand-100/60 text-brand-700 dark:border-brand-500/20 dark:from-brand-500/15 dark:to-brand-500/5 dark:text-brand-300 ${boxes[size]} ${className}`}
    >
      <Icon name={name} className={icons[size]} />
    </span>
  )
}

/* ==========================================================================
   TESTIMONIO
   ========================================================================== */

export function TestimonialCard({ text, name, role, initial }) {
  return (
    <figure className="card-hover flex h-full flex-col p-7">
      <Icon name="quote" className="size-5 text-brand-300 dark:text-brand-500/60" />

      <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink-700 dark:text-ink-300">
        {text}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-ink-100 pt-5 dark:border-ink-800">
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 font-display text-base font-bold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
        >
          {initial}
        </span>
        <span>
          <span className="block text-[0.95rem] font-bold text-ink-900 dark:text-ink-100">
            {name}
          </span>
          <span className="block text-sm text-ink-500 dark:text-ink-400">{role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/* ==========================================================================
   BANDA DE LLAMADA A LA ACCIÓN
   Un panel redondeado del acento dentro del contenedor: cierra la página
   con un momento de color sin ocupar todo el ancho de la ventana.
   ========================================================================== */

export function CtaBand({ overline, title, text, children }) {
  return (
    <section className="bg-white py-16 sm:py-20 dark:bg-ink-950">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
            {/* Halos suaves para que el panel no sea un rectángulo plano. */}
            <div
              aria-hidden="true"
              className="absolute -top-28 -right-20 -z-10 size-96 rounded-full bg-brand-500/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 -z-10 size-96 rounded-full bg-brand-400/15 blur-3xl"
            />

            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                {overline && <Overline tone="inverse">{overline}</Overline>}
                <h2 className="mt-6 font-display text-3xl leading-[1.08] font-bold text-white sm:text-4xl lg:text-[2.75rem]">
                  {title}
                </h2>
                <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">{text}</p>
              </div>

              <div className="flex flex-wrap gap-3">{children}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
