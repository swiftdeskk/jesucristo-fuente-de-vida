/**
 * Genera los logos del sitio a partir de los recursos oficiales de la iglesia.
 * Uso: node scripts/brand-logos.mjs "C:/ruta/a/Recursos"
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const src = process.argv[2] ?? 'C:/Users/Arian Cerna/Downloads/Recursos/Recursos'
const out = fileURLToPath(new URL('../public/images/', import.meta.url))

const corona = sharp(`${src}/Logo - Corona.png`).trim()
const completo = sharp(`${src}/Logo sin fondo.png`).trim()

/** Exporta png (paleta) + webp con el mismo nombre base. */
async function emit(pipeline, name, size) {
  const base = pipeline.clone().resize(size, size, { fit: 'inside' })
  await base
    .clone()
    .png({ palette: true, quality: 92, compressionLevel: 9 })
    .toFile(`${out}${name}.png`)
  await base.clone().webp({ quality: 88 }).toFile(`${out}${name}.webp`)
  console.log(`✓ ${name}.png / .webp (${size}px)`)
}

await emit(corona, 'logo', 512)
await emit(completo, 'logo-completo', 900)

/**
 * Favicon: la corona sola, sin fondo.
 *
 * La corona es apaisada (1.66:1), así que se ajusta al ANCHO completo del
 * lienzo cuadrado y queda centrada verticalmente con bandas transparentes:
 * es el tamaño máximo posible sin deformarla. Cada medida se genera desde el
 * original a resolución completa (no reduciendo la grande) y se afila un poco
 * en las pequeñas, donde el remuestreo se come los bordes.
 */
async function favicon(size, name, sharpenSigma) {
  let pipe = corona.clone().resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: 'lanczos3',
  })
  if (sharpenSigma) pipe = pipe.sharpen({ sigma: sharpenSigma })

  await pipe.png({ compressionLevel: 9 }).toFile(`${out}${name}.png`)
  console.log(`✓ ${name}.png (${size}px, corona transparente)`)
}

await favicon(16, 'favicon-16', 0.7)
await favicon(32, 'favicon-32', 0.6)
await favicon(48, 'favicon-48', 0.5)
await favicon(180, 'favicon', 0)

console.log('Listo. Logos oficiales generados en public/images/')
