import { Icon } from "@chakra-ui/icons"
import React from "react"

const ArrowIcon = props => {
  return (
    <Icon viewBox="0 0 22 22" {...props}>
      <g>
        <g fill="currentColor">
          <path d="M22 22H0V0h22zM.94 21.06h20.12V.94H.94z" />
          <path d="M14.02 8.18L16.84 11l-2.82 2.83V8.18z" />
          <path d="M5.16 10.53h9.7v.94h-9.7z" />
        </g>
      </g>
    </Icon>
  )
}

export default ArrowIcon
