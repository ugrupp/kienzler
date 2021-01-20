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
  // Background image
  const backgroundImageData = getImage(backgroundImage?.file)
  const BackgroundImage = chakra(GatsbyImage)

  return (
    <Box as="section" position="relative">
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
            objectFit={"cover"}
            objectPosition={backgroundImage.position}
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
            bgGradient="linear-gradient(to-b, orange.500 0%, transparent 100%)"
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
