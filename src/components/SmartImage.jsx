import { useState } from 'react'

/**
 * Imagen con carga progresiva.
 *
 * - Sirve el `.webp` generado por `npm run images` y deja el original como
 *   respaldo mediante <picture>, así que no depende del soporte del navegador.
 * - `loading="lazy"` + `decoding="async"` de forma nativa (salvo `priority`).
 * - Reserva el espacio con `aspect-ratio` y muestra un esqueleto con brillo
 *   sutil mientras la imagen llega, para que no haya saltos de layout.
 * - Con `ratio={null}` no fija proporción: el contenedor la controla desde
 *   fuera (por ejemplo, para llenar la celda de una cuadrícula).
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  ratio = '4/3',
  priority = false,
  sizes,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)

  /* Solo hay variante .webp para archivos del sitio; las imágenes subidas
     desde el panel llegan como data URL y se usan tal cual. */
  const webp = /\.(jpe?g|png)$/i.test(src) ? src.replace(/\.(jpe?g|png)$/i, '.webp') : null

  return (
    <div
      className={`relative overflow-hidden bg-ink-100 dark:bg-ink-800 ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* Esqueleto: base neutra + barrido de luz mientras carga. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'animate-pulse opacity-100'
        } bg-gradient-to-br from-ink-100 via-ink-200/60 to-ink-100 dark:from-ink-800 dark:via-ink-700/50 dark:to-ink-800`}
      />
      <picture>
        {webp && <source srcSet={webp} type="image/webp" sizes={sizes} />}
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            loaded ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      </picture>
    </div>
  )
}
