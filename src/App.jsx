import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { ProductsProvider } from './context/ProductsContext'

/* ── Custom cursor (desktop only) ── */
function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // hide the default cursor
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current)  dot.current.style.transform  = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      if (ring.current) ring.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`
    }
    const onOver = (e) => {
      setHovering(!!e.target.closest('a, button, [data-hover]'))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <div ref={dot}  className="cursor-dot"  style={{ opacity: hovering ? 0.4 : 1, width: hovering ? '12px' : '8px', height: hovering ? '12px' : '8px' }} />
      <div ref={ring} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/"         element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <>
              <CustomCursor />
              <Loader />
              <ScrollToTop />
              <div className="min-h-screen flex flex-col" style={{ background: '#020810' }}>
                <Navbar />
                <main className="flex-1">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </>
          } />
        </Routes>
      </ProductsProvider>
    </BrowserRouter>
  )
}
