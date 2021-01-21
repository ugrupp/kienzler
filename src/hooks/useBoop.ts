import { Transition } from "framer-motion"
import React from "react"

interface BoopProps {
  rotate?: number | number[]
  scale?: number | number[]
  x?: number | number[]
  y?: number | number[]
  timing?: number
  transition?: Transition
}

interface BoopAnimation {
  rotate: number | number[]
  scale: number | number[]
  x: number | number[]
  y: number | number[]
}

type BoopTrigger = () => void

function useBoop({
  x = 0,
  y = 0,
  rotate = 0,
  scale = 1,
  timing = 150,
  transition = {
    type: "spring",
    stiffness: 400,
  },
}: BoopProps): [BoopAnimation, Transition, BoopTrigger] {
  const [isBooped, setIsBooped] = React.useState(false)

  // Animation
  const animate: BoopAnimation = isBooped
    ? {
        rotate,
        scale,
        x,
        y,
      }
    : {
        rotate: 0,
        scale: 1,
        x: 0,
        y: 0,
      }

  // Timing
  React.useEffect(() => {
    if (!isBooped) {
      return
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  // Trigger
  const trigger: BoopTrigger = React.useCallback(() => {
    setIsBooped(true)
  }, [])

  return [animate, transition, trigger]
}
export default useBoop
