import { extendTheme } from "@chakra-ui/react"
import Button from "./components/button"
import breakpoints from "./foundations/breakpoints"
import colors from "./foundations/colors"
import sizes from "./foundations/sizes"
import typography from "./foundations/typography"
import layerStyles from "./layerStyles"
import styles from "./styles"
import textStyles from "./textStyles"

const overrides = {
  // Global style overrides
  styles,
  // Foundational style overrides
  breakpoints,
  colors,
  ...typography,
  sizes,
  // Component style overrides
  components: {
    Button,
  },
  // Text & layer styles
  textStyles,
  layerStyles,
}

export default extendTheme(overrides)
