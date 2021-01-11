import { Icon } from "@chakra-ui/icons"
import React from "react"

const ArrowBoldIcon = props => {
  return (
    <Icon viewBox="0 0 23.5 23.5" {...props}>
      <path
        d="M22.75 22.75h-22v-22h22z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <path fill="currentColor" d="M14.77 8.9l2.82 2.82-2.82 2.83V8.9z" />
      <path
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="1.5"
        d="M5.88 11.73h9.7"
      />
    </Icon>
  )
}

export default ArrowBoldIcon
