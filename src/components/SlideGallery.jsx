import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const row1 = [
  { label: 'Cabinet Handles',   img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Soft-Close Hinges', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Drawer Slides',     img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Wardrobe Rails',    img: 'https://images.unsplash.com/photo-1631679706909-1ca012191356?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Door Locks',        img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Furniture Legs',    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Shelf Pins',        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Bar Pulls',         img: 'https://images.unsplash.com/photo-1484154133-7e2c4e6d8f32?auto=format&fit=crop&w=400&h=400&q=80' },
]

const row2 = [
  { label: 'Push Latches',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Hairpin Legs',      img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Cup Hinges',        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Drawer Organizers', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Corner Brackets',   img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Bed Fittings',      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Glass Shelf Clips', img: 'https://images.unsplash.com/photo-1519710164239-da123dc3c668?auto=format&fit=crop&w=400&h=400&q=80' },
  { label: 'Drawer Knobs',      img: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=400&h=400&q=80' },
]

function GalleryCard({ label, img }) {
  return (
    <div className="flex-shrink-0 w-52 h-52 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/8 hover:border-sky-500/40 transition-all duration-400 shadow-2xl shadow-black/60">
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 brightness-75 group-hover:brightness-90"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-sm font-semibold text-white leading-tight drop-shadow-lg">{label}</span>
      </div>
      {/* Neon glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 30px rgba(14,165,233,0.15)' }} />
    </div>
  )
}

export default function SlideGallery() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const x2 = useTransform(scrollYProgress, [0, 1], [-150, 150])

  return (
    <section ref={ref} className="py-24 overflow-hidden relative" style={{ background: '#020810' }}>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
        <h2 className="section-heading gradient-text">Our Collection</h2>
        <p className="section-sub">Thousands of premium furniture accessories — sourced, tested, and delivered.</p>
      </div>

      <div className="slide-gallery-mask flex flex-col gap-5">
        {/* Row 1 — slides left */}
        <motion.div style={{ x: x1 }} className="flex gap-5 px-8">
          {row1.map((item, i) => <GalleryCard key={i} {...item} />)}
          {row1.map((item, i) => <GalleryCard key={`d1-${i}`} {...item} />)}
        </motion.div>

        {/* Row 2 — slides right */}
        <motion.div style={{ x: x2 }} className="flex gap-5 px-8">
          {row2.map((item, i) => <GalleryCard key={i} {...item} />)}
          {row2.map((item, i) => <GalleryCard key={`d2-${i}`} {...item} />)}
        </motion.div>
      </div>
    </section>
  )
}
