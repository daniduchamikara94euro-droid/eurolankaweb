import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About Us' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-[#020810]/80 border-b border-white/6 shadow-xl shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-sky-500/40 group-hover:ring-sky-400 transition-all duration-300">
            <img src="/logo.png" alt="Euro Lanka" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-lg gradient-text">Euro Lanka</span>
            <p className="text-[10px] text-slate-400 leading-none tracking-widest uppercase">Imported Design Excellence</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                    />
                  )}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              to="/contact"
              className="glow-btn px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white"
            >
              Get Quote
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block text-base font-medium transition-colors ${
                      location.pathname === to ? 'text-sky-400' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
