import { Box, forwardRef } from "@chakra-ui/react"
import { isValidMotionProp, motion } from "framer-motion"
import React from "react"

// TODO: find solutions for ts-ignored stuff
export const MotionBox = motion.custom(
  // @ts-ignore
  forwardRef((props, ref) => {
    // @ts-ignore
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    )
    return <Box ref={ref} {...chakraProps} />
  })
)
