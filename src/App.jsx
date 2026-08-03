import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig, motion } from 'motion/react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import ScrollManager from './components/ScrollManager'

import Home from './pages/Home'

/* Las páginas internas se cargan bajo demanda: el visitante que solo entra
   al inicio no descarga el código de las otras siete. */
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Nuevos = lazy(() => import('./pages/Nuevos'))
const Ministerios = lazy(() => import('./pages/Ministerios'))
const Blog = lazy(() => import('./pages/Blog'))
const Donaciones = lazy(() => import('./pages/Donaciones'))
const Contacto = lazy(() => import('./pages/Contacto'))
const Facebook = lazy(() => import('./pages/Facebook'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="grid min-h-[70svh] place-items-center">
      <span className="size-7 animate-spin rounded-full border-2 border-ink-200 border-t-brand-500 dark:border-ink-800 dark:border-t-brand-400" />
      <span className="sr-only">Cargando</span>
    </div>
  )
}

/* Transición entre páginas: solo un fundido de entrada. Esperar a que la
   página anterior termine su salida (AnimatePresence mode="wait") sumaba
   ~400 ms percibidos a cada navegación. */
function Page({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Navbar />

      <main id="contenido">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Page>
                    <Home />
                  </Page>
                }
              />
              <Route
                path="/nosotros"
                element={
                  <Page>
                    <Nosotros />
                  </Page>
                }
              />
              <Route
                path="/nuevos"
                element={
                  <Page>
                    <Nuevos />
                  </Page>
                }
              />
              <Route
                path="/ministerios"
                element={
                  <Page>
                    <Ministerios />
                  </Page>
                }
              />
              <Route
                path="/blog"
                element={
                  <Page>
                    <Blog />
                  </Page>
                }
              />
              <Route
                path="/donaciones"
                element={
                  <Page>
                    <Donaciones />
                  </Page>
                }
              />
              <Route
                path="/contacto"
                element={
                  <Page>
                    <Contacto />
                  </Page>
                }
              />
              <Route
                path="/facebook"
                element={
                  <Page>
                    <Facebook />
                  </Page>
                }
              />
              <Route
                path="/admin"
                element={
                  <Page>
                    <Admin />
                  </Page>
                }
              />
              <Route
                path="*"
                element={
                  <Page>
                    <NotFound />
                  </Page>
                }
              />
            </Routes>
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
    </MotionConfig>
  )
}
