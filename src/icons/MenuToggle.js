import { Icon } from "@chakra-ui/icons"
import { motion } from "framer-motion"
import React from "react"

const MenuToggleIcon = props => {
  const { animate, transition, ...otherProps } = props
  return (
    <Icon viewBox="0 0 39.5 39.5" {...otherProps}>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="menu" stroke="currentColor" strokeWidth="1.5">
          <motion.path
            animate={animate}
            transition={transition}
            d="M19.75,11.56 L19.75,27.94 M11.56,19.75 L27.94,19.75"
          />
          <polygon points="0.75 0.75 38.75 0.75 38.75 38.75 0.75 38.75" />
        </g>
      </g>
    </Icon>
  )
}

export default MenuToggleIcon
