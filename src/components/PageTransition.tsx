import { AnimatePresence, AnimationProps, motion } from "framer-motion"
import { useLocation } from "@reach/router"
import React from "react"
import { removeTrailingSlash } from "../util/helpers"

export interface PageTransitionProps {}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Page transitions
  const location = useLocation()
  const exitDuration = 0.5
  const enterY = 90
  const enterStiffness = 70

  const variants: AnimationProps["variants"] = {
    initial: {
      opacity: 0,
      y: enterY,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        type: "spring",
        stiffness: enterStiffness,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: exitDuration,
        type: "tween",
      },
    },
  }

  const onExitComplete = () => {
    let { hash } = location
    // Disable smooth scrolling
    document.documentElement.style.scrollBehavior = "auto"

    if (hash) {
      // Scroll to hash
      const element = document.getElementById(hash.replace("#", ""))
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - enterY
      window.scrollTo({ top: y })
    } else {
      // Scroll to top
      window.scrollTo({ top: 0 })
    }

    // Reset smooth scrolling
    document.documentElement.style.scrollBehavior = ""
  }

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={onExitComplete}>
      <motion.div
        key={removeTrailingSlash(location.pathname)}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
