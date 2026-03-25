'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const DEFAULT_SLIDES = [
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=900&q=85', title: 'PREMIUM CABINET HANDLES', subtitle: 'Stainless Steel · Brushed Finish', badge: '#Handles', price: 'LKR 450+' },
  { img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&h=900&q=80', title: 'SOFT-CLOSE HINGES', subtitle: 'Silent & Durable Mechanism', badge: '#Hinges', price: 'LKR 280+' },
  { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=900&q=80', title: 'MODERN FURNITURE LEGS', subtitle: 'Industrial · Contemporary Design', badge: '#Legs', price: 'LKR 980+' },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&h=900&q=80', title: 'FULL-EXTENSION DRAWER SLIDES', subtitle: 'Smooth Ball Bearing System', badge: '#Slides', price: 'LKR 320+' },
  { img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&h=900&q=80', title: 'SECURITY DOOR LOCKS', subtitle: 'Advanced Lock Mechanism', badge: '#Locks', price: 'LKR 650+' },
]

// 3D position config — x offset, Y rotation, scale, opacity, z-index, brightness
const CARD_CONFIG = {
  'far-left':  { x: -400, ry:  33, scale: 0.60, opacity: 0.18, zi: 1, bright: 0.30 },
  'left':      { x: -215, ry:  17, scale: 0.80, opacity: 0.55, zi: 3, bright: 0.55 },
  'center':    { x:    0, ry:   0, scale: 1.00, opacity: 1.00, zi: 5, bright: 0.88 },
  'right':     { x:  215, ry: -17, scale: 0.80, opacity: 0.55, zi: 3, bright: 0.55 },
  'far-right': { x:  400, ry: -33, scale: 0.60, opacity: 0.18, zi: 1, bright: 0.30 },
}
const OFFSETS_TO_POS = ['far-left', 'left', 'center', 'right', 'far-right']

export default function HeroVisual() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)

  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(({ hero }) => { if (hero?.slides?.length) setSlides(hero.slides) })
      .catch(() => {})
  }, [])

  const n = slides.length
  const go = useCallback((next) => setActive((next + n) % n), [n])

  useEffect(() => {
    if (paused || n <= 1) return
    const t = setInterval(() => go(active + 1), 5000)
    return () => clearInterval(t)
  }, [active, paused, n, go])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(active - 1)
      if (e.key === 'ArrowRight') go(active + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go])

  const activeSlide = slides[active]

  const cards = [-2, -1, 0, 1, 2].map(offset => ({
    slide: slides[(active + offset + n) % n],
    idx:   (active + offset + n) % n,
    pos:   OFFSETS_TO_POS[offset + 2],
    isCenter: offset === 0,
  }))

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07090f' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 48) go(active + (dx < 0 ? 1 : -1))
        touchX.current = null
      }}
    >
      {/* ── Blurred cinematic background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{
            backgroundImage: `url(${activeSlide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px) brightness(0.16) saturate(1.4)',
          }}
        />
      </AnimatePresence>

      {/* gradient vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 45%, rgba(14,165,233,0.06) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(7,9,15,0.55) 0%, transparent 25%, transparent 55%, rgba(7,9,15,0.92) 100%)' }} />

      {/* ── Top bar ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-7 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link href="/" className="group flex flex-col">
            <span className="text-white font-black text-lg tracking-[0.14em] uppercase group-hover:text-sky-400 transition-colors">Euro Lanka</span>
            <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(14,165,233,0.5)' }}>Imported Design Excellence</span>
          </Link>
        </motion.div>

        {/* animated glass badge */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="hidden sm:block">
          <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(129,140,248,0.08))', border: '1px solid rgba(14,165,233,0.22)', backdropFilter: 'blur(20px)', boxShadow: '0 0 20px rgba(14,165,233,0.12), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            <motion.div className="absolute inset-0 pointer-events-none rounded-full"
              animate={{ x: ['-120%', '220%'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%)', width: '60%' }} />
            <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }} />
            <span className="text-xs font-semibold" style={{ background: 'linear-gradient(90deg,#7dd3fc,#e0e7ff,#7dd3fc)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 4s linear infinite' }}>Direct China Imports</span>
            <span className="w-px h-3 rounded-full" style={{ background: 'rgba(148,163,184,0.25)' }} />
            <span className="text-xs font-semibold" style={{ background: 'linear-gradient(90deg,#fbbf24,#f9a8d4,#fbbf24)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 3s linear infinite' }}>Premium Quality</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Headline ── */}
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
        className="relative z-10 text-center mt-7 mb-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-wide">
          Elevate Your <span className="gradient-text">Furniture</span> Design
        </h1>
      </motion.div>

      {/* ── 3D Carousel ── */}
      <div className="relative z-10 w-full flex items-center justify-center select-none" style={{ height: '360px' }}>

        {/* Left arrow */}
        <button onClick={() => go(active - 1)}
          className="absolute left-3 sm:left-8 lg:left-14 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
          ‹
        </button>

        {/* Card stage — perspective applied here */}
        <div className="relative" style={{ width: '220px', height: '340px', perspective: '1100px', perspectiveOrigin: '50% 38%' }}>
          {cards.map(({ slide, idx, pos, isCenter }) => {
            const c = CARD_CONFIG[pos]
            return (
              <motion.div
                key={idx}
                animate={{ x: c.x, rotateY: c.ry, scale: c.scale, opacity: c.opacity, zIndex: c.zi }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center', willChange: 'transform', cursor: isCenter ? 'default' : 'pointer' }}
                onClick={() => !isCenter && go(idx)}
              >
                {/* image */}
                <img src={slide.img} alt={slide.title || ''}
                  className="w-full h-full object-cover"
                  style={{ filter: `brightness(${c.bright}) contrast(1.06)` }} />

                {/* bottom gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />

                {isCenter && (
                  <>
                    {/* top-left badge */}
                    {slide.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold"
                        style={{ background: 'rgba(14,165,233,0.18)', border: '1px solid rgba(14,165,233,0.38)', color: '#7dd3fc', backdropFilter: 'blur(12px)', boxShadow: '0 0 16px rgba(14,165,233,0.18)' }}>
                        {slide.badge}
                      </div>
                    )}
                    {/* top-right price */}
                    {slide.price && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[11px] font-black"
                        style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.32)', color: '#fbbf24', backdropFilter: 'blur(12px)' }}>
                        {slide.price}
                      </div>
                    )}
                    {/* gloss sheen */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)', boxShadow: '0 0 50px rgba(14,165,233,0.22), inset 0 0 0 1px rgba(14,165,233,0.18)' }} />
                  </>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Right arrow */}
        <button onClick={() => go(active + 1)}
          className="absolute right-3 sm:right-8 lg:right-14 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.28)', backdropFilter: 'blur(14px)', boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 18px rgba(14,165,233,0.1)' }}>
          ›
        </button>
      </div>

      {/* ── Active slide title ── */}
      <AnimatePresence mode="wait">
        <motion.div key={`info-${active}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="relative z-10 text-center mt-6 px-6">
          <p className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-[0.14em] uppercase">
            {activeSlide.title}
          </p>
          <div className="mx-auto my-3 h-px w-20"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.75), transparent)' }} />
          {activeSlide.subtitle && (
            <p className="text-slate-400 text-sm tracking-wide">{activeSlide.subtitle}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Dot indicators ── */}
      <div className="relative z-10 flex items-center gap-2 mt-5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === active ? '28px' : '6px', height: '6px', background: i === active ? '#0ea5e9' : 'rgba(255,255,255,0.18)' }} />
        ))}
      </div>

      {/* ── CTAs ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="relative z-10 flex flex-wrap gap-3 justify-center mt-7 mb-12 px-6">
        <Link href="/products"
          className="glow-btn px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-sm">
          Explore Products →
        </Link>
        <Link href="/contact"
          className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:border-sky-500/40"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}>
          Get a Quote
        </Link>
      </motion.div>

      {/* ── Bottom fog ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(7,9,15,1) 0%, transparent 100%)' }} />

      {/* ── Scroll indicator ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ color: 'rgba(148,163,184,0.35)' }}>
        <span className="text-[9px] uppercase tracking-[0.35em]">Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(14,165,233,0.5), transparent)' }} />
      </motion.div>
    </section>
  )
}
