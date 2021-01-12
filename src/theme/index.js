import { extendTheme } from "@chakra-ui/react"
import Button from "./components/button"
import colors from "./foundations/colors"
import sizes from "./foundations/sizes"
import typography from "./foundations/typography"
import styles from "./styles"

const overrides = {
  // Global style overrides
  styles,
  // Foundational style overrides
  colors,
  ...typography,
  sizes,
  // Component style overrides
  components: {
    Button,
  },
}

export default extendTheme(overrides)
