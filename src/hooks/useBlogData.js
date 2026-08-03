import { useEffect, useMemo, useState } from 'react'
import { defaultBlogData } from '../data/blog'
import { DRAFT_KEY } from '../data/adminConfig'

/* Caché de módulo para el JSON publicado: se pide una sola vez por sesión. */
let published = null

/** Borrador del panel /admin guardado en este navegador, si existe. */
function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    const draft = raw ? JSON.parse(raw) : null
    return draft?.posts?.length ? draft : null
  } catch {
    return null
  }
}

/**
 * Datos del blog en tres niveles de prioridad:
 *   1. Borrador local del administrador (solo su navegador, cambios al instante).
 *   2. /data/posts.json publicado en el sitio.
 *   3. Respaldo empaquetado en el bundle.
 */
export default function useBlogData() {
  const [data, setData] = useState(() => readDraft() ?? published ?? defaultBlogData)

  useEffect(() => {
    if (readDraft() || published) return
    const ctrl = new AbortController()
    fetch('/data/posts.json', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json && Array.isArray(json.posts) && json.posts.length > 0) {
          published = json
          setData(json)
        }
      })
      .catch(() => {
        /* sin red o archivo ausente: se queda el respaldo empaquetado */
      })
    return () => ctrl.abort()
  }, [])

  return useMemo(() => {
    const all = data.posts ?? []
    const featured = all.find((p) => p.id === data.featuredId) ?? all[0] ?? null
    const posts = all.filter((p) => p !== featured)
    return { featured, posts, all }
  }, [data])
}
