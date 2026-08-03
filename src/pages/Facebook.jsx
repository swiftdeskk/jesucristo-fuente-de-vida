import { useEffect, useRef, useState } from 'react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import { Button, CtaBand, IconMark, Section, SectionHeader } from '../components/ui'

import { site, socials } from '../data/site'

const FB_PAGE = 'https://www.facebook.com/jesucristofuentedevidahuaral'

/**
 * Línea de tiempo de la página de Facebook mediante el Page Plugin oficial.
 * No requiere claves ni API: es un iframe de Facebook para páginas públicas.
 * El plugin acepta 320–500 px de ancho, así que se mide el contenedor una
 * vez montado para pedir el tamaño correcto.
 */
function FacebookTimeline() {
  const boxRef = useRef(null)
  const [width, setWidth] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = boxRef.current
    if (el) setWidth(Math.max(320, Math.min(500, Math.floor(el.clientWidth))))
  }, [])

  const height = 720
  const src =
    width &&
    `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FB_PAGE)}` +
      `&tabs=timeline&width=${width}&height=${height}&small_header=false` +
      `&adapt_container_width=true&hide_cover=false&show_facepile=true&locale=es_LA`

  return (
    <div ref={boxRef} className="mx-auto w-full max-w-[500px]">
      <div
        className="relative overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-[var(--shadow-soft)] dark:border-ink-800 dark:bg-ink-900/60 dark:shadow-none"
        style={{ minHeight: height }}
      >
        {/* Esqueleto mientras Facebook responde. */}
        {!loaded && (
          <div className="absolute inset-0 grid animate-pulse place-items-center bg-ink-100 dark:bg-ink-800">
            <span className="text-sm font-semibold text-ink-400 dark:text-ink-500">
              Cargando publicaciones…
            </span>
          </div>
        )}

        {src && (
          <iframe
            src={src}
            title="Últimas publicaciones de Facebook de la iglesia"
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`relative transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>

      <p className="mt-4 text-center text-[0.85rem] text-ink-500 dark:text-ink-400">
        ¿No se ven las publicaciones?{' '}
        <a
          href={FB_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 underline underline-offset-4 dark:text-brand-300"
        >
          Ábrelas directamente en Facebook
        </a>
        .
      </p>
    </div>
  )
}

export default function Facebook() {
  return (
    <>
      <Seo
        title="Facebook"
        description="Mira las últimas publicaciones de Facebook de la Iglesia Jesucristo Fuente de Vida y síguenos en nuestras redes sociales."
      />

      <PageHero
        title="Nuestras redes sociales"
        subtitle="Las últimas publicaciones de la iglesia, directo desde Facebook"
        breadcrumb="Facebook"
      />

      <Section>
        <div className="container-page">
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                overline="Comunidad en línea"
                title="Síguenos y no te pierdas nada"
                subtitle="Anuncios, transmisiones, fotos de eventos y palabras de aliento: todo lo que pasa en la iglesia también lo compartimos en nuestras redes."
              />

              <Stagger className="mt-10 flex flex-col gap-3">
                {socials.map((s) => (
                  <StaggerItem key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-hover group flex items-center gap-4 p-5"
                    >
                      <IconMark name={s.icon} size="sm" />
                      <span className="flex-1">
                        <span className="block font-display text-base font-bold">{s.name}</span>
                        <span className="block text-[0.85rem] text-ink-500 dark:text-ink-400">
                          @somosjfdvg
                        </span>
                      </span>
                      <Icon
                        name="external-link"
                        className="size-4 text-ink-300 transition-colors group-hover:text-brand-600 dark:text-ink-600 dark:group-hover:text-brand-300"
                      />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.1} className="mt-8">
                <p className="text-[0.9rem] leading-relaxed text-ink-500 dark:text-ink-400">
                  También puedes escribirnos directamente por WhatsApp al{' '}
                  <a
                    href={`https://wa.me/${site.phone.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-700 underline underline-offset-4 dark:text-brand-300"
                  >
                    {site.phone.display}
                  </a>
                  .
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.06}>
              <FacebookTimeline />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand
        overline="Más cerca"
        title="Sé parte de la conversación"
        text="Dale me gusta a nuestra página, comparte las publicaciones y ayúdanos a llevar el mensaje de Cristo a más personas en Huaral y más allá."
      >
        <Button href={FB_PAGE} external variant="white" size="lg" icon="facebook">
          Ir a Facebook
        </Button>
        <Button to="/blog" variant="outline" size="lg">
          Ver el blog
        </Button>
      </CtaBand>
    </>
  )
}
