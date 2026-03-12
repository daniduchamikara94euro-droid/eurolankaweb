'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1800
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(Math.floor(p * 100))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 300)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center" style={{ background: '#020810' }}>
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute rounded-full pointer-events-none"
            style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="relative z-10 flex flex-col items-center gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center gap-4">
              <div className="relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  className="w-20 h-20 rounded-full"
                  style={{ border: '2px solid transparent', borderTopColor: '#0ea5e9', borderRightColor: 'rgba(14,165,233,0.2)', borderBottomColor: 'rgba(129,140,248,0.4)', borderLeftColor: '#818cf8' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-2 rounded-full"
                  style={{ border: '1.5px solid transparent', borderTopColor: 'rgba(168,85,247,0.6)', borderBottomColor: 'rgba(14,165,233,0.3)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/logo.png" alt="Euro Lanka" className="w-10 h-10 object-contain rounded-lg" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-black tracking-widest gradient-text uppercase">Euro Lanka</h1>
                <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] mt-1">Imported Design Excellence</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-3 w-56">
              <div className="w-full h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #0ea5e9, #818cf8, #a855f7)', boxShadow: '0 0 12px rgba(14,165,233,0.8)', transition: 'width 0.05s linear' }} />
              </div>
              <span className="text-slate-600 text-[10px] tabular-nums tracking-widest">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
