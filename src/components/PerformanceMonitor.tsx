"use client"

import { useEffect, useState } from 'react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fcp?: number
    lcp?: number
    fid?: number
    cls?: number
  }>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: Math.round(entry.startTime) }))
        }
        
        if (entry.entryType === 'first-input') {
          setMetrics(prev => ({ ...prev, fid: Math.round((entry as any).processingStart - entry.startTime) }))
        }
        
        if (entry.entryType === 'layout-shift') {
          if (!(entry as any).hadRecentInput) {
            setMetrics(prev => ({ 
              ...prev, 
              cls: Math.round(((prev.cls || 0) + (entry as any).value) * 1000) / 1000 
            }))
          }
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Some browsers don't support all entry types
    }

    return () => observer.disconnect()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || Object.keys(metrics).length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm border border-white/20">
      <div className="font-bold mb-1">Performance</div>
      {metrics.fcp && <div>FCP: {metrics.fcp}ms</div>}
      {metrics.lcp && <div>LCP: {metrics.lcp}ms</div>}
      {metrics.fid && <div>FID: {metrics.fid}ms</div>}
      {metrics.cls && <div>CLS: {metrics.cls}</div>}
    </div>
  )
}
