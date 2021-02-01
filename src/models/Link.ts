import { graphql } from "gatsby"

export interface Link {
  url: string
  label: string
  target: string
}

export const query = graphql`
  fragment LinkFragment on Link {
    url
    label
    target
  }
`
