import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard'

const ADMIN_PIN = 'admin2024'
const AUTH_KEY = 'elw_admin_auth'

const CATEGORIES = ['Handles', 'Hinges', 'Slides', 'Fittings', 'Legs', 'Locks']

const BLANK_PRODUCT = {
  name: '', category: 'Handles', emoji: '🪝', price: '', img: '', description: '', variants: []
}

/* ── PIN Screen ── */
function PinScreen({ onAuth }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      onAuth()
    } else {
      setError('Incorrect PIN')
      setShake(true)
      setPin('')
      setTimeout(() => setShake(false), 600)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#020810' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="orb w-96 h-96 bg-sky-600/10 -top-20 -left-20" style={{ filter: 'blur(120px)', position: 'absolute' }} />
      <div className="orb w-80 h-80 bg-indigo-600/10 bottom-0 right-0" style={{ filter: 'blur(120px)', position: 'absolute' }} />

      <div className={`relative glass-card p-10 w-full max-w-sm text-center ${shake ? 'animate-shake' : ''}`}>
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-black gradient-text mb-2">Admin Access</h1>
        <p className="text-slate-500 text-sm mb-8">Enter your PIN to continue</p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-xl tracking-widest focus:outline-none focus:border-sky-500/60 transition-colors"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="glow-btn w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600">
            Unlock
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  )
}

const getOptValue = (opt) => typeof opt === 'string' ? opt : opt.value

/* ── Variant Builder ── */
function VariantBuilder({ variants, onChange }) {
  const addVariant = () => {
    onChange([...variants, { name: '', type: 'color', options: [] }])
  }

  const removeVariant = (vi) => {
    onChange(variants.filter((_, i) => i !== vi))
  }

  const updateVariant = (vi, field, val) => {
    const next = variants.map((v, i) => i === vi ? { ...v, [field]: val } : v)
    // reset options when type changes
    if (field === 'type') {
      next[vi].options = []
    }
    onChange(next)
  }

  const addOption = (vi) => {
    const v = variants[vi]
    const newOpt = v.type === 'color' ? { label: '', hex: '#888888', img: '', price: '', disabled: false } : { value: '', price: '', disabled: false }
    onChange(variants.map((vv, i) => i === vi ? { ...vv, options: [...vv.options, newOpt] } : vv))
  }

  const removeOption = (vi, oi) => {
    onChange(variants.map((vv, i) => i === vi ? { ...vv, options: vv.options.filter((_, j) => j !== oi) } : vv))
  }

  const updateOption = (vi, oi, val) => {
    onChange(variants.map((vv, i) => i === vi ? {
      ...vv,
      options: vv.options.map((o, j) => j === oi ? val : o)
    } : vv))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-300">Variants</span>
        <button type="button" onClick={addVariant}
          className="px-3 py-1 rounded-lg text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-colors">
          + Add Variant
        </button>
      </div>

      {variants.map((v, vi) => (
        <div key={vi} className="glass border border-white/8 rounded-xl p-4 space-y-3">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={v.name}
              onChange={e => updateVariant(vi, 'name', e.target.value)}
              placeholder="Variant name (e.g. Finish)"
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500/60"
            />
            <select
              value={v.type}
              onChange={e => updateVariant(vi, 'type', e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#0a1020] border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500/60"
            >
              <option value="color" className="bg-[#0a1020] text-white">Color</option>
              <option value="size" className="bg-[#0a1020] text-white">Size</option>
              <option value="type" className="bg-[#0a1020] text-white">Type</option>
            </select>
            <button type="button" onClick={() => removeVariant(vi)}
              className="px-3 py-2 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
              Remove
            </button>
          </div>

          {/* Options */}
          <div className="space-y-2 pl-2">
            {v.options.map((opt, oi) => (
              <div key={oi} className="flex gap-2 items-center">
                {v.type === 'color' ? (
                  <>
                    <input type="text" value={opt.label} onChange={e => updateOption(vi, oi, { ...opt, label: e.target.value })}
                      placeholder="Label" className="w-20 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60 flex-shrink-0" />
                    <input type="color" value={opt.hex} onChange={e => updateOption(vi, oi, { ...opt, hex: e.target.value })}
                      className="w-8 h-[30px] rounded cursor-pointer bg-transparent border border-white/10 flex-shrink-0" title="Hex color" />
                    <input type="text" value={opt.img} onChange={e => updateOption(vi, oi, { ...opt, img: e.target.value })}
                      placeholder="Image URL" className="flex-1 min-w-0 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                    <input type="text" value={opt.price ?? ''} onChange={e => updateOption(vi, oi, { ...opt, price: e.target.value })}
                      placeholder="Price" className="w-20 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60 flex-shrink-0" />
                    <button type="button" title={opt.disabled ? 'Mark as available' : 'Mark as out of stock'}
                      onClick={() => updateOption(vi, oi, { ...opt, disabled: !opt.disabled })}
                      className={`w-[72px] text-center py-1.5 rounded-lg text-xs font-semibold border transition-colors flex-shrink-0 ${opt.disabled ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'text-slate-500 border-white/10 hover:text-amber-400 hover:border-amber-500/30'}`}>
                      {opt.disabled ? 'OOS' : 'In Stock'}
                    </button>
                    <button type="button" onClick={() => removeOption(vi, oi)}
                      className="text-slate-500 hover:text-red-400 text-xs px-1 transition-colors flex-shrink-0">✕</button>
                  </>
                ) : (() => {
                  const optObj = typeof opt === 'string' ? { value: opt, price: '', disabled: false } : opt
                  return (
                    <>
                      <input type="text" value={optObj.value} onChange={e => updateOption(vi, oi, { ...optObj, value: e.target.value })}
                        placeholder="Option value" className="flex-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                      <input type="text" value={optObj.price ?? ''} onChange={e => updateOption(vi, oi, { ...optObj, price: e.target.value })}
                        placeholder="Price (optional)" className="w-28 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                      <button type="button" title={optObj.disabled ? 'Mark as available' : 'Mark as out of stock'}
                        onClick={() => updateOption(vi, oi, { ...optObj, disabled: !optObj.disabled })}
                        className={`w-[72px] text-center py-1.5 rounded-lg text-xs font-semibold border transition-colors flex-shrink-0 ${optObj.disabled ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'text-slate-500 border-white/10 hover:text-amber-400 hover:border-amber-500/30'}`}>
                        {optObj.disabled ? 'OOS' : 'In Stock'}
                      </button>
                      <button type="button" onClick={() => removeOption(vi, oi)}
                        className="text-slate-500 hover:text-red-400 text-xs px-1 transition-colors">✕</button>
                    </>
                  )
                })()}
              </div>
            ))}
            <button type="button" onClick={() => addOption(vi)}
              className="text-xs text-sky-400 hover:text-sky-300 transition-colors">
              + Add option
            </button>
          </div>
        </div>
      ))}

      {variants.length === 0 && (
        <p className="text-slate-600 text-xs italic">No variants yet. Click "Add Variant" to create one.</p>
      )}
    </div>
  )
}

/* ── Product Form ── */
function ProductForm({ initial, onSave, onCancel, allProducts }) {
  const [form, setForm] = useState(initial || BLANK_PRODUCT)
  const [customCategory, setCustomCategory] = useState('')
  const [useCustom, setUseCustom] = useState(initial ? !CATEGORIES.includes(initial.category) : false)

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const category = useCustom ? customCategory.trim() : form.category
    if (!form.name.trim() || !category) return
    onSave({ ...form, category })
  }

  const previewProduct = {
    ...form,
    category: useCustom ? customCategory || form.category : form.category,
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Product Name *</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Category *</label>
            {useCustom ? (
              <input type="text" value={customCategory} onChange={e => setCustomCategory(e.target.value)}
                placeholder="Custom category"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
            ) : (
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0a1020] border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors">
                {[...new Set([...CATEGORIES, ...allProducts.map(p => p.category)])].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
            <button type="button" onClick={() => { setUseCustom(!useCustom); setCustomCategory('') }}
              className="text-xs text-sky-400 mt-1 hover:text-sky-300 transition-colors">
              {useCustom ? '← Use existing' : '+ Custom category'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Emoji</label>
            <input type="text" value={form.emoji} onChange={e => set('emoji', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Price</label>
            <input type="text" value={form.price} onChange={e => set('price', e.target.value)}
              placeholder="e.g. LKR 450+"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
            <input type="text" value={form.img} onChange={e => set('img', e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors resize-none" />
          </div>
        </div>

        <VariantBuilder variants={form.variants} onChange={v => set('variants', v)} />

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn">
            Save Product
          </button>
          <button type="button" onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold glass border border-white/10 text-slate-300 hover:border-white/20 transition-colors">
            Cancel
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live Preview</p>
        <div className="max-w-xs">
          <ProductCard product={previewProduct} />
        </div>
      </div>
    </div>
  )
}

/* ── Featured Picker ── */
function FeaturedPicker({ products, featuredIds, onSave }) {
  const [selected, setSelected] = useState(new Set(featuredIds))

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (next.size >= 4) return prev
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Featured Products</h3>
          <p className="text-slate-500 text-sm">Select up to 4 products to feature on the homepage.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-bold border ${selected.size >= 4 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-sky-500/20 text-sky-400 border-sky-500/30'}`}>
            {selected.size}/4 selected
          </span>
          <button onClick={() => onSave([...selected])}
            className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn text-sm">
            Save Featured
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(p => {
          const isSelected = selected.has(p.id)
          const isDisabled = !isSelected && selected.size >= 4
          return (
            <div key={p.id} onClick={() => !isDisabled && toggle(p.id)}
              className={`relative glass-card overflow-hidden cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-sky-500 ring-offset-2 ring-offset-[#020810]' : isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:ring-1 hover:ring-white/20'}`}>
              <div className="h-28 relative overflow-hidden">
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sky-900/40 to-blue-900/40 flex items-center justify-center text-4xl">
                    {p.emoji}
                  </div>
                )}
                {isSelected && (
                  <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-white text-xs font-semibold line-clamp-1">{p.name}</p>
                <p className="text-slate-500 text-xs">{p.category}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Main Admin Panel ── */
function AdminPanel() {
  const { products, featuredIds, addProduct, updateProduct, deleteProduct, setFeatured } = useProducts()
  const navigate = useNavigate()
  const [tab, setTab] = useState('list')
  const [editProduct, setEditProduct] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = (id) => {
    const product = products.find(p => p.id === id)
    if (!product) return
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      deleteProduct(id)
      showToast(`"${product.name}" deleted`)
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setTab('form')
  }

  const handleAddNew = () => {
    setEditProduct(null)
    setTab('form')
  }

  const handleSave = (data) => {
    if (editProduct) {
      updateProduct(editProduct.id, data)
      showToast(`"${data.name}" updated`)
    } else {
      addProduct(data)
      showToast(`"${data.name}" added`)
    }
    setTab('list')
    setEditProduct(null)
  }

  const handleSaveFeatured = (ids) => {
    // clear all, then set new ones
    products.forEach(p => setFeatured(p.id, false))
    ids.forEach(id => setFeatured(id, true))
    showToast('Featured products saved')
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: '#020810' }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black gradient-text">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Manage products, variants, and featured items.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl text-sm font-semibold glass border border-white/10 text-slate-300 hover:border-white/20 transition-colors">
              ← Back to Site
            </button>
            <button onClick={() => { sessionStorage.removeItem(AUTH_KEY); window.location.reload() }}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
              Log Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/8 pb-0">
          {[
            { id: 'list',     label: `Products (${products.length})` },
            { id: 'form',     label: editProduct ? `Edit: ${editProduct.name.slice(0,20)}` : 'Add Product' },
            { id: 'featured', label: 'Featured' },
          ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== 'form') setEditProduct(null) }}
              className={`px-5 py-3 text-sm font-semibold rounded-t-xl transition-colors relative -mb-px ${tab === t.id ? 'text-sky-400 border-b-2 border-sky-500 bg-sky-500/5' : 'text-slate-500 hover:text-slate-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card p-6">
          {tab === 'list' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-400 text-sm">{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
                <button onClick={handleAddNew}
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn text-sm">
                  + Add New Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="text-left py-3 px-3">Product</th>
                      <th className="text-left py-3 px-3">Category</th>
                      <th className="text-left py-3 px-3">Price</th>
                      <th className="text-center py-3 px-3">Featured</th>
                      <th className="text-right py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-white/3 transition-colors group">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{p.emoji}</span>
                            <div>
                              <p className="text-white font-medium">{p.name}</p>
                              <p className="text-slate-600 text-xs line-clamp-1">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-sky-500/15 text-sky-400 border border-sky-500/20">{p.category}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-300">{p.price}</td>
                        <td className="py-3 px-3 text-center">
                          <button onClick={() => setFeatured(p.id, !featuredIds.includes(p.id))}
                            title={featuredIds.includes(p.id) ? 'Remove from featured' : featuredIds.length >= 4 ? 'Max 4 featured' : 'Add to featured'}
                            className={`text-lg transition-all ${featuredIds.includes(p.id) ? 'text-amber-400' : 'text-slate-700 hover:text-slate-500'} ${!featuredIds.includes(p.id) && featuredIds.length >= 4 ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            ★
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => handleEdit(p)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/20 hover:bg-sky-500/25 transition-colors">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(p.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'form' && (
            <div>
              <h2 className="text-lg font-bold text-white mb-6">
                {editProduct ? `Edit: ${editProduct.name}` : 'Add New Product'}
              </h2>
              <ProductForm
                key={editProduct?.id ?? 'new'}
                initial={editProduct}
                allProducts={products}
                onSave={handleSave}
                onCancel={() => { setTab('list'); setEditProduct(null) }}
              />
            </div>
          )}

          {tab === 'featured' && (
            <FeaturedPicker products={products} featuredIds={featuredIds} onSave={handleSaveFeatured} />
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl font-semibold text-sm shadow-xl ${toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

/* ── Admin (route) ── */
export default function Admin() {
  const [authed, setAuthed] = useState(sessionStorage.getItem(AUTH_KEY) === 'true')

  if (!authed) return <PinScreen onAuth={() => setAuthed(true)} />
  return <AdminPanel />
}
