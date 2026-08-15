import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

interface MetricCounterProps {
  value: number
  label: string
  prefix?: string
}

const formatter = new Intl.NumberFormat('es-MX')

export function MetricCounter({ value, label, prefix = '' }: MetricCounterProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduceMotion || !('IntersectionObserver' in window) || !inView) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return (
    <article ref={ref} className="flex flex-col gap-2">
      <p className="text-brand-800/90">{label}</p>
      <p className="text-3xl font-black text-brand-800 sm:text-4xl">
        <span aria-hidden="true">{prefix}{formatter.format(display)}</span>
        <span className="sr-only">{prefix}{formatter.format(value)}</span>
      </p>
    </article>
  )
}
