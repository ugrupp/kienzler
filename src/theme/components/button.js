// color schemes:
// - dark-orange
// - white-dark
// - white-orange

export default {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "none",
    textTransform: "uppercase",
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  defaultProps: {
    variant: "outline",
    colorScheme: "dark-orange",
  },
}

function variantSolid(props) {
  const { colorScheme: c } = props

  let color = undefined
  let bgColor = undefined
  let hoverColor = undefined
  let bgHoverColor = undefined

  // Special color schemes
  // TODO: globalize gray.800 as default text color somewhere
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

  return {
    color,
    border: "none",
    borderBottom: "1px solid currentColor",
    padding: 0,
    paddingBottom: 2,
    height: "auto",
    _hover: {
      bg: null,
      color: hoverColor,
    },
    _active: {
      bg: null,
      color: hoverColor,
    },
  }
}
