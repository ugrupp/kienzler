import { Box, chakra, GridItem } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
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

  cardsType?: "alpha" | "beta"
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
  const defaultColumnPosition = ["3 / 13"]

  // TODO: make editable in YAML
  const cardsConfig = {
    alpha: {
      rowSpan: 2,
      columnPositions: [
        ["full", null, "3 / 13", null, "9 / 13"],
        ["full", null, "3 / 13", null, "3 / 7"],
        ["full", null, "3 / 13", null, "9 / 13"],
        ["full", null, "3 / 13", null, "3 / 7"],
      ],
      cardGridColumns: [
        {
          title: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          text: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          cta: [
            "3 / full",
            "4 / full",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
        },
      ],
    },
    beta: {
      rowSpan: 3,
      columnPositions: [
        ["main / 7", null, "8 / 13", "10 / 13", "9 / 12", "9 / 11"],
        ["full", null, "3 / 13", null, "3 / 7"],
        ["full", null, "3 / 13", null, "10 / 14"],
        ["9 / main", null, "3 / 8", "3 / 6", "4 / 7", "5 / 7"],
        ["full", null, "3 / 13", null, "9 / 13"],
        ["full", null, "3 / 13", null, "4 / 8"],
        ["main / 7", null, "8 / 13", "10 / 13", "10 / 13", "11 / 13"],
      ],
      cardGridColumns: [
        null,
        null,
        {
          title: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          text: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          cta: [
            "3 / full",
            "4 / full",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
        },
        null,
        null,
        {
          title: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          text: [
            "3 / 13",
            "4 / 13",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
          cta: [
            "3 / full",
            "4 / full",
            "5 / main",
            "7 / main",
            "main / -3",
            "main / -4",
          ],
        },
      ],
    },
  }

  const currentCardsConfig = cardsConfig[cardsType]

  // Background image
  const backgroundImageData = getImage(backgroundImage?.file)
  const BackgroundImage = chakra(GatsbyImage)

  return (
    <Box as="section" position="relative" id={slug}>
      {/* Background image */}
      {!!backgroundImageData && (
        <Box
          sx={{
            position: "sticky",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
            height: "100vh",
          }}
        >
          {/* Image */}
          <BackgroundImage
            image={backgroundImageData}
            alt={backgroundImage.alt ?? ""}
            imgStyle={{
              objectFit: "cover",
              objectPosition: backgroundImage.position,
            }}
            style={{ display: "block" }}
            height="100%"
          />

          {/* Gradient overlay */}
          <Box
            position="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            zIndex={5}
            bgGradient="linear-gradient(to-b, orange.500 0%, transparent 90%)"
            sx={{
              mixBlendMode: "multiply",
            }}
          />
        </Box>
      )}

      {/* Cards grid */}
      <Box
        position="relative"
        zIndex={5}
        mt={!!backgroundImageData ? "-100vh" : undefined}
      >
        <ContainerGrid rowGap={[36]}>
          {columns.map((item, idx) => (
            <GridItem
              rowSpan={{ lg: currentCardsConfig.rowSpan }}
              gridColumn={
                currentCardsConfig.columnPositions[idx] ?? defaultColumnPosition
              }
              key={idx}
            >
              {item.type === "social_media_post" ? (
                <SocialMediaPost {...(item as SocialMediaPostModel)} />
              ) : (
                <Card
                  gridColumns={
                    currentCardsConfig.cardGridColumns[idx] ?? undefined
                  }
                  colorScheme={!!backgroundImageData ? "white" : undefined}
                  {...(item as CardModel)}
                />
              )}
            </GridItem>
          ))}
        </ContainerGrid>
      </Box>
    </Box>
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
    backgroundImage: background_image {
      file {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 75)
        }
      }
      alt
      position
    }
    columns {
      ... on Card {
        ...CardFragment
      }
      ... on SocialMediaPost {
        ...SocialMediaPostFragment
      }
    }
  }
`
