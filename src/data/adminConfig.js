/**
 * Configuración del panel de administración (/admin).
 *
 * CREDENCIALES
 * Se guardan como SHA-256, nunca en texto plano.
 *
 * Para cambiarlas: entra a /admin → pestaña «Ajustes» → «Generar hash»,
 * escribe tu nuevo usuario/contraseña y pega aquí los hashes generados.
 *
 * IMPORTANTE: este archivo viaja en el bundle que descarga cualquier
 * visitante, así que los hashes son públicos y sin salt. El control de
 * acceso solo protege el panel de curiosos, no de un ataque real: no lo
 * uses para nada sensible y cambia las credenciales de fábrica antes de
 * publicar. Los cambios reales del sitio público solo ocurren cuando
 * reemplazas public/data/posts.json y Vercel redespliega.
 */
export const adminAuth = {
  userHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
  passHash: 'cf8690cb6ec49c66aefc07923fccd9f60f391603680636b276a7a7ec42ee67f1',
}

/**
 * Clave del borrador local del panel. El blog también la lee: así el
 * administrador ve sus cambios al instante en su propio navegador antes de
 * exportar y desplegar.
 */
export const DRAFT_KEY = 'jfdv-admin-data'
