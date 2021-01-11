import { extendTheme } from "@chakra-ui/react"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import colors from "./foundations/colors"

// Component style overrides
import Button from "./components/button"

const overrides = {
  styles,
  colors,
  components: {
    Button,
  },
}

export default extendTheme(overrides)
