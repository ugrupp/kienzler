import { GridItem } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import Card from "./Card"
import ContainerGrid from "./ContainerGrid"

const CardsSection = ({ section }) => {
  const { type, slug, cards_type, columns } = section
  const defaultColumnPosition = ["main"]
  const columnPositions = [
    ["3 / full", null, null, "9 / -3"],
    ["3 / full", null, null, "3 / 7"],
  ]
  return (
    <ContainerGrid rowGap={[36]}>
      {columns.map((card, idx) => (
        <GridItem
          rowSpan={{ lg: 2 }}
          gridColumn={columnPositions[idx % 2] ?? defaultColumnPosition}
          key={idx}
        >
          <Card {...card} />
        </GridItem>
      ))}
    </ContainerGrid>
  )
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
            childImageSharp {
              gatsbyImageData(
                maxWidth: 800
                layout: FLUID
                placeholder: DOMINANT_COLOR
              )
            }
          }
          alt
          fit
          position
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
