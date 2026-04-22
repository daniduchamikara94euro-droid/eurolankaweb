'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useProducts } from '@/context/ProductsContext'
import ProductCard from '@/components/ProductCard'

const ADMIN_PIN = 'admin2024'
const AUTH_KEY = 'elw_admin_auth'
const CATEGORIES = ['Handles', 'Hinges', 'Slides', 'Fittings', 'Legs', 'Locks']

const BLANK_PRODUCT = {
  name: '', category: 'Handles', emoji: '🪝', price: '', img: '', description: '', variants: []
}

const getOptValue = (opt) => typeof opt === 'string' ? opt : opt.value

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
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="Enter PIN"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-center text-xl tracking-widest focus:outline-none focus:border-sky-500/60 transition-colors" autoFocus />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="glow-btn w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600">Unlock</button>
        </form>
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>
    </div>
  )
}

/* ── Compact image picker for variant options ── */
function VariantImagePicker({ value, onChange }) {
  const [mode, setMode] = useState(null) // null | 'upload' | 'url'
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const processFile = async (file) => {
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const blob = await cropToBlob(file)
      const fd = new FormData()
      fd.append('file', blob, 'variant.jpg')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
      setMode(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  // collapsed: show thumbnail or "add image" pill
  if (mode === null) {
    return (
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        {value ? (
          <>
            <img src={value} alt="" className="w-8 h-6 object-cover rounded border border-white/10 flex-shrink-0" />
            <button type="button" onClick={() => setMode('upload')}
              className="text-xs text-slate-500 hover:text-sky-400 transition-colors truncate">change</button>
            <button type="button" onClick={() => onChange('')}
              className="text-slate-600 hover:text-red-400 text-xs transition-colors flex-shrink-0">✕</button>
          </>
        ) : (
          <button type="button" onClick={() => setMode('upload')}
            className="px-2 py-1 rounded-lg text-xs border border-dashed border-white/15 text-slate-500 hover:border-sky-500/40 hover:text-sky-400 transition-colors whitespace-nowrap">
            + image
          </button>
        )}
      </div>
    )
  }

  // expanded: upload or url panel
  return (
    <div className="col-span-full mt-1 space-y-1.5">
      <div className="flex gap-2 items-center">
        <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs">
          <button type="button" onClick={() => setMode('upload')}
            className={`px-2.5 py-1 transition-colors ${mode === 'upload' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}>
            Upload
          </button>
          <button type="button" onClick={() => setMode('url')}
            className={`px-2.5 py-1 transition-colors ${mode === 'url' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'}`}>
            URL
          </button>
        </div>
        <button type="button" onClick={() => setMode(null)} className="text-slate-600 hover:text-slate-400 text-xs transition-colors">cancel</button>
      </div>

      {mode === 'upload' ? (
        <div
          onClick={() => !busy && inputRef.current?.click()}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg border border-dashed cursor-pointer transition-colors ${busy ? 'cursor-wait border-sky-500/40 bg-sky-500/5' : 'border-white/15 hover:border-sky-500/40 bg-white/3'}`}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { processFile(e.target.files[0]); e.target.value = '' }} />
          {busy ? (
            <>
              <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <span className="text-sky-400 text-xs">Uploading…</span>
            </>
          ) : (
            <>
              <span className="text-lg">🖼️</span>
              <span className="text-slate-400 text-xs">Click to pick image — auto-cropped to {CARD_W}×{CARD_H}</span>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <input type="text" defaultValue={value} placeholder="https://..."
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60"
            onBlur={e => { onChange(e.target.value); setMode(null) }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onChange(e.target.value); setMode(null) } }}
            autoFocus
          />
          <span className="text-slate-600 text-xs whitespace-nowrap">Enter to save</span>
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

/* ── Variant Builder ── */
function VariantBuilder({ variants, onChange }) {
  const [expandedColors, setExpandedColors] = useState(new Set())

  const addVariant = () => onChange([...variants, { name: '', type: 'color', options: [] }])
  const removeVariant = (vi) => onChange(variants.filter((_, i) => i !== vi))
  const updateVariant = (vi, field, val) => {
    const next = variants.map((v, i) => i === vi ? { ...v, [field]: val } : v)
    if (field === 'type') next[vi].options = []
    onChange(next)
  }
  const addOption = (vi) => {
    const v = variants[vi]
    const newOpt = v.type === 'color'
      ? { label: '', hex: '#888888', img: '', price: '', disabled: false }
      : { value: '', price: '', disabled: false, colors: [] }
    onChange(variants.map((vv, i) => i === vi ? { ...vv, options: [...vv.options, newOpt] } : vv))
  }
  const removeOption = (vi, oi) => onChange(variants.map((vv, i) => i === vi ? { ...vv, options: vv.options.filter((_, j) => j !== oi) } : vv))
  const updateOption = (vi, oi, val) => onChange(variants.map((vv, i) => i === vi ? { ...vv, options: vv.options.map((o, j) => j === oi ? val : o) } : vv))

  const toggleExpandColors = (vi, oi) => {
    const key = `${vi}-${oi}`
    setExpandedColors(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }
  const addSubColor = (vi, oi, optObj) => {
    const newColor = { label: '', hex: '', price: '', img: '', disabled: false }
    updateOption(vi, oi, { ...optObj, colors: [...(optObj.colors || []), newColor] })
    setExpandedColors(prev => new Set(prev).add(`${vi}-${oi}`))
  }
  const updateSubColor = (vi, oi, ci, optObj, val) => {
    const colors = [...(optObj.colors || [])]
    colors[ci] = val
    updateOption(vi, oi, { ...optObj, colors })
  }
  const removeSubColor = (vi, oi, ci, optObj) => {
    const colors = (optObj.colors || []).filter((_, j) => j !== ci)
    updateOption(vi, oi, { ...optObj, colors })
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
            <input type="text" value={v.name} onChange={e => updateVariant(vi, 'name', e.target.value)}
              placeholder="Variant name (e.g. Finish)"
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500/60" />
            <select value={v.type} onChange={e => updateVariant(vi, 'type', e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#0a1020] border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500/60">
              <option value="color" className="bg-[#0a1020] text-white">Color</option>
              <option value="size" className="bg-[#0a1020] text-white">Size</option>
              <option value="type" className="bg-[#0a1020] text-white">Type</option>
            </select>
            <button type="button" onClick={() => removeVariant(vi)}
              className="px-3 py-2 rounded-lg text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
              Remove
            </button>
          </div>

          <div className="space-y-2 pl-2">
            {v.options.map((opt, oi) => {
              if (v.type === 'color') {
                return (
                  <div key={oi} className="flex flex-wrap gap-2 items-center">
                    <input type="text" value={opt.label} onChange={e => updateOption(vi, oi, { ...opt, label: e.target.value })}
                      placeholder="Label" className="w-20 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60 flex-shrink-0" />
                    <input type="color" value={opt.hex} onChange={e => updateOption(vi, oi, { ...opt, hex: e.target.value })}
                      className="w-8 h-[30px] rounded cursor-pointer bg-transparent border border-white/10 flex-shrink-0" title="Hex color" />
                    <VariantImagePicker value={opt.img ?? ''} onChange={val => updateOption(vi, oi, { ...opt, img: val })} />
                    <input type="text" value={opt.price ?? ''} onChange={e => updateOption(vi, oi, { ...opt, price: e.target.value })}
                      placeholder="Price" className="w-20 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60 flex-shrink-0" />
                    <button type="button" title={opt.disabled ? 'Mark as available' : 'Mark as out of stock'}
                      onClick={() => updateOption(vi, oi, { ...opt, disabled: !opt.disabled })}
                      className={`w-[72px] text-center py-1.5 rounded-lg text-xs font-semibold border transition-colors flex-shrink-0 ${opt.disabled ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'text-slate-500 border-white/10 hover:text-amber-400 hover:border-amber-500/30'}`}>
                      {opt.disabled ? 'OOS' : 'In Stock'}
                    </button>
                    <button type="button" onClick={() => removeOption(vi, oi)}
                      className="text-slate-500 hover:text-red-400 text-xs px-1 transition-colors flex-shrink-0">✕</button>
                  </div>
                )
              }
              // size / type options — support nested sub-colors
              const optObj = typeof opt === 'string' ? { value: opt, price: '', disabled: false, colors: [] } : { colors: [], ...opt }
              const hasSubs = optObj.colors.length > 0
              const isExpanded = expandedColors.has(`${vi}-${oi}`) || hasSubs
              return (
                <div key={oi} className="border border-white/8 rounded-xl p-3 space-y-2.5">
                  {/* main row */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <input type="text" value={optObj.value} onChange={e => updateOption(vi, oi, { ...optObj, value: e.target.value })}
                      placeholder="Option value (e.g. 18mm)" className="flex-1 min-w-[90px] px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                    {!hasSubs && (
                      <input type="text" value={optObj.price ?? ''} onChange={e => updateOption(vi, oi, { ...optObj, price: e.target.value })}
                        placeholder="Price" className="w-24 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                    )}
                    <button type="button" title={optObj.disabled ? 'Mark as available' : 'Mark as out of stock'}
                      onClick={() => updateOption(vi, oi, { ...optObj, disabled: !optObj.disabled })}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex-shrink-0 ${optObj.disabled ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'text-slate-500 border-white/10 hover:text-amber-400 hover:border-amber-500/30'}`}>
                      {optObj.disabled ? 'OOS' : 'Stock'}
                    </button>
                    <button type="button" onClick={() => toggleExpandColors(vi, oi)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex-shrink-0 ${hasSubs ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' : 'text-slate-500 border-white/10 hover:text-purple-400 hover:border-purple-500/30'}`}>
                      {hasSubs ? `⊕ ${optObj.colors.length} sub-opt${optObj.colors.length !== 1 ? 's' : ''}` : '+ Sub-options'}
                    </button>
                    <button type="button" onClick={() => removeOption(vi, oi)}
                      className="text-slate-500 hover:text-red-400 text-xs px-1 transition-colors">✕</button>
                  </div>

                  {/* sub-options section */}
                  {isExpanded && (
                    <div className="pl-3 border-l-2 border-purple-500/20 space-y-2">
                      {optObj.colors.map((sc, ci) => (
                        <div key={ci} className="flex flex-wrap gap-1.5 items-center">
                          <input type="text" value={sc.label} onChange={e => updateSubColor(vi, oi, ci, optObj, { ...sc, label: e.target.value })}
                            placeholder="Option name" className="w-24 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                          {/* optional color dot */}
                          <div className="relative flex-shrink-0" title="Color indicator (optional)">
                            <input type="color" value={sc.hex || '#888888'} onChange={e => updateSubColor(vi, oi, ci, optObj, { ...sc, hex: e.target.value })}
                              className="w-7 h-7 rounded cursor-pointer bg-transparent border border-white/10 opacity-0 absolute inset-0" />
                            <div className="w-7 h-7 rounded border border-white/10 flex items-center justify-center pointer-events-none"
                              style={{ background: sc.hex || 'rgba(255,255,255,0.05)' }}>
                              {!sc.hex && <span className="text-slate-600 text-[10px]">●</span>}
                            </div>
                          </div>
                          <VariantImagePicker value={sc.img ?? ''} onChange={val => updateSubColor(vi, oi, ci, optObj, { ...sc, img: val })} />
                          <input type="text" value={sc.price ?? ''} onChange={e => updateSubColor(vi, oi, ci, optObj, { ...sc, price: e.target.value })}
                            placeholder="Price" className="w-20 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/60" />
                          <button type="button" onClick={() => updateSubColor(vi, oi, ci, optObj, { ...sc, disabled: !sc.disabled })}
                            className={`px-2 py-1 rounded-lg text-xs border transition-colors flex-shrink-0 ${sc.disabled ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'text-slate-500 border-white/10 hover:text-amber-400 hover:border-amber-500/30'}`}>
                            {sc.disabled ? 'OOS' : 'In Stock'}
                          </button>
                          <button type="button" onClick={() => removeSubColor(vi, oi, ci, optObj)}
                            className="text-slate-500 hover:text-red-400 text-xs transition-colors">✕</button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addSubColor(vi, oi, optObj)}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors">+ Add sub-option</button>
                      {hasSubs && (
                        <p className="text-[10px] text-slate-600 italic">Price set per sub-option — option-level price is ignored.</p>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            <button type="button" onClick={() => addOption(vi)} className="text-xs text-sky-400 hover:text-sky-300 transition-colors">
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

/* ── Image Uploader ── */
const MAX_FILE_MB = 10
const CARD_W = 600
const CARD_H = 450

// Crop to card dimensions client-side, then return a Blob ready for upload
function cropToBlob(file) {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      return reject(new Error(`File too large. Max ${MAX_FILE_MB} MB.`))
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Invalid image'))
      img.onload = () => {
        const srcRatio = img.width / img.height
        const dstRatio = CARD_W / CARD_H
        let sx, sy, sw, sh
        if (srcRatio > dstRatio) {
          sh = img.height; sw = sh * dstRatio; sy = 0; sx = (img.width - sw) / 2
        } else {
          sw = img.width; sh = sw / dstRatio; sx = 0; sy = (img.height - sh) / 2
        }
        const canvas = document.createElement('canvas')
        canvas.width = CARD_W; canvas.height = CARD_H
        canvas.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, CARD_W, CARD_H)
        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Canvas export failed')), 'image/jpeg', 0.80)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

function ImageUploader({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | cropping | uploading
  const [error, setError] = useState('')
  const [tab, setTab] = useState(!value || value.includes('blob.vercel-storage.com') ? 'upload' : 'url')
  const inputRef = useRef(null)

  const processFile = async (file) => {
    if (!file) return
    setError('')
    try {
      setStatus('cropping')
      const blob = await cropToBlob(file)

      setStatus('uploading')
      const fd = new FormData()
      fd.append('file', blob, 'product.jpg')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      onChange(data.url)
      setTab('upload')
    } catch (e) {
      setError(e.message)
    } finally {
      setStatus('idle')
    }
  }

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const busy = status !== 'idle'
  const statusLabel = status === 'cropping' ? 'Cropping & compressing…' : 'Uploading to Vercel Blob…'
  const isBlobUrl = value?.includes('blob.vercel-storage.com')

  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => setTab('upload')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${tab === 'upload' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'text-slate-500 border-white/10 hover:text-slate-300'}`}>
          Upload File
        </button>
        <button type="button" onClick={() => setTab('url')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${tab === 'url' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : 'text-slate-500 border-white/10 hover:text-slate-300'}`}>
          Image URL
        </button>
      </div>

      {tab === 'upload' ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !busy && inputRef.current?.click()}
          className={`relative rounded-xl border-2 border-dashed transition-colors ${busy ? 'cursor-wait' : 'cursor-pointer'} ${dragging ? 'border-sky-400 bg-sky-500/10' : 'border-white/15 hover:border-sky-500/50 bg-white/3'}`}
          style={{ minHeight: '110px' }}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { processFile(e.target.files[0]); e.target.value = '' }} />

          {busy ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sky-400 text-xs font-medium">{statusLabel}</span>
            </div>
          ) : value ? (
            <div className="flex items-center gap-4 p-3">
              <img src={value} alt="preview" className="w-20 h-16 object-cover rounded-lg border border-white/10 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium">{CARD_W}×{CARD_H}px · JPEG</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {isBlobUrl ? 'Stored on Vercel Blob · ' : ''}Click or drag to replace
                </p>
              </div>
              <button type="button" onClick={e => { e.stopPropagation(); onChange('') }}
                className="text-slate-500 hover:text-red-400 text-sm px-2 transition-colors flex-shrink-0">✕</button>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-4">
              <span className="text-3xl">🖼️</span>
              <p className="text-slate-400 text-xs font-medium">Click or drag & drop image</p>
              <p className="text-slate-600 text-xs">Auto-cropped to {CARD_W}×{CARD_H} · Max {MAX_FILE_MB} MB</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="https://..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors text-sm" />
          {value && (
            <img src={value} alt="preview" className="w-10 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0"
              onError={e => { e.target.style.display = 'none' }} />
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

/* ── Category Dropdown ── */
function CategoryDropdown({ value, onChange, allProducts, error }) {
  const [open, setOpen]     = useState(false)
  const [newCat, setNewCat] = useState('')
  const [categories, setCategories] = useState(() =>
    [...new Set([...CATEGORIES, ...allProducts.map(p => p.category).filter(Boolean)])]
  )
  const ref    = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const select = (cat) => { onChange(cat); setOpen(false) }

  const addCategory = () => {
    const cat = newCat.trim()
    if (!cat) return
    if (!categories.includes(cat)) setCategories(prev => [...prev, cat])
    select(cat)
    setNewCat('')
  }

  const deleteCategory = (e, cat) => {
    e.stopPropagation()
    setCategories(prev => prev.filter(c => c !== cat))
    if (value === cat) onChange(categories.filter(c => c !== cat)[0] || '')
  }

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className={`w-full px-4 py-2.5 rounded-xl bg-[#0a1020] border text-left flex items-center justify-between focus:outline-none transition-colors ${error ? 'border-red-500/60' : open ? 'border-sky-500/60' : 'border-white/10 hover:border-white/20'}`}>
        {value
          ? <span className="text-white text-sm">{value}</span>
          : <span className="text-slate-500 text-sm">Select category</span>}
        <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
          style={{ background: '#0d1526' }}>

          {/* category list */}
          <div className="max-h-44 overflow-y-auto py-1">
            {categories.length === 0 && (
              <p className="text-slate-600 text-xs text-center py-3">No categories yet</p>
            )}
            {categories.map(cat => (
              <div key={cat} onClick={() => select(cat)}
                className={`group flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors ${value === cat ? 'bg-sky-500/15' : 'hover:bg-white/5'}`}>
                <div className="flex items-center gap-2.5">
                  {value === cat
                    ? <svg className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    : <span className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span className={`text-sm ${value === cat ? 'text-sky-400 font-semibold' : 'text-slate-300'}`}>{cat}</span>
                </div>
                <button type="button" onClick={e => deleteCategory(e, cat)}
                  className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-all text-xs">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* divider + add new */}
          <div className="border-t border-white/8 px-3 py-2.5 flex gap-2">
            <input ref={inputRef} type="text" value={newCat}
              onChange={e => setNewCat(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCategory() } e.stopPropagation() }}
              onClick={e => e.stopPropagation()}
              placeholder="Add new category..."
              className="flex-1 px-3 py-1.5 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/60 border border-white/8 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
            <button type="button" onClick={addCategory}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-sky-400 border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 transition-colors whitespace-nowrap">
              + Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Product Form ── */
function ProductForm({ initial, onSave, onCancel, allProducts }) {
  const [form, setForm] = useState(initial || BLANK_PRODUCT)
  const [formErrors, setFormErrors] = useState({})

  const set = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e?.preventDefault?.()
    const errors = {}
    if (!form.name.trim()) errors.name = 'Product name is required'
    if (!form.category.trim()) errors.category = 'Category is required'
    if (Object.keys(errors).length) { setFormErrors(errors); return }
    setFormErrors({})
    onSave({ ...form })
  }

  const previewProduct = { ...form }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Product Name *</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-white focus:outline-none focus:border-sky-500/60 transition-colors ${formErrors.name ? 'border-red-500/60' : 'border-white/10'}`} />
            {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Category *</label>
            <CategoryDropdown
              value={form.category}
              onChange={val => set('category', val)}
              allProducts={allProducts}
              error={formErrors.category}
            />
            {formErrors.category && <p className="text-red-400 text-xs mt-1">{formErrors.category}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Emoji</label>
            <input type="text" value={form.emoji} onChange={e => set('emoji', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Price</label>
            <input type="text" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. LKR 450+"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Product Image</label>
            <ImageUploader value={form.img} onChange={val => set('img', val)} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-sky-500/60 transition-colors resize-none" />
          </div>
        </div>
        <VariantBuilder variants={form.variants} onChange={v => set('variants', v)} />
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={handleSubmit} className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn">Save Product</button>
          <button type="button" onClick={onCancel}
            className="px-6 py-3 rounded-xl font-semibold glass border border-white/10 text-slate-300 hover:border-white/20 transition-colors">Cancel</button>
        </div>
      </form>
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live Preview</p>
        <div className="max-w-xs pointer-events-none select-none"><ProductCard product={previewProduct} /></div>
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
      if (next.has(id)) { next.delete(id) } else { if (next.size >= 4) return prev; next.add(id) }
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
          <button onClick={() => onSave([...selected])
          } className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn text-sm">
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
                {p.img ? <img src={p.img} alt={p.name} className="w-full h-full object-cover" /> :
                  <div className="w-full h-full bg-gradient-to-br from-sky-900/40 to-blue-900/40 flex items-center justify-center text-4xl">{p.emoji}</div>}
                {isSelected && <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                </div>}
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

/* ── Gallery Manager ── */
const TOTAL_SLOTS = 16

function GalleryManager({ showToast }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [busySlot, setBusySlot] = useState(null)
  const [editingLabel, setEditingLabel] = useState(null)
  const fileRefs = useRef([])

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(({ images }) => { setImages(images || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const save = async (next) => {
    setImages(next)
    try {
      await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ images: next }) })
    } catch {}
  }

  const handleFile = async (file, slotIndex) => {
    if (!file) return
    setBusySlot(slotIndex)
    try {
      const fd = new FormData()
      fd.append('file', file, file.name)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      const defaultLabel = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
      const next = [...images]
      if (slotIndex < images.length) {
        next[slotIndex] = { ...next[slotIndex], img: data.url }
      } else {
        next.push({ label: defaultLabel, img: data.url })
      }
      await save(next)
      showToast('Photo uploaded')
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setBusySlot(null)
    }
  }

  const remove = async (i) => {
    const next = images.filter((_, idx) => idx !== i)
    await save(next)
    showToast('Photo removed')
  }

  const updateLabel = async (i, value) => {
    const next = images.map((img, idx) => idx === i ? { ...img, label: value } : img)
    await save(next)
    setEditingLabel(null)
  }

  if (loading) return <p className="text-slate-500 text-sm py-8 text-center">Loading gallery…</p>

  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => images[i] || null)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-white font-semibold">{images.length} / {TOTAL_SLOTS} photos uploaded</p>
          <p className="text-slate-500 text-xs mt-0.5">Click any empty slot to upload · Click a photo to replace it</p>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_SLOTS }, (_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i < images.length ? 'bg-sky-400' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {slots.map((item, i) => (
          <div key={i} className="aspect-square relative">
            {item ? (
              /* filled slot */
              <div className="w-full h-full rounded-2xl overflow-hidden relative group border border-white/10 hover:border-sky-500/40 transition-colors shadow-xl shadow-black/40">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover brightness-75 group-hover:brightness-95 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* label — click to edit */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {editingLabel === i ? (
                    <input
                      autoFocus
                      defaultValue={item.label}
                      className="w-full bg-black/60 border border-sky-500/60 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
                      onBlur={e => updateLabel(i, e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') updateLabel(i, e.target.value) }}
                    />
                  ) : (
                    <button
                      onClick={() => setEditingLabel(i)}
                      className="text-left w-full text-white text-xs font-semibold truncate hover:text-sky-300 transition-colors"
                      title="Click to edit label"
                    >
                      ✏️ {item.label || 'Add label'}
                    </button>
                  )}
                </div>

                {/* action buttons */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => fileRefs.current[i]?.click()}
                    className="w-7 h-7 rounded-full bg-sky-500/80 hover:bg-sky-500 text-white text-xs flex items-center justify-center"
                    title="Replace photo"
                  >↑</button>
                  <button
                    onClick={() => remove(i)}
                    className="w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 text-white text-xs flex items-center justify-center"
                    title="Remove photo"
                  >✕</button>
                </div>

                {/* slot number badge */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 text-slate-400 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </div>

                {busySlot === i && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                    <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              /* empty slot */
              <button
                type="button"
                onClick={() => fileRefs.current[i]?.click()}
                disabled={busySlot !== null}
                className="w-full h-full rounded-2xl border-2 border-dashed border-white/15 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200 flex flex-col items-center justify-center gap-2 group disabled:opacity-40"
              >
                {busySlot === i ? (
                  <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-sky-500/15 border border-white/10 group-hover:border-sky-500/30 flex items-center justify-center text-xl transition-all duration-200">
                      📷
                    </div>
                    <span className="text-slate-600 group-hover:text-sky-400 text-xs font-medium transition-colors">Slot {i + 1}</span>
                    <span className="text-slate-700 text-[10px]">Click to upload</span>
                  </>
                )}
              </button>
            )}

            <input
              ref={el => fileRefs.current[i] = el}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { handleFile(e.target.files[0], i); e.target.value = '' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Hero Slider Manager ── */
const BLANK_SLIDE = { img: '', title: '', subtitle: '', price: '', badge: '' }

function HeroManager({ showToast }) {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyIdx, setBusyIdx] = useState(null)
  const [saved, setSaved] = useState(false)
  const [active, setActive] = useState(0)
  const fileRefs = useRef([])

  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(({ hero }) => {
        setSlides(hero?.slides?.length ? hero.slides : [{ ...BLANK_SLIDE }])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const persist = async (next) => {
    setSlides(next)
    try {
      await fetch('/api/hero', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hero: { slides: next } }) })
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    } catch { showToast('Save failed', 'error') }
  }

  const uploadImg = async (file, idx) => {
    if (!file) return
    setBusyIdx(idx)
    try {
      const fd = new FormData(); fd.append('file', file, file.name)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      const next = slides.map((s, i) => i === idx ? { ...s, img: data.url } : s)
      await persist(next)
      showToast('Photo uploaded')
    } catch (e) { showToast(e.message, 'error') }
    finally { setBusyIdx(null) }
  }

  const setField = (idx, field, val) => setSlides(s => s.map((sl, i) => i === idx ? { ...sl, [field]: val } : sl))

  const addSlide = () => {
    if (slides.length >= 8) return showToast('Maximum 8 slides', 'error')
    const next = [...slides, { ...BLANK_SLIDE }]
    setSlides(next); setActive(next.length - 1)
  }

  const removeSlide = async (idx) => {
    if (slides.length <= 1) return showToast('Need at least 1 slide', 'error')
    const next = slides.filter((_, i) => i !== idx)
    setActive(Math.min(active, next.length - 1))
    await persist(next)
    showToast('Slide removed')
  }

  const moveSlide = async (idx, dir) => {
    const next = [...slides]
    const swap = idx + dir
    if (swap < 0 || swap >= next.length) return
    ;[next[idx], next[swap]] = [next[swap], next[idx]]
    setActive(swap)
    await persist(next)
  }

  if (loading) return <p className="text-slate-500 text-sm py-8 text-center">Loading…</p>

  const slide = slides[active] || BLANK_SLIDE

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-white font-semibold">Hero Slider — {slides.length} slide{slides.length !== 1 ? 's' : ''}</p>
          <p className="text-slate-500 text-xs mt-0.5">Auto-plays every 4 seconds on the home page</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addSlide}
            className="px-4 py-2 rounded-xl font-bold text-sky-400 border border-sky-500/30 hover:bg-sky-500/10 text-sm transition-colors">
            + Add Slide
          </button>
          <button onClick={() => persist(slides)}
            className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn text-sm">
            {saved ? '✓ Saved' : 'Save All'}
          </button>
        </div>
      </div>

      {/* slide tabs */}
      <div className="flex gap-2 flex-wrap">
        {slides.map((s, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${active === i ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : 'border-white/10 text-slate-500 hover:text-slate-300'}`}>
            {s.img
              ? <img src={s.img} className="w-5 h-5 rounded object-cover" alt="" />
              : <span className="w-5 h-5 rounded border border-dashed border-white/20 flex items-center justify-center text-[10px]">?</span>
            }
            Slide {i + 1}
            {i > 0 && <span className="opacity-40 hover:opacity-100 transition-opacity" onClick={e => { e.stopPropagation(); moveSlide(i, -1) }}>←</span>}
            {i < slides.length - 1 && <span className="opacity-40 hover:opacity-100 transition-opacity" onClick={e => { e.stopPropagation(); moveSlide(i, 1) }}>→</span>}
            <span className="text-red-400/50 hover:text-red-400 transition-colors" onClick={e => { e.stopPropagation(); removeSlide(i) }}>✕</span>
          </button>
        ))}
      </div>

      {/* editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl border border-white/8 p-6"
        style={{ background: 'rgba(255,255,255,0.02)' }}>

        {/* image upload spot */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slide {active + 1} — Image</p>
          <div
            className={`relative h-64 rounded-2xl overflow-hidden border-2 cursor-pointer group transition-all duration-200 ${slide.img ? 'border-white/10 hover:border-sky-500/40' : 'border-dashed border-white/15 hover:border-sky-500/50 hover:bg-sky-500/5'}`}
            onClick={() => busyIdx === null && fileRefs.current[active]?.click()}
          >
            {slide.img ? (
              <>
                <img src={slide.img} alt="" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {/* preview overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between mb-1">
                    {slide.badge && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-sky-300" style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.3)' }}>{slide.badge}</span>}
                    {slide.price && <span className="text-[10px] font-black text-amber-400">{slide.price}</span>}
                  </div>
                  {slide.title && <p className="text-white text-sm font-bold truncate">{slide.title}</p>}
                  {slide.subtitle && <p className="text-slate-400 text-[11px] truncate">{slide.subtitle}</p>}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/60 px-4 py-2 rounded-xl text-white text-sm font-semibold backdrop-blur-sm">📷 Replace Image</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                {busyIdx === active
                  ? <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                  : <>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">🖼️</div>
                      <p className="text-slate-500 text-sm font-medium">Click to upload photo</p>
                      <p className="text-slate-700 text-xs">JPG, PNG, WebP · Max 10MB</p>
                    </>
                }
              </div>
            )}
            {busyIdx === active && slide.img && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <input ref={el => fileRefs.current[active] = el} type="file" accept="image/*" className="hidden"
              onChange={e => { uploadImg(e.target.files[0], active); e.target.value = '' }} />
          </div>
        </div>

        {/* text fields */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slide {active + 1} — Details</p>
          <div className="space-y-3">
            {[
              { field: 'title',    placeholder: 'Product title  (e.g. Premium Cabinet Handles)', label: 'Title' },
              { field: 'subtitle', placeholder: 'Subtitle  (e.g. Stainless Steel · Brushed Finish)', label: 'Subtitle' },
              { field: 'price',    placeholder: 'Price  (e.g. LKR 450+)', label: 'Price' },
              { field: 'badge',    placeholder: 'Category badge  (e.g. Handles)', label: 'Badge' },
            ].map(({ field, placeholder, label }) => (
              <div key={field}>
                <label className="block text-[10px] text-slate-600 uppercase tracking-wider mb-1">{label}</label>
                <input
                  type="text"
                  value={slide[field] || ''}
                  onChange={e => setField(active, field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500/60 placeholder-slate-700"
                />
              </div>
            ))}
          </div>
          <div className="pt-2 p-4 rounded-xl border border-white/6 space-y-1" style={{ background: 'rgba(14,165,233,0.04)' }}>
            <p className="text-slate-600 text-xs font-semibold">Preview</p>
            <p className="text-white text-sm font-bold">{slide.title || '—'}</p>
            <p className="text-slate-500 text-xs">{slide.subtitle || '—'}</p>
            <div className="flex gap-2 mt-1">
              {slide.badge && <span className="text-sky-400 text-xs">[{slide.badge}]</span>}
              {slide.price && <span className="text-amber-400 text-xs font-bold">{slide.price}</span>}
            </div>
          </div>
        </div>
      </div>

      <p className="text-slate-700 text-xs text-center">Images save automatically on upload · Click "Save All" after editing text</p>
    </div>
  )
}

/* ── Main Admin Panel ── */
function AdminPanel() {
  const { products, featuredIds, addProduct, updateProduct, deleteProduct, setFeatured } = useProducts()
  const router = useRouter()
  const [tab, setTab] = useState('list')
  const [editProduct, setEditProduct] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }
  const handleDelete = (id) => {
    const product = products.find(p => p.id === id)
    if (!product) return
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) { deleteProduct(id); showToast(`"${product.name}" deleted`) }
  }
  const handleEdit = (product) => { setEditProduct(product); setTab('form') }
  const handleAddNew = () => { setEditProduct(null); setTab('form') }
  const handleSave = (data) => {
    if (editProduct) { updateProduct(editProduct.id, data); showToast(`"${data.name}" updated`) }
    else { addProduct(data); showToast(`"${data.name}" added`) }
    setTab('list'); setEditProduct(null)
  }
  const handleSaveFeatured = (ids) => {
    products.forEach(p => setFeatured(p.id, false))
    ids.forEach(id => setFeatured(id, true))
    showToast('Featured products saved')
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: '#020810' }}>
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black gradient-text">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Manage products, variants, and featured items.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/')}
              className="px-4 py-2 rounded-xl text-sm font-semibold glass border border-white/10 text-slate-300 hover:border-white/20 transition-colors">
              ← Back to Site
            </button>
            <button onClick={() => { sessionStorage.removeItem(AUTH_KEY); window.location.reload() }}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors">
              Log Out
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-white/8 pb-0">
          {[
            { id: 'list', label: `Products (${products.length})` },
            { id: 'form', label: editProduct ? `Edit: ${editProduct.name.slice(0, 20)}` : 'Add Product' },
            { id: 'featured', label: 'Featured' },
            { id: 'gallery', label: 'Collection Gallery' },
            { id: 'hero', label: 'Hero Cards' },
          ].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); if (t.id !== 'form') setEditProduct(null) }}
              className={`px-5 py-3 text-sm font-semibold rounded-t-xl transition-colors relative -mb-px ${tab === t.id ? 'text-sky-400 border-b-2 border-sky-500 bg-sky-500/5' : 'text-slate-500 hover:text-slate-300'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="glass-card p-6">
          {tab === 'list' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-400 text-sm">{products.length} product{products.length !== 1 ? 's' : ''} in catalog</p>
                <button onClick={handleAddNew} className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 glow-btn text-sm">+ Add New Product</button>
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
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-white/5">
                              {p.img
                                ? <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-xl">{p.emoji}</div>
                              }
                            </div>
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
                            <button onClick={() => handleEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/20 hover:bg-sky-500/25 transition-colors">Edit</button>
                            <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">Delete</button>
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
              <h2 className="text-lg font-bold text-white mb-6">{editProduct ? `Edit: ${editProduct.name}` : 'Add New Product'}</h2>
              <ProductForm key={editProduct?.id ?? 'new'} initial={editProduct} allProducts={products} onSave={handleSave}
                onCancel={() => { setTab('list'); setEditProduct(null) }} />
            </div>
          )}

          {tab === 'featured' && <FeaturedPicker products={products} featuredIds={featuredIds} onSave={handleSaveFeatured} />}
          {tab === 'gallery' && <GalleryManager showToast={showToast} />}
          {tab === 'hero' && <HeroManager showToast={showToast} />}
        </div>
      </div>

      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl font-semibold text-sm shadow-xl ${toast.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  useEffect(() => { setAuthed(sessionStorage.getItem(AUTH_KEY) === 'true') }, [])
  if (!authed) return <PinScreen onAuth={() => setAuthed(true)} />
  return <AdminPanel />
}
