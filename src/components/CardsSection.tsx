import { graphql } from "gatsby"
import React from "react"

const CardsSection = ({ section }) => {
  const { type, slug, cards_type, columns } = section
  return <div>Cards section ({type})</div>
}

export default CardsSection

export const query = graphql`
  fragment CardsSectionFields on CardsSection {
    type
    slug
    cards_type
    columns {
      ... on Card {
        type
        title
        content
        image {
          file {
            relativePath
          }
        }
        cta {
          url
          label
          target
        }
      }
      ... on SocialMediaPost {
        type
        post
      }
    }
  }
`
