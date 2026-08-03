/**
 * Regenera public/data/posts.json a partir del respaldo empaquetado
 * (src/data/blog.js). Útil para dejar ambos archivos sincronizados.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { defaultBlogData } from '../src/data/blog.js'

const outDir = fileURLToPath(new URL('../public/data/', import.meta.url))
await mkdir(outDir, { recursive: true })

const json = JSON.stringify(
  { ...defaultBlogData, updatedAt: new Date().toISOString().slice(0, 10) },
  null,
  2,
)
await writeFile(`${outDir}posts.json`, json, 'utf8')
console.log(`✓ public/data/posts.json (${defaultBlogData.posts.length} publicaciones)`)
