import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Seo from '../components/Seo'
import Icon from '../components/Icon'
import SmartImage from '../components/SmartImage'
import { Button, Overline } from '../components/ui'

import useTheme from '../hooks/useTheme'
import { categories, categoryBadge, defaultBlogData } from '../data/blog'
import { adminAuth, DRAFT_KEY } from '../data/adminConfig'

/* ==========================================================================
   UTILIDADES
   ========================================================================== */

const SESSION_KEY = 'jfdv-admin-auth'

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)
}

function serialize(data) {
  return JSON.stringify(
    {
      version: 1,
      updatedAt: new Date().toISOString().slice(0, 10),
      featuredId: data.featuredId,
      posts: data.posts,
    },
    null,
    2,
  )
}

/**
 * Convierte una foto del dispositivo en un data URL JPEG comprimido
 * (máx. 1280 px de ancho). Así la publicación es autocontenida y no hace
 * falta subir archivos a ninguna carpeta.
 */
async function fileToDataUrl(file) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, 1280 / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return canvas.toDataURL('image/jpeg', 0.82)
}

const inputCls = [
  'w-full rounded-xl border border-ink-200 bg-ink-50/60 px-4 py-2.5 text-[0.93rem] transition-all outline-none',
  'focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10',
  'placeholder:text-ink-400 dark:border-ink-700 dark:bg-ink-900/60 dark:text-ink-100',
  'dark:placeholder:text-ink-600 dark:focus:border-brand-400 dark:focus:bg-ink-900',
].join(' ')

function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[0.82rem] font-bold text-ink-700 dark:text-ink-300"
    >
      {children}
    </label>
  )
}

/* ==========================================================================
   ACCESO
   ========================================================================== */

function Login({ onSuccess }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setChecking(true)
    setError('')
    const [u, p] = await Promise.all([sha256Hex(user.trim()), sha256Hex(pass)])
    if (u === adminAuth.userHash && p === adminAuth.passHash) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onSuccess()
    } else {
      setError('Usuario o contraseña incorrectos.')
      setChecking(false)
    }
  }

  return (
    <div className="aura flex min-h-svh items-center justify-center px-5 py-28">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="card w-full max-w-sm p-8"
      >
        <img
          src="/images/logo.png"
          alt=""
          width="80"
          height="48"
          className="mx-auto h-12 w-auto object-contain"
        />
        <h1 className="mt-5 text-center font-display text-2xl font-bold">Panel de la iglesia</h1>
        <p className="mt-2 text-center text-sm text-ink-500 dark:text-ink-400">
          Acceso solo para administradores
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <Label htmlFor="admin-user">Usuario</Label>
            <input
              id="admin-user"
              type="text"
              autoComplete="username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              className={inputCls}
            />
          </div>
          <div>
            <Label htmlFor="admin-pass">Contraseña</Label>
            <input
              id="admin-pass"
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className={inputCls}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[0.85rem] font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" icon="lock" disabled={checking}>
            {checking ? 'Verificando…' : 'Entrar'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

/* ==========================================================================
   EDITOR DE PUBLICACIÓN
   ========================================================================== */

const emptyPost = {
  title: '',
  category: 'eventos',
  date: '',
  author: '',
  image: '',
  alt: '',
  readingTime: '',
  excerpt: '',
}

function PostForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState({ ...emptyPost, ...initial })
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)
  const fileRef = useRef(null)

  const set = (k, v) => setValues((prev) => ({ ...prev, [k]: v }))

  const pickImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProcessing(true)
    setError('')
    try {
      set('image', await fileToDataUrl(file))
    } catch {
      setError('No se pudo procesar esa imagen. Prueba con un JPG o PNG.')
    } finally {
      setProcessing(false)
      e.target.value = ''
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const required = ['title', 'date', 'author', 'excerpt']
    const missing = required.filter((k) => !values[k].trim())
    if (missing.length || !values.image) {
      setError(
        missing.length
          ? 'Completa todos los campos obligatorios (*).'
          : 'Sube una imagen para la publicación.',
      )
      return
    }
    onSave({ ...values, alt: values.alt.trim() || values.title.trim() })
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold">
          {initial?.id ? 'Editar publicación' : 'Nueva publicación'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cerrar editor"
          className="grid size-9 place-items-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 dark:hover:bg-ink-800"
        >
          <Icon name="x" className="size-4.5" />
        </button>
      </div>

      <div>
        <Label htmlFor="post-title">Título *</Label>
        <input
          id="post-title"
          type="text"
          value={values.title}
          onChange={(e) => set('title', e.target.value)}
          className={inputCls}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <Label htmlFor="post-category">Categoría *</Label>
          <select
            id="post-category"
            value={values.category}
            onChange={(e) => set('category', e.target.value)}
            className={inputCls}
          >
            {categories
              .filter((c) => c.id !== 'all')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <Label htmlFor="post-date">Fecha *</Label>
          <input
            id="post-date"
            type="text"
            placeholder="Ej. 12 de Mayo 2026"
            value={values.date}
            onChange={(e) => set('date', e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor="post-author">Autor *</Label>
          <input
            id="post-author"
            type="text"
            placeholder="Ej. Ministerio de Jóvenes"
            value={values.author}
            onChange={(e) => set('author', e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Imagen: se sube desde el dispositivo y queda incrustada en la
          publicación, sin rutas ni carpetas. */}
      <div className="grid gap-5 sm:grid-cols-[1fr_14rem]">
        <div className="space-y-5">
          <div>
            <Label>Imagen *</Label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={pickImage}
              className="sr-only"
              aria-label="Subir imagen de la publicación"
            />
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                icon={processing ? 'loader' : 'upload'}
                disabled={processing}
                onClick={() => fileRef.current?.click()}
              >
                {processing
                  ? 'Procesando…'
                  : values.image
                    ? 'Cambiar imagen'
                    : 'Subir desde mi dispositivo'}
              </Button>
              {values.image && (
                <Button variant="ghost" icon="trash" onClick={() => set('image', '')}>
                  Quitar
                </Button>
              )}
            </div>
            <p className="mt-1.5 text-[0.78rem] text-ink-400 dark:text-ink-500">
              La foto se optimiza automáticamente (máx. 1280 px) y viaja dentro de la publicación.
            </p>
          </div>

          <div>
            <Label htmlFor="post-alt">Texto alternativo (accesibilidad)</Label>
            <input
              id="post-alt"
              type="text"
              placeholder="Se usa el título si lo dejas vacío"
              value={values.alt}
              onChange={(e) => set('alt', e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <Label htmlFor="post-reading">Tiempo de lectura (opcional)</Label>
            <input
              id="post-reading"
              type="text"
              placeholder="Ej. 2 min lectura"
              value={values.readingTime}
              onChange={(e) => set('readingTime', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <Label>Vista previa</Label>
          {values.image ? (
            <SmartImage
              key={values.image.slice(0, 64)}
              src={values.image}
              alt=""
              ratio="3/2"
              className="rounded-xl border border-ink-200 dark:border-ink-800"
              sizes="224px"
            />
          ) : (
            <div className="grid aspect-[3/2] place-items-center rounded-xl border border-dashed border-ink-300 text-ink-400 dark:border-ink-700 dark:text-ink-500">
              <Icon name="images" className="size-6" />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="post-excerpt">Extracto / contenido *</Label>
        <textarea
          id="post-excerpt"
          rows={5}
          value={values.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          className={`${inputCls} resize-y`}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[0.85rem] font-medium text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" icon="check">
          Guardar publicación
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}

/* ==========================================================================
   PESTAÑA: PUBLICACIONES
   ========================================================================== */

function PostsTab({ data, setData }) {
  const [editing, setEditing] = useState(null) // null | 'new' | id

  const savePost = (values) => {
    setData((prev) => {
      if (editing === 'new') {
        let id = slugify(values.title) || `publicacion-${Date.now()}`
        while (prev.posts.some((p) => p.id === id)) id = `${id}-2`
        return { ...prev, posts: [{ ...values, id }, ...prev.posts] }
      }
      return {
        ...prev,
        posts: prev.posts.map((p) => (p.id === editing ? { ...values, id: editing } : p)),
      }
    })
    setEditing(null)
  }

  const removePost = (post) => {
    if (!window.confirm(`¿Eliminar "${post.title}"? Esta acción no se puede deshacer.`)) return
    setData((prev) => {
      const posts = prev.posts.filter((p) => p.id !== post.id)
      const featuredId = prev.featuredId === post.id ? (posts[0]?.id ?? null) : prev.featuredId
      return { ...prev, posts, featuredId }
    })
    if (editing === post.id) setEditing(null)
  }

  const feature = (post) => setData((prev) => ({ ...prev, featuredId: post.id }))

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {editing !== null && (
          <motion.div
            key={editing}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <PostForm
              initial={editing === 'new' ? null : data.posts.find((p) => p.id === editing)}
              onSave={savePost}
              onCancel={() => setEditing(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {editing === null && (
        <Button icon="plus" onClick={() => setEditing('new')}>
          Nueva publicación
        </Button>
      )}

      <ul className="space-y-3">
        {data.posts.map((post) => {
          const isFeatured = post.id === data.featuredId
          const badge = categoryBadge[post.category]

          return (
            <li
              key={post.id}
              className={`card flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${
                isFeatured ? 'border-gold-400/60 dark:border-gold-500/40' : ''
              }`}
            >
              <SmartImage
                src={post.image}
                alt=""
                ratio="3/2"
                className="w-full shrink-0 rounded-lg sm:w-28"
                sizes="112px"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {isFeatured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-gold-600 uppercase dark:bg-gold-500/15 dark:text-gold-300">
                      <Icon name="star" className="size-3" />
                      Destacada
                    </span>
                  )}
                  {badge && (
                    <span className="text-[0.72rem] font-bold tracking-[0.1em] text-brand-700 uppercase dark:text-brand-300">
                      {badge.label}
                    </span>
                  )}
                </div>
                <h3 className="mt-1 truncate font-display text-[1.02rem] font-bold">
                  {post.title}
                </h3>
                <p className="text-[0.82rem] text-ink-500 dark:text-ink-400">
                  {post.date} · {post.author}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => feature(post)}
                  disabled={isFeatured}
                  aria-label={`Destacar "${post.title}"`}
                  title="Marcar como destacada"
                  className={`grid size-10 place-items-center rounded-full border transition-colors ${
                    isFeatured
                      ? 'border-gold-400/60 bg-gold-100 text-gold-600 dark:bg-gold-500/15 dark:text-gold-300'
                      : 'border-ink-200 text-ink-500 hover:border-gold-400 hover:text-gold-500 dark:border-ink-700 dark:text-ink-400'
                  }`}
                >
                  <Icon name="star" className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(post.id)}
                  aria-label={`Editar "${post.title}"`}
                  title="Editar"
                  className="grid size-10 place-items-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-ink-700 dark:text-ink-400"
                >
                  <Icon name="pencil" className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removePost(post)}
                  aria-label={`Eliminar "${post.title}"`}
                  title="Eliminar"
                  className="grid size-10 place-items-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-red-400 hover:text-red-600 dark:border-ink-700 dark:text-ink-400"
                >
                  <Icon name="trash" className="size-4" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ==========================================================================
   PESTAÑA: EXPORTAR
   ========================================================================== */

function ExportTab({ data, onDiscard }) {
  const [message, setMessage] = useState('')
  const json = useMemo(() => serialize(data), [data])

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'posts.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json)
      setMessage('JSON copiado al portapapeles.')
    } catch {
      setMessage('No se pudo copiar. Usa «Descargar».')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-5 p-6 sm:p-7">
        <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
          <Icon name="upload" className="size-5 text-brand-600 dark:text-brand-300" />
          Publicar los cambios
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-ink-500 dark:text-ink-400">
          Tus cambios ya se ven <strong>en este navegador</strong>. Para que los vean todos los
          visitantes:
        </p>
        <ol className="space-y-3 text-[0.9rem] text-ink-600 dark:text-ink-300">
          {[
            'Descarga el archivo posts.json con el botón de abajo.',
            'Reemplaza el archivo public/data/posts.json del proyecto.',
            'Sube el cambio al repositorio: Vercel despliega automáticamente en un par de minutos.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="tabular grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-[0.78rem] font-bold text-brand-800 dark:bg-brand-500/15 dark:text-brand-200">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button icon="download" onClick={download}>
            Descargar posts.json
          </Button>
          <Button variant="secondary" icon="copy" onClick={copy}>
            Copiar JSON
          </Button>
        </div>

        {message && (
          <p
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[0.88rem] font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            {message}
          </p>
        )}
      </div>

      <div className="card space-y-4 p-6 sm:p-7">
        <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
          <Icon name="info" className="size-5 text-brand-600 dark:text-brand-300" />
          Borrador local
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-ink-500 dark:text-ink-400">
          Mientras trabajas, todo se guarda automáticamente en este navegador y el blog de esta
          computadora lo muestra al instante (así puedes revisar cómo queda). Los visitantes
          seguirán viendo la versión publicada hasta que despliegues.
        </p>
        <p className="text-[0.9rem] leading-relaxed text-ink-500 dark:text-ink-400">
          Si algo salió mal, puedes descartar el borrador y volver a la versión publicada.
        </p>
        <Button variant="ghost" size="sm" icon="trash" onClick={onDiscard}>
          Descartar borrador
        </Button>
      </div>
    </div>
  )
}

/* ==========================================================================
   PESTAÑA: AJUSTES
   ========================================================================== */

function SettingsTab() {
  const [text, setText] = useState('')
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!text) return
    setHash(await sha256Hex(text))
    setCopied(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopied(true)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <div className="card max-w-2xl space-y-5 p-6 sm:p-7">
      <h3 className="flex items-center gap-2.5 font-display text-lg font-bold">
        <Icon name="settings" className="size-5 text-brand-600 dark:text-brand-300" />
        Cambiar credenciales
      </h3>
      <p className="text-[0.9rem] leading-relaxed text-ink-500 dark:text-ink-400">
        Las credenciales no se guardan en texto plano: el sitio compara huellas SHA-256. Genera
        aquí la huella de tu nuevo usuario o contraseña y pégala en el archivo{' '}
        <code>src/data/adminConfig.js</code> (campos <code>userHash</code> y{' '}
        <code>passHash</code>); luego vuelve a desplegar.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Nuevo usuario o contraseña"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={inputCls}
          aria-label="Texto para generar hash"
        />
        <Button variant="secondary" onClick={generate} className="shrink-0">
          Generar hash
        </Button>
      </div>

      {hash && (
        <div className="rounded-xl border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-900/60">
          <p className="font-mono text-[0.78rem] break-all text-ink-700 dark:text-ink-300">
            {hash}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            icon={copied ? 'check' : 'copy'}
            onClick={copy}
          >
            {copied ? 'Copiado' : 'Copiar hash'}
          </Button>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   PANEL
   ========================================================================== */

const tabs = [
  { id: 'posts', label: 'Publicaciones', icon: 'megaphone' },
  { id: 'export', label: 'Publicar', icon: 'upload' },
  { id: 'settings', label: 'Ajustes', icon: 'settings' },
]

function Dashboard({ onLogout }) {
  const { isDark, toggle } = useTheme()
  const [tab, setTab] = useState('posts')
  const [data, setDataRaw] = useState(null)

  /* Prioridad de carga: borrador local → JSON publicado → respaldo empaquetado. */
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? 'null')
      if (draft?.posts) {
        setDataRaw(draft)
        return
      }
    } catch {
      /* borrador corrupto: se ignora */
    }
    fetch('/data/posts.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setDataRaw(json?.posts ? json : defaultBlogData))
      .catch(() => setDataRaw(defaultBlogData))
  }, [])

  const setData = (updater) => {
    setDataRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(next))
      } catch {
        window.alert(
          'No se pudo guardar el borrador: el almacenamiento del navegador está lleno. Exporta el JSON para no perder los cambios.',
        )
      }
      return next
    })
  }

  const discardDraft = () => {
    if (!window.confirm('¿Descartar el borrador local y volver a la versión publicada?')) return
    localStorage.removeItem(DRAFT_KEY)
    setDataRaw(null)
    fetch('/data/posts.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setDataRaw(json?.posts ? json : defaultBlogData))
      .catch(() => setDataRaw(defaultBlogData))
  }

  if (!data) {
    return (
      <div className="grid min-h-svh place-items-center">
        <span className="size-7 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500 dark:border-ink-800 dark:border-t-brand-400" />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-ink-50 pt-28 pb-20 dark:bg-ink-950">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Overline tone="accent">Panel de administración</Overline>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Noticias del sitio
            </h1>
            <p className="mt-2 text-[0.95rem] text-ink-500 dark:text-ink-400">
              {data.posts.length} publicaciones · La marcada con ⭐ aparece como destacada en el
              blog.
            </p>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={toggle}
              aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="grid size-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 transition-colors hover:text-ink-800 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
            >
              <Icon name={isDark ? 'sun' : 'moon'} className="size-4" />
            </button>
            <Button variant="secondary" size="sm" icon="log-out" onClick={onLogout}>
              Salir
            </Button>
          </div>
        </div>

        {/* Pestañas */}
        <div
          role="tablist"
          aria-label="Secciones del panel"
          className="mt-8 flex w-fit flex-wrap gap-1.5 rounded-full border border-ink-200/80 bg-white p-1.5 shadow-[var(--shadow-soft)] dark:border-ink-800 dark:bg-ink-900/60 dark:shadow-none"
        >
          {tabs.map((t) => {
            const isActive = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.88rem] transition-colors ${
                  isActive
                    ? 'font-bold text-white'
                    : 'font-semibold text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-500 to-brand-600"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <Icon name={t.icon} className="relative size-3.5" />
                <span className="relative">{t.label}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          {tab === 'posts' && <PostsTab data={data} setData={setData} />}
          {tab === 'export' && <ExportTab data={data} onDiscard={discardDraft} />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  /* El panel no debe aparecer en buscadores. */
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  return (
    <>
      <Seo title="Panel de administración" description="Acceso privado." />
      {authed ? <Dashboard onLogout={logout} /> : <Login onSuccess={() => setAuthed(true)} />}
    </>
  )
}
