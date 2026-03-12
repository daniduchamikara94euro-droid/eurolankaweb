'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    document.body.style.cursor = 'none'
    const onMove = (e) => {
      if (dot.current)  dot.current.style.transform  = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      if (ring.current) ring.current.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`
    }
    const onOver = (e) => setHovering(!!e.target.closest('a, button, [data-hover]'))

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: hovering ? 0.4 : 1, width: hovering ? '12px' : '8px', height: hovering ? '12px' : '8px' }} />
      <div ref={ring} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}
