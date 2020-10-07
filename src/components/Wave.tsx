/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { buildPath } from '../lib/buildPath'
import { mapRange } from '../lib/mapRange'

type WaveProps = {
  height?: number
  width?: number
  amplitude?: number
  speed?: number
  points?: number
  isPaused?: boolean
  fill?: string
  // type? todo: find correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any
  id?: string
  className?: string
}

const Wave: React.FC<WaveProps> = ({
  height = 20,
  width = 20,
  amplitude = 50,
  speed = 0.15,
  points = 3,
  isPaused = false,
  fill = '#fff',
  children = null,
  style = {},
  className = 'wave',
}) => {
  const [path, setPath] = useState('')
  // type? todo: find correct type for containerRef
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>({
    offsetWidth: width,
    offsetHeight: height,
  })
  const lastUpdateRef = useRef(0)
  const elapsedRef = useRef(0)
  const stepRef = useRef(0)
  const frameId = useRef(0)
  const mouseY = useRef(amplitude)
  const mouseX = useRef(0)

  const waveWidth = containerRef.current.offsetWidth
  const waveHeight = containerRef.current.offsetHeight

  const wavePoints = useCallback(calcWavePoints, [calcWavePoints])
  const redraw = useCallback(calcPath, [calcPath])
  const draw = useCallback(calcDraw, [calcDraw])
  const resume = useCallback(resumeAnimation, [resumeAnimation])
  const update = useCallback(updateAnimation, [updateAnimation])

  useEffect(() => {
    if (!frameId.current) {
      resume()
    }
    return () => {
      window.cancelAnimationFrame(frameId.current)
      frameId.current = 0
    }
  }, [resume])

  function calcWavePoints(): { x: number; y: number }[] {
    const newPoints = []
    for (let i = 0; i <= Math.max(points, 1); i += 1) {
      const scale = 100
      const x = (i / (points * mouseX.current)) * waveWidth
      const percPoints = i + (i % points)
      const seed = (stepRef.current + percPoints) * speed * scale
      const calcHeight = Math.sin(seed / scale) * scale * mouseY.current
      const y = Math.sin(seed / scale) * calcHeight + height
      newPoints.push({ x, y })
    }
    return newPoints
  }

  function calcPath() {
    setPath(
      buildPath({
        points: wavePoints(),
        waveWidth,
        waveHeight,
      })
    )
  }

  function calcDraw() {
    if (!isPaused) {
      const now = Number(new Date())
      elapsedRef.current += now - lastUpdateRef.current
      lastUpdateRef.current = now
    }
    const scale = 1000
    stepRef.current = (elapsedRef.current * Math.PI) / scale
    redraw()
  }

  function onMove({ clientX, clientY }: { clientX: number; clientY: number }) {
    mouseX.current = mapRange({
      value: clientX,
      inMin: 0,
      inMax: waveWidth,
      outMin: 0.01,
      outMax: 1,
      decimals: 4,
    })
    mouseY.current = mapRange({
      value: clientY,
      inMin: 0,
      inMax: waveHeight,
      outMin: 0,
      outMax: 1,
      decimals: 4,
    })
  }

  function updateAnimation() {
    draw()
    if (frameId.current) {
      resume()
    }
  }

  function resumeAnimation() {
    frameId.current = window.requestAnimationFrame(update)
    lastUpdateRef.current = Number(new Date())
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'inline-block',
        ...style,
      }}
      className={className}
      ref={containerRef}
      onMouseMove={onMove}
    >
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children && children}
        <path
          d={path}
          fill={fill}
          points={points.toString()}
          width={waveWidth}
          height={waveHeight}
        />
      </svg>
    </div>
  )
}

export default Wave
