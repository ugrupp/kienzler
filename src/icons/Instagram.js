import { Icon } from "@chakra-ui/icons"
import React from "react"

const InstagramIcon = props => {
  return (
    <Icon viewBox="0 0 31.5 31.5" {...props}>
      <g>
        <path
          fill="white"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M.75.75h30v30h-30z"
        />
        <circle cx="19.77" cy="11.68" r=".94" fill="currentColor" />
        <circle
          cx="15.75"
          cy="15.75"
          r="3.34"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
        <rect
          x="9.06"
          y="8.87"
          width="13.39"
          height="13.76"
          rx="3.54"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        />
      </g>
    </Icon>
  )
}

export default InstagramIcon
