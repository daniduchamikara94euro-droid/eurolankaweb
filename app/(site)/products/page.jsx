'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import ScrollReveal from '@/components/ScrollReveal'
import { useProducts } from '@/context/ProductsContext'

export default function Products() {
  const { products } = useProducts()
  const [active, setActive] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const categories = ['All', ...new Set(products.map((p) => p.category))]
  const filtered = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="section-heading gradient-text">Our Products</h1>
          <p className="section-sub">Premium furniture accessories sourced directly from China's top manufacturers.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-3 glass-card px-6 py-3">
              <span className="text-2xl">🇨🇳</span>
              <span className="text-sm text-slate-300 font-medium">All products directly imported from China</span>
              <span className="text-green-400 text-sm font-semibold">✓ Quality Inspected</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  active === cat
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-transparent shadow-lg shadow-sky-500/25'
                    : 'glass border-white/10 text-slate-300 hover:border-sky-500/40 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
