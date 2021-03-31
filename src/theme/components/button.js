// color schemes:
// - dark-orange
// - white-dark
// - white-orange

const button = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "none",
    textTransform: "uppercase",
    transitionDuration: "slow",
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  sizes: {
    sm: {
      fontSize: ["3xs", null, "2xs", "xs"],
    },
    md: {
      fontSize: ["2sm", null, "sm", "md"],
    },
  },
  defaultProps: {
    variant: "outline",
    colorScheme: "dark-orange",
  },
}

export default button

function variantSolid(props) {
  const { colorScheme: c } = props

  let color = undefined
  let bgColor = undefined
  let hoverColor = undefined
  let bgHoverColor = undefined

  // Special color schemes
  // TODO: globalize gray.x00 as default text color somewhere
  if (c === "dark-orange") {
    color = "white"
    bgColor = "gray.500"
    hoverColor = "white"
    bgHoverColor = "orange.500"
  } else if (c === "white-dark") {
    color = "gray.500"
    bgColor = "white"
    hoverColor = "white"
    bgHoverColor = "gray.500"
  } else if (c === "white-orange") {
    color = "gray.500"
    bgColor = "white"
    hoverColor = "white"
    bgHoverColor = "orange.500"
  }

  return {
    color,
    bg: bgColor,
    _hover: {
      color: hoverColor,
      bg: bgHoverColor,
    },
    _active: {
      color: hoverColor,
      bg: bgHoverColor,
    },
  }
}

function variantOutline(props) {
  const { colorScheme: c } = props

  let color = undefined
  let hoverColor = undefined

  // Special color schemes
  // TODO: globalize gray.800 as default text color somewhere
  if (c === "dark-orange") {
    color = "gray.500"
    hoverColor = "orange.500"
  } else if (c === "white-dark") {
    color = "white"
    hoverColor = "gray.500"
  } else if (c === "white-orange") {
    color = "white"
    hoverColor = "orange.500"
  }

  let pseudoBorderStyles = {
    content: "''",
    position: "absolute",
    width: "full",
    height: "1px",
    bottom: 0,
    right: 0,
    backgroundColor: "currentColor",
    transition: "transform 0.4s cubic-bezier(0.65, 0.005, 0.35, 0.995)",
  }

  return {
    color,
    border: "none",
    padding: 0,
    paddingBottom: 2,
    height: "auto",
    _hover: {
      bg: null,
      color: hoverColor,
      _before: {
        transform: "scaleX(1)",
        transitionDelay: "0.25s",
      },
      _after: {
        transform: "scaleX(0)",
        transitionDelay: "0s",
      },
    },
    _active: {
      bg: null,
      color: hoverColor,
    },
    _before: {
      ...pseudoBorderStyles,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transitionDelay: "0s",
    },
    _after: {
      ...pseudoBorderStyles,
      transformOrigin: "right",
      transitionDelay: "0.25s",
    },
  }
}
