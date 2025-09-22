"use client"

import { useEffect, useState } from "react"

interface Leaf {
  id: number
  x: number
  y: number
  rotation: number
  speed: number
  size: number
  opacity: number
  type: string
}

const leafTypes = ["🍃", "🍂", "🌿", "🍁"]

export function FallingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Đảm bảo component chỉ render trên client
    setIsClient(true)
    
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Initialize leaves
    const initialLeaves: Leaf[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      rotation: Math.random() * 360,
      speed: 0.5 + Math.random() * 1.5,
      size: 0.6 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.4,
      type: leafTypes[Math.floor(Math.random() * leafTypes.length)],
    }))
    setLeaves(initialLeaves)

    const animateLeaves = () => {
      setLeaves((prevLeaves) =>
        prevLeaves.map((leaf) => {
          let newY = leaf.y + leaf.speed
          let newX = leaf.x + Math.sin(newY * 0.01) * 0.8
          const newRotation = leaf.rotation + 1.5

          // Reset leaf when it goes off screen
          if (newY > windowSize.height + 50) {
            newY = -50
            newX = Math.random() * windowSize.width
          }

          // Keep leaves within screen bounds horizontally
          if (newX < -50) newX = windowSize.width + 50
          if (newX > windowSize.width + 50) newX = -50

          return {
            ...leaf,
            x: newX,
            y: newY,
            rotation: newRotation,
          }
        }),
      )
    }

    const interval = setInterval(animateLeaves, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [windowSize.width, windowSize.height])

  // Không render gì cả trong lần đầu tiên (server-side)
  if (!isClient) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.size})`,
            opacity: leaf.opacity,
            fontSize: "20px",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          {leaf.type}
        </div>
      ))}
    </div>
  )
}
