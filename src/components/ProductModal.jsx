import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const getOptValue = (opt) => typeof opt === 'string' ? opt : opt.value
const getOptPrice = (opt) => typeof opt === 'object' && opt && opt.price && opt.price.trim() !== '' ? opt.price.trim() : null
const isOptDisabled = (opt) => typeof opt === 'object' && opt && opt.disabled === true

const buildInitialSelected = (product) => {
  const initial = {}
  product?.variants?.forEach((v) => {
    const first = v.options[0]
    initial[v.name] = v.type === 'color' ? first?.label : getOptValue(first)
  })
  return initial
}

export default function ProductModal({ product, onClose }) {
  const [imgError, setImgError] = useState(false)
  const [activeImg, setActiveImg] = useState(product?.img)
  const [selected, setSelected] = useState(() => buildInitialSelected(product))

  // Reset state when product changes
  useEffect(() => {
    if (!product) return
    setActiveImg(product.img)
    setImgError(false)
    setSelected(buildInitialSelected(product))
  }, [product])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleColorSelect = (variantName, opt) => {
    setSelected((s) => ({ ...s, [variantName]: opt.label }))
    setImgError(false)
    setActiveImg(opt.img || product.img)
  }

  if (!product) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Modal panel */}
        <motion.div
          className="relative z-10 w-full max-w-3xl glass-card overflow-hidden max-h-[90vh] flex flex-col"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500/40 transition-all duration-200"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex flex-col sm:flex-row overflow-y-auto">
            {/* Left — Image with cross-fade on color change */}
            <div className="relative sm:w-2/5 h-64 sm:h-auto flex-shrink-0 overflow-hidden bg-gradient-to-br from-sky-900/40 to-blue-900/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImg}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeImg && !imgError ? (
                    <img
                      src={activeImg}
                      alt={product.name}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl">
                      {product.emoji}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/20 pointer-events-none" />
            </div>

            {/* Right — Details */}
            <div className="flex-1 p-7 flex flex-col gap-4 overflow-y-auto">
              {/* Category badge */}
              <span className="self-start px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                {product.category}
              </span>

              {/* Name */}
              <h2 className="text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black gradient-text">{(() => {
                  if (!product?.variants) return product?.price
                  for (const v of product.variants) {
                    const selVal = selected[v.name]
                    const opt = v.options.find(o => (v.type === 'color' ? o.label : getOptValue(o)) === selVal)
                    const p = getOptPrice(opt)
                    if (p) return p
                  }
                  return product?.price
                })()}</span>
                <span className="text-slate-500 text-sm">/ unit</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-sky-500/30 to-transparent" />

              {/* Variants */}
              {product.variants?.map((variant) => {
                const selectedOpt = variant.type === 'color'
                  ? variant.options.find(o => o.label === selected[variant.name])
                  : variant.options.find(o => getOptValue(o) === selected[variant.name])
                const selectedIsDisabled = isOptDisabled(selectedOpt)
                return (
                  <div key={variant.name} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                      <span className="text-slate-300 font-semibold">{variant.name}</span>
                      <span className="text-slate-600">·</span>
                      <span className={`font-medium ${selectedIsDisabled ? 'text-slate-500 line-through' : 'text-sky-400'}`}>
                        {selected[variant.name]}
                      </span>
                      {selectedIsDisabled && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 leading-none">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Color swatches */}
                    {variant.type === 'color' && (
                      <div className="flex flex-wrap gap-2.5">
                        {variant.options.map((opt) => {
                          const disabled = isOptDisabled(opt)
                          return (
                            <button
                              key={opt.label}
                              title={disabled ? `${opt.label} — Out of Stock` : opt.label}
                              onClick={() => !disabled && handleColorSelect(variant.name, opt)}
                              className={`relative w-8 h-8 rounded-full transition-all duration-200 focus:outline-none flex-shrink-0 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                              style={{ backgroundColor: opt.hex }}
                            >
                              {selected[variant.name] === opt.label && !disabled && (
                                <>
                                  <span className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 0 2px #0ea5e9' }} />
                                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold drop-shadow">✓</span>
                                </>
                              )}
                              {disabled && (
                                <span className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
                                  <span className="absolute w-[130%] h-[2px] bg-white/70 rotate-45" />
                                  <span className="absolute w-[130%] h-[2px] bg-white/70 -rotate-45" />
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Size pills */}
                    {variant.type === 'size' && (
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((opt) => {
                          const val = getOptValue(opt)
                          const disabled = isOptDisabled(opt)
                          const isActive = selected[variant.name] === val
                          return (
                            <button
                              key={val}
                              onClick={() => !disabled && setSelected((s) => ({ ...s, [variant.name]: val }))}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                                disabled
                                  ? 'border-white/5 text-slate-600 cursor-not-allowed line-through'
                                  : isActive
                                    ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/25'
                                    : 'glass border-white/10 text-slate-300 hover:border-sky-500/40 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Type pills */}
                    {variant.type === 'type' && (
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((opt) => {
                          const val = getOptValue(opt)
                          const disabled = isOptDisabled(opt)
                          const isActive = selected[variant.name] === val
                          return (
                            <button
                              key={val}
                              onClick={() => !disabled && setSelected((s) => ({ ...s, [variant.name]: val }))}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                                disabled
                                  ? 'border-white/5 text-slate-600 cursor-not-allowed line-through'
                                  : isActive
                                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 border-transparent text-white shadow-lg shadow-sky-500/25'
                                    : 'glass border-white/10 text-slate-300 hover:border-sky-500/40 hover:text-white'
                              }`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Quality Inspected</span>
                <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Direct Import</span>
                <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Bulk Pricing Available</span>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
