import { motion, useReducedMotion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  goal: number
  label: string
}

function computePercent(value: number, goal: number): number {
  if (goal <= 0 || value <= 0) return 0
  return Math.min(100, Math.round((value / goal) * 100))
}

export function ProgressBar({ value, goal, label }: ProgressBarProps) {
  const percent = computePercent(value, goal)
  const reduceMotion = useReducedMotion()

  const fill =
    reduceMotion || !('IntersectionObserver' in window)
      ? { width: `${percent}%` }
      : { initial: { width: 0 }, animate: { width: `${percent}%` } }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-brand-800/90">{label}</span>
        <span className="font-bold text-brand-800">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
        className="h-4 w-full overflow-hidden rounded bg-brand-100"
      >
        <motion.div
          className="h-full rounded bg-cta"
          initial="initial"
          animate="animate"
          transition={{ duration: 1.4, ease: 'easeOut' }}
          {...fill}
        />
      </div>
    </div>
  )
}
