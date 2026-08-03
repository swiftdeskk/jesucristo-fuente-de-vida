/**
 * Optimiza en el sitio las imágenes de public/images.
 *
 * - Redimensiona a un ancho máximo razonable para web.
 * - Recomprime JPEG con mozjpeg y PNG con paleta.
 * - Genera además una versión .webp junto a cada archivo.
 *
 * Conserva los nombres originales, así que ningún import se rompe.
 * Uso: npm run images
 */
import { readdir, stat, writeFile, readFile } from 'node:fs/promises'
import { join, extname, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', 'public', 'images')

/** Ancho máximo por carpeta o archivo concreto. */
const RULES = [
  { match: /logo\.png$/i, width: 420 },
  { match: /favicon\.png$/i, width: 180 },
  { match: /qr-yape\.jpg$/i, width: 700 },
  { match: /(hero-iglesia|preview)\.jpg$/i, width: 1920 },
  { match: /[\\/]equipo[\\/]/i, width: 800 },
  { match: /[\\/]ministerios[\\/]/i, width: 1200 },
  { match: /[\\/]blog[\\/]/i, width: 1600 },
]
const DEFAULT_WIDTH = 1600

const maxWidthFor = (path) => RULES.find((r) => r.match.test(path))?.width ?? DEFAULT_WIDTH

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

const fmt = (bytes) => `${(bytes / 1024).toFixed(0).padStart(6)} KB`

async function main() {
  let before = 0
  let after = 0
  let count = 0

  for await (const file of walk(ROOT)) {
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

    const original = await readFile(file)
    const { size } = await stat(file)
    const width = maxWidthFor(file)

    const pipeline = sharp(original)
      .rotate()
      .resize({ width, withoutEnlargement: true })

    const optimized =
      ext === '.png'
        ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 82 }).toBuffer()
        : await pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer()

    // Solo se sobrescribe si realmente pesa menos.
    const finalBuffer = optimized.length < original.length ? optimized : original
    await writeFile(file, finalBuffer)

    // Versión webp hermana, útil para <picture> o para servirla directamente.
    const webpPath = join(dirname(file), `${basename(file, ext)}.webp`)
    await sharp(finalBuffer).webp({ quality: 78, effort: 5 }).toFile(webpPath)

    before += size
    after += finalBuffer.length
    count++
    console.log(`${fmt(size)} → ${fmt(finalBuffer.length)}  ${file.replace(ROOT, '')}`)
  }

  const saved = before - after
  console.log(
    `\n${count} imágenes · ${(before / 1024 / 1024).toFixed(1)} MB → ` +
      `${(after / 1024 / 1024).toFixed(1)} MB ` +
      `(-${((saved / before) * 100).toFixed(0)} %)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
