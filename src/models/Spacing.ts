import { ResponsiveValue } from "@chakra-ui/react"
import { Length } from "@chakra-ui/styled-system/dist/types/utils"
import * as CSS from "csstype"
import { graphql } from "gatsby"

export interface Spacing {
  top: ResponsiveValue<CSS.Property.MarginTop<Length>>
  bottom: ResponsiveValue<CSS.Property.MarginBottom<Length>>
}

export const query = graphql`
  fragment SpacingFragment on Spacing {
    top
    bottom
  }
`
