import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function ProductCard({ product, delay = 0, onClick }) {
  const cardRef = useRef(null)
  const [imgError, setImgError] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="tilt-card glass-card overflow-hidden group cursor-pointer"
      style={{ transition: 'transform 0.15s ease-out' }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden h-52">
        {product.img && !imgError ? (
          <img
            src={product.img}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-900/40 to-blue-900/40 flex items-center justify-center text-6xl transition-transform duration-500 group-hover:scale-110">
            {product.emoji}
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/50 text-sky-300 border border-sky-500/30 backdrop-blur-sm">
          {product.category}
        </span>

        {/* Hover overlay with description */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-slate-200 text-sm leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 tilt-card-inner">
        <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-sky-400 transition-colors">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sky-400 font-bold text-lg">{product.price}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onClick?.() }}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 text-white glow-btn"
          >
            Enquire
          </button>
        </div>
      </div>
    </motion.div>
  )
}
