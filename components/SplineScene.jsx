'use client'
import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-purple-500/20 border-b-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
    </div>
  )
}

export default function SplineScene({ scene, className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<SplineLoader />}>
        <Spline scene={scene} />
      </Suspense>
    </div>
  )
}
