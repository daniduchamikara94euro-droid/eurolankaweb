'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import GlassCard from '@/components/GlassCard'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import SlideGallery from '@/components/SlideGallery'
import HeroVisual from '@/components/HeroVisual'
import { useProducts } from '@/context/ProductsContext'

const features = [
  { icon: '🇨🇳', title: 'Direct from China', desc: 'We source directly from top Chinese manufacturers, bypassing middlemen to deliver superior quality at competitive prices.' },
  { icon: '✅', title: 'Quality Assured', desc: 'Every product undergoes strict quality inspection before shipping, ensuring only the finest accessories reach you.' },
  { icon: '🛋️', title: 'Premium Accessories', desc: 'From elegant handles to precision hinges, our curated collection elevates every piece of furniture.' },
]

const stats = [
  { label: 'Years in Business', value: 8,    suffix: '+' },
  { label: 'Products Available', value: 500,  suffix: '+' },
  { label: 'Happy Clients',      value: 1200, suffix: '+' },
  { label: 'Countries Sourced',  value: 3,    suffix: ''  },
]

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return { count, start: () => setStarted(true) }
}

function StatItem({ label, value, suffix }) {
  const { count, start } = useCounter(value)
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => start()}
      viewport={{ once: true }}
    >
      <div className="text-5xl font-black gradient-text mb-2">{count}{suffix}</div>
      <div className="text-slate-500 text-xs uppercase tracking-widest">{label}</div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020810' }}>
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 spotlight" />
      <div className="orb w-[600px] h-[600px] bg-sky-600/10 -top-40 -left-40 animate-float-slow" style={{ filter: 'blur(120px)' }} />
      <div className="orb w-[500px] h-[500px] bg-indigo-600/10 bottom-0 right-0 animate-float-reverse" style={{ filter: 'blur(120px)', animationDelay: '2s' }} />
      <div className="orb w-[300px] h-[300px] bg-purple-700/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ filter: 'blur(100px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-24">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start"
          >
            <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(129,140,248,0.08), rgba(14,165,233,0.06))',
                border: '1px solid rgba(14,165,233,0.25)',
                boxShadow: '0 0 24px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}>

              {/* glare sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full"
                animate={{ x: ['-120%', '220%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)', width: '60%', top: 0, bottom: 0 }}
              />

              {/* top gloss line */}
              <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />

              <span className="text-base">🇨🇳</span>

              <span className="text-sm font-semibold tracking-wide"
                style={{ background: 'linear-gradient(90deg, #7dd3fc, #e0e7ff, #7dd3fc)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 4s linear infinite' }}>
                Direct China Imports
              </span>

              <span className="w-px h-3 rounded-full" style={{ background: 'rgba(148,163,184,0.3)' }} />

              <span className="text-sm font-semibold"
                style={{ background: 'linear-gradient(90deg, #fbbf24, #f9a8d4, #fbbf24)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 3s linear infinite' }}>
                Premium Quality
              </span>

              {/* live dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05]">
            Elevate Your{' '}<span className="gradient-text">Furniture</span><br /><span className="text-white/90">Design.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-400 text-lg max-w-lg leading-relaxed">
            Premium furniture accessories directly imported from China's top manufacturers — quality craftsmanship, elegant design, unbeatable value.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="glow-btn px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-base" data-hover>
              Explore Products →
            </Link>
            <Link href="/contact" className="px-8 py-4 rounded-2xl font-bold glass border border-white/12 text-white hover:border-sky-500/40 hover:bg-white/6 transition-all duration-300 text-base" data-hover>
              Get a Quote
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex gap-8 pt-4 border-t border-white/6">
            {[['500+', 'Products'], ['1200+', 'Clients'], ['8+', 'Years']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-black gradient-text">{val}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
          className="relative h-[460px] lg:h-[580px]">
          <HeroVisual />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-sky-500/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}

export default function Home() {
  const { products, featuredIds } = useProducts()
  const featuredProducts = products.filter(p => featuredIds.includes(p.id))
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div style={{ background: '#020810' }}>
      <Hero />

      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <span className="tag mb-4 inline-block">Why Us</span>
              <h2 className="section-heading gradient-text">Why Choose Euro Lanka?</h2>
              <p className="section-sub">We bridge the gap between world-class Chinese manufacturing and Sri Lankan excellence.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.2}>
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* animated gradient border */}
                  <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${['rgba(14,165,233,0.6)','rgba(129,140,248,0.6)','rgba(168,85,247,0.6)'][i]}, transparent 60%)`, filter: 'blur(1px)' }} />

                  <div className="relative h-full rounded-3xl p-8 flex flex-col overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>

                    {/* sweep light on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)', transform: 'translateX(-100%)', animation: 'none' }} />
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={false}
                      whileHover={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                      transition={{ duration: 1.2, ease: 'linear' }}
                      style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)', backgroundSize: '200% 100%' }}
                    />

                    {/* icon with glow ring */}
                    <div className="relative mb-8 self-start">
                      <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: ['rgba(14,165,233,0.4)','rgba(129,140,248,0.4)','rgba(168,85,247,0.4)'][i], transform: 'scale(1.5)' }} />
                      <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{ background: `linear-gradient(135deg, ${['rgba(14,165,233,0.15)','rgba(129,140,248,0.15)','rgba(168,85,247,0.15)'][i]}, rgba(255,255,255,0.03))`, border: `1px solid ${['rgba(14,165,233,0.3)','rgba(129,140,248,0.3)','rgba(168,85,247,0.3)'][i]}` }}>
                        {f.icon}
                      </div>
                    </div>

                    {/* number accent */}
                    <div className="absolute top-6 right-6 text-7xl font-black select-none pointer-events-none leading-none"
                      style={{ color: ['rgba(14,165,233,0.06)','rgba(129,140,248,0.06)','rgba(168,85,247,0.06)'][i] }}>
                      0{i + 1}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300"
                      style={{ '--hover-color': ['#0ea5e9','#818cf8','#a855f7'][i] }}
                      onMouseEnter={e => e.currentTarget.style.color = ['#0ea5e9','#818cf8','#a855f7'][i]}
                      onMouseLeave={e => e.currentTarget.style.color = 'white'}
                    >{f.title}</h3>

                    <p className="text-slate-500 leading-relaxed text-sm flex-1">{f.desc}</p>

                    {/* bottom accent line */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="h-px flex-1 transition-all duration-700 origin-left"
                        style={{ background: `linear-gradient(to right, ${['rgba(14,165,233,0.6)','rgba(129,140,248,0.6)','rgba(168,85,247,0.6)'][i]}, transparent)`,
                          transform: 'scaleX(0.3)', opacity: 0.4 }} ref={el => {
                          if (el) el.closest('.group') && el.closest('.group').addEventListener('mouseenter', () => { el.style.transform = 'scaleX(1)'; el.style.opacity = '1' }, { once: false })
                          if (el) el.closest('.group') && el.closest('.group').addEventListener('mouseleave', () => { el.style.transform = 'scaleX(0.3)'; el.style.opacity = '0.4' }, { once: false })
                        }} />
                      <span className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: ['rgba(14,165,233,0.5)','rgba(129,140,248,0.5)','rgba(168,85,247,0.5)'][i] }}>
                        Learn more
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SlideGallery />

      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(129,140,248,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="tag mb-4 inline-block">Collection</span>
              <h2 className="section-heading gradient-text">Featured Products</h2>
              <p className="section-sub">Handpicked accessories that define modern furniture craftsmanship.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.1} onClick={() => setSelectedProduct(p)} />
            ))}
          </div>
          <ScrollReveal className="text-center mt-14">
            <Link href="/products" className="glow-btn inline-block px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" data-hover>
              View All Products →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="neon-card p-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="orb w-64 h-64 bg-sky-600/10 -top-10 -left-10" style={{ filter: 'blur(60px)' }} />
            <div className="orb w-48 h-48 bg-indigo-600/10 -bottom-10 -right-10" style={{ filter: 'blur(60px)' }} />
            {stats.map((s) => (
              <div key={s.label} className="relative z-10"><StatItem {...s} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center neon-card p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="orb w-80 h-80 bg-sky-600/10 -top-20 -left-20" style={{ filter: 'blur(80px)' }} />
            <div className="orb w-60 h-60 bg-purple-700/10 -bottom-20 -right-20" style={{ filter: 'blur(80px)' }} />
            <div className="relative z-10">
              <span className="tag mb-6 inline-block">Let's Talk</span>
              <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">Ready to Transform Your Space?</h2>
              <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
                Get in touch for bulk pricing, custom orders, and exclusive deals on premium furniture accessories.
              </p>
              <Link href="/contact" className="glow-btn inline-block px-12 py-5 rounded-2xl font-bold text-white text-lg bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" data-hover>
                Contact Us Today →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
