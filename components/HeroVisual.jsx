'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_SLIDES = [
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&h=500&q=85', title: 'Premium Cabinet Handles', subtitle: 'Stainless Steel · Brushed Finish', price: 'LKR 450+', badge: 'Handles' },
  { img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=700&h=500&q=80', title: 'Soft-Close Hinges', subtitle: 'Silent & Durable', price: 'LKR 280+', badge: 'Hinges' },
  { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&h=500&q=80', title: 'Furniture Legs', subtitle: 'Modern & Industrial', price: 'LKR 980+', badge: 'Legs' },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
}

export default function HeroVisual() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(({ hero }) => {
        if (hero?.slides?.length) setSlides(hero.slides)
      })
      .catch(() => {})
  }, [])

  const go = useCallback((next) => {
    setDir(next > index ? 1 : -1)
    setIndex((next + slides.length) % slides.length)
  }, [index, slides.length])

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = setInterval(() => go(index + 1), 4000)
    return () => clearInterval(t)
  }, [index, paused, slides.length, go])

  const slide = slides[index]

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* outer glow */}
      <div className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />

      {/* card shell */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.08)', border: '1px solid rgba(14,165,233,0.18)' }}>

        {/* slide image */}
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) contrast(1.05)' }}
            />
            {/* gradient overlays */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,8,16,0.97) 0%, rgba(2,8,16,0.4) 45%, transparent 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(2,8,16,0.3) 0%, transparent 60%)' }} />

            {/* glare sheen */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0, 0.06, 0] }}
              transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* badge top-left */}
        <AnimatePresence mode="wait">
          <motion.div key={`badge-${index}`}
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl"
            style={{ background: 'rgba(14,165,233,0.18)', border: '1px solid rgba(14,165,233,0.35)', color: '#7dd3fc', boxShadow: '0 0 16px rgba(14,165,233,0.2)' }}
          >
            {slide.badge}
          </motion.div>
        </AnimatePresence>

        {/* price top-right */}
        <AnimatePresence mode="wait">
          <motion.div key={`price-${index}`}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-black backdrop-blur-xl"
            style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(249,168,212,0.15))', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
          >
            {slide.price}
          </motion.div>
        </AnimatePresence>

        {/* text bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <AnimatePresence mode="wait">
            <motion.div key={`text-${index}`}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p className="text-white font-black text-xl mb-1 leading-tight">{slide.title}</p>
              {slide.subtitle && <p className="text-slate-400 text-sm">{slide.subtitle}</p>}
            </motion.div>
          </AnimatePresence>

          {/* dots + arrows */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{ width: i === index ? '24px' : '6px', height: '6px', background: i === index ? '#0ea5e9' : 'rgba(255,255,255,0.2)' }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => go(index - 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                ‹
              </button>
              <button onClick={() => go(index + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.35)', backdropFilter: 'blur(10px)' }}>
                ›
              </button>
            </div>
          </div>
        </div>

        {/* corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
          style={{ borderTop: '2px solid rgba(14,165,233,0.5)', borderLeft: '2px solid rgba(14,165,233,0.5)', borderRadius: '12px 0 0 0' }} />
        <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none"
          style={{ borderBottom: '2px solid rgba(168,85,247,0.4)', borderRight: '2px solid rgba(168,85,247,0.4)', borderRadius: '0 0 12px 0' }} />
      </div>

      {/* floating stat pills */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
        className="absolute -top-3 -right-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl text-center"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(14,165,233,0.3)', boxShadow: '0 0 20px rgba(14,165,233,0.15), 0 8px 30px rgba(0,0,0,0.5)' }}>
        <div className="text-lg font-black text-sky-400">500+</div>
        <div className="text-[9px] text-slate-500 uppercase tracking-widest">Products</div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
        className="absolute top-[42%] -right-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl text-center"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(129,140,248,0.3)', boxShadow: '0 0 20px rgba(129,140,248,0.15), 0 8px 30px rgba(0,0,0,0.5)' }}>
        <div className="text-lg font-black text-indigo-400">1200+</div>
        <div className="text-[9px] text-slate-500 uppercase tracking-widest">Clients</div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
        className="absolute bottom-[18%] -left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-xl"
        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
        <span className="text-green-400 text-xs">✓</span>
        <span className="text-green-400 text-xs font-semibold">Quality Inspected</span>
      </motion.div>
    </div>
  )
}
