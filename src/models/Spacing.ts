import { ResponsiveValue } from "@chakra-ui/react"
import { Length } from "@chakra-ui/styled-system/dist/types/utils"
import * as CSS from "csstype"

export interface Spacing {
  bottom: ResponsiveValue<CSS.Property.MarginBottom<Length>>
}
