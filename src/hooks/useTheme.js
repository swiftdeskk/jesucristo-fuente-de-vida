import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'jfdv-theme'

/**
 * Tema del sitio. El claro es el predeterminado: el oscuro solo aparece si el
 * visitante lo pide expresamente con el conmutador, y entonces se recuerda.
 *
 * El valor inicial ya lo aplicó el script en línea de index.html, así que aquí
 * solo se lee la clase presente en <html> y no hay parpadeo.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* navegación privada: se ignora */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

  return { theme, toggle, isDark: theme === 'dark' }
}
