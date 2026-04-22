'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductCard({ product, delay = 0, onClick }) {
  const cardRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const [tapped, setTapped] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card || window.matchMedia('(hover: none)').matches) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / rect.height) * -12
    const rotateY = ((x - rect.width  / 2) / rect.width)  *  12
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  // On touch: first tap highlights, second tap opens
  const handleTap = () => {
    if (window.matchMedia('(hover: none)').matches) {
      if (!tapped) { setTapped(true); return }
      setTapped(false)
    }
    onClick?.()
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className={`tilt-card glass-card overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform ${tapped ? 'ring-2 ring-sky-500/60' : ''}`}
      style={{ transition: 'transform 0.15s ease-out' }}
      whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>

      <div className="relative overflow-hidden h-48 sm:h-52">
        {product.img && !imgError ? (
          <img src={product.img} alt={product.name} onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-900/40 to-blue-900/40 flex items-center justify-center text-6xl">
            {product.emoji}
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-sky-300 border border-sky-500/30 backdrop-blur-sm">
          {product.category}
        </span>
        {/* Show description overlay on tap (mobile) or hover (desktop) */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 flex items-end p-4 ${tapped ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <p className="text-slate-200 text-sm leading-relaxed line-clamp-3">{product.description}</p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-white text-base sm:text-lg mb-1 group-hover:text-sky-400 transition-colors">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onClick?.() }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-btn flex-shrink-0">
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  )
}
