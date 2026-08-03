import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import SmartImage from '../components/SmartImage'
import { Reveal } from '../components/Reveal'
import { Button, Overline, Section, SectionHeader, TextLink } from '../components/ui'

import useBlogData from '../hooks/useBlogData'
import { categories, categoryBadge } from '../data/blog'

/** Insignia de categoría sobre la imagen de cada tarjeta. */
function CategoryLabel({ category, className = '' }) {
  const badge = categoryBadge[category]
  if (!badge) return null

  return (
    <span
      className={`glass inline-flex items-center gap-1.5 rounded-full border border-white/40 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.12em] text-ink-800 uppercase dark:border-ink-700 dark:text-ink-100 ${className}`}
    >
      <Icon name={badge.icon} className="size-3.5 text-brand-600 dark:text-brand-300" />
      {badge.label}
    </span>
  )
}

function PostCard({ post }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card-hover group flex h-full flex-col overflow-hidden"
    >
      <div className="relative">
        <SmartImage
          src={post.image}
          alt={post.alt}
          ratio="3/2"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"
        />
        <CategoryLabel category={post.category} className="absolute top-4 left-4" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug font-bold">{post.title}</h3>

        <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-500 dark:text-ink-400">
          {post.excerpt}
        </p>

        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-100 pt-4 text-[0.82rem] font-medium text-ink-500 dark:border-ink-800 dark:text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" className="size-3.5 text-ink-400 dark:text-ink-500" />
            {post.date}
          </span>
          <span aria-hidden="true" className="text-ink-300 dark:text-ink-700">
            ·
          </span>
          <span>{post.author}</span>
        </p>
      </div>
    </motion.article>
  )
}

/**
 * Artículo destacado. La imagen usa proporción 3/2 en pantallas apiladas y
 * en escritorio llena en absoluto su columna, de modo que la altura de la
 * tarjeta siempre la dicta el texto y la foto nunca se deforma ni desborda.
 */
function FeaturedPost({ post }) {
  return (
    <Reveal>
      <article className="card grid overflow-hidden lg:grid-cols-[1.15fr_1fr]">
        <div className="relative">
          <SmartImage
            src={post.image}
            alt={post.alt}
            ratio={null}
            priority
            className="aspect-[3/2] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            sizes="(max-width: 1024px) 100vw, 620px"
          />
          <CategoryLabel category={post.category} className="absolute top-4 left-4" />
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <Overline tone="accent">Destacado</Overline>

          <h2 className="mt-5 font-display text-2xl leading-tight font-bold sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-4 leading-relaxed text-ink-500 dark:text-ink-400">{post.excerpt}</p>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] font-medium text-ink-500 dark:text-ink-400">
            <span>{post.date}</span>
            <span aria-hidden="true" className="text-ink-300 dark:text-ink-700">
              ·
            </span>
            <span>{post.author}</span>
            {post.readingTime && (
              <>
                <span aria-hidden="true" className="text-ink-300 dark:text-ink-700">
                  ·
                </span>
                <span>{post.readingTime}</span>
              </>
            )}
          </p>
        </div>
      </article>
    </Reveal>
  )
}

export default function Blog() {
  const { featured, posts } = useBlogData()
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  )

  return (
    <>
      <Seo
        title="Blog y Noticias"
        description="Mantente informado sobre lo que Dios está haciendo en nuestra iglesia: eventos, anuncios y devocionales."
        image={featured?.image?.startsWith('data:') ? undefined : featured?.image}
      />

      <PageHero
        title="Blog y noticias"
        subtitle="Mantente informado sobre lo que Dios está haciendo en nuestra iglesia"
        breadcrumb="Blog"
      />

      {/* ---------- ARTÍCULO DESTACADO ---------- */}
      {featured && (
        <Section className="pb-12 sm:pb-14">
          <div className="container-page">
            <FeaturedPost post={featured} />
          </div>
        </Section>
      )}

      {/* ---------- LISTADO ---------- */}
      <Section tone="muted">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              overline="Todo lo que pasa"
              title="Artículos recientes"
              subtitle={`${filtered.length} ${
                filtered.length === 1 ? 'publicación' : 'publicaciones'
              } en esta categoría.`}
            >
              <div className="mt-5">
                <TextLink to="/facebook" icon="arrow-right">
                  Ver también nuestras publicaciones de Facebook
                </TextLink>
              </div>
            </SectionHeader>

            {/* Filtros: control segmentado de píldoras. */}
            <div
              role="tablist"
              aria-label="Categorías del blog"
              className="flex flex-wrap gap-1.5 rounded-full border border-ink-200/80 bg-white p-1.5 shadow-[var(--shadow-soft)] dark:border-ink-800 dark:bg-ink-900/60 dark:shadow-none"
            >
              {categories.map((cat) => {
                const isActive = active === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(cat.id)}
                    className={`relative rounded-full px-4 py-2 text-[0.88rem] whitespace-nowrap transition-colors ${
                      isActive
                        ? 'font-bold text-white'
                        : 'font-semibold text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-200'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="blog-tab"
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-500 to-brand-600 shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <PostCard key={post.id ?? post.title} post={post} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-12 text-ink-500 dark:text-ink-400">
              Aún no hay publicaciones en esta categoría.
            </p>
          )}
        </div>
      </Section>

      {/* ---------- SUSCRIPCIÓN ---------- */}
      <section className="bg-white py-16 sm:py-20 dark:bg-ink-950">
        <div className="container-page">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
              <div
                aria-hidden="true"
                className="absolute -top-28 -right-20 -z-10 size-96 rounded-full bg-brand-500/25 blur-3xl"
              />

              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <Overline tone="inverse">Boletín</Overline>
                  <h2 className="mt-6 font-display text-3xl leading-[1.08] font-bold text-white sm:text-4xl">
                    No te pierdas nuestras actualizaciones
                  </h2>
                  <p className="mt-5 leading-relaxed text-white/75">
                    Suscríbete a nuestro boletín y recibe las últimas noticias, devocionales y
                    anuncios directamente en tu correo.
                  </p>
                </div>

                <form
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                  action="https://formspree.io/f/xkovbvqg"
                  method="POST"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Tu correo electrónico
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white transition-colors placeholder:text-white/40 focus:border-white/60 focus:outline-none"
                  />
                  <input type="hidden" name="_subject" value="Nueva suscripción al boletín" />
                  <Button type="submit" variant="white" size="lg">
                    Suscribirme
                  </Button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
