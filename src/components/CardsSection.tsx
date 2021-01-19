import { GridItem } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import Card, { CardModel } from "./Card"
import ContainerGrid from "./ContainerGrid"
import SocialMediaPost, { SocialMediaPostModel } from "./SocialMediaPost"

export interface CardsSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  cardsType?: String
  backgroundImage?: Image
  columns?: [CardModel | SocialMediaPostModel]
}

const CardsSection: React.FC<CardsSectionModel> = ({
  type,
  slug,
  title,
  cardsType,
  backgroundImage,
  columns,
}) => {
  const defaultColumnPosition = ["main"]
  const columnPositions = [
    ["full", null, "3 / -3", null, "9 / -3"],
    ["full", null, "3 / -3", null, "3 / 7"],
  ]
  return (
    <section>
      <ContainerGrid rowGap={[36]}>
        {columns.map((item, idx) => (
          <GridItem
            rowSpan={{ lg: 2 }}
            gridColumn={columnPositions[idx % 2] ?? defaultColumnPosition}
            key={idx}
          >
            {item.type === "social_media_post" ? (
              <SocialMediaPost {...(item as SocialMediaPostModel)} />
            ) : (
              <Card {...(item as CardModel)} />
            )}
          </GridItem>
        ))}
      </ContainerGrid>
    </section>
  )
}

export default CardsSection

export const query = graphql`
  fragment CardsSectionFields on CardsSection {
    type
    slug
    spacing {
      ...SpacingFragment
    }
    cardsType: cards_type
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
                quality: 75
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
