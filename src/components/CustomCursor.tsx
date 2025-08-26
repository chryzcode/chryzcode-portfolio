"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const rafRef = useRef<number>()
  const lastMouseTime = useRef(0)
  const isHoveringRef = useRef(false)

  // Throttled mouse position update
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseTime.current < 16) return // 60fps throttling
    
    lastMouseTime.current = now
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    })
  }, [])

  // Optimized hover detection
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target) return
    
    const isInteractive = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' || 
                         target.classList.contains('cursor-pointer') ||
                         target.closest('a, button, [role="button"]')
    
    if (isInteractive && !isHoveringRef.current) {
      isHoveringRef.current = true
      setIsHovering(true)
    }
  }, [])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target) return
    
    const isInteractive = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' || 
                         target.classList.contains('cursor-pointer') ||
                         target.closest('a, button, [role="button"]')
    
    if (isInteractive && isHoveringRef.current) {
      isHoveringRef.current = false
      setIsHovering(false)
    }
  }, [])

  // Optimized click handlers
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  // Hide cursor when leaving window
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])

  useEffect(() => {
    // Add passive listeners for better performance
    const options = { passive: true }
    
    window.addEventListener('mousemove', updateMousePosition, options)
    window.addEventListener('mousedown', handleMouseDown, options)
    window.addEventListener('mouseup', handleMouseUp, options)
    window.addEventListener('mouseover', handleMouseOver, options)
    window.addEventListener('mouseout', handleMouseOut, options)
    window.addEventListener('mouseleave', handleMouseLeave, options)
    window.addEventListener('mouseenter', handleMouseEnter, options)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [updateMousePosition, handleMouseDown, handleMouseUp, handleMouseOver, handleMouseOut, handleMouseLeave, handleMouseEnter])

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <>
      {/* Main cursor - optimized with will-change */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.3,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>

      {/* Cursor outline - optimized */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 0.6 : isHovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.4,
        }}
      >
        <div className="w-10 h-10 border-2 border-white/30 rounded-full" />
      </motion.div>

      {/* Cursor trail - optimized with reduced complexity */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 40,
          mass: 0.1,
        }}
      >
        <div className="w-1 h-1 bg-white/60 rounded-full" />
      </motion.div>
    </>
  )
}
