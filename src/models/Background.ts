import { graphql } from "gatsby"
import { Spacing } from "./Spacing"

export interface Background {
  rows: string
  gradient: string
  spacing: Spacing
}

export const query = graphql`
  fragment BackgroundFragment on Background {
    rows
    gradient
    spacing {
      ...SpacingFragment
    }
  }
`
