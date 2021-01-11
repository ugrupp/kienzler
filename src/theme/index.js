import { extendTheme } from "@chakra-ui/react"
import Button from "./components/button"
import colors from "./foundations/colors"
import typography from "./foundations/typography"
import styles from "./styles"

const overrides = {
  // Global style overrides
  styles,
  // Foundational style overrides
  colors,
  ...typography,
  // Component style overrides
  components: {
    Button,
  },
}

export default extendTheme(overrides)
