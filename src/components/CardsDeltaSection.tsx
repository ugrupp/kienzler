import { Box, chakra, GridItem, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import ContainerGrid from "./ContainerGrid"
import Detail, { DetailModel } from "./Detail"
import ContentStack from "./ContentStack"
import AdvantagesSection from "./AdvantagesSection"
import { salConfig } from "./SALWrapper"

export interface CardsDeltaSectionModel {
  type: string
  slug?: string
  title: string

  text: string
  highlightImage1: DetailModel
  highlightImage2: DetailModel
  image1?: Image
  image2?: Image
  image3?: Image

  advantagesTitle: string
  advantages: string
}

const CardsDeltaSection: React.FC<CardsDeltaSectionModel> = ({
  slug,
  title,
  text,
  highlightImage1,
  highlightImage2,
  image1,
  image2,
  image3,
  advantagesTitle,
  advantages,
}) => {
  // Get image data
  const imageData1 = image1?.file ? getImage(image1.file) : null
  const imageData2 = image2?.file ? getImage(image2.file) : null
  const imageData3 = image3?.file ? getImage(image3.file) : null
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Grid columns config
  const gridConfig = {
    sectionIntro: {
      column: ["3 / main", "4 / main", "2 / 8", "3 / 9", "3 / 6"],
      row: [2, null, null, null, 1],
    },
    highlightImage1: {
      column: [
        "3 / full",
        "4 / full",
        "span 10 / main",
        "span 7 / main",
        "span 6 / main",
        "span 5 / main",
      ],
      row: [1, null, null, null, 1],
    },
    advantages: {
      column: ["full", null, null, null, "10 / main"],
      row: [3, null, null, null, 2],
    },
    highlightImage2: {
      column: ["3 / main", "4 / main", "2 / 8", "3 / 8", "3 / span 4"],
      row: [4, null, null, null, 2],
    },
    image1: {
      column: [
        "6 / main",
        "7 / main",
        "6 / 13",
        "span 7 / main",
        "span 3 / main",
      ],
    },
    image2: {
      column: ["3 / 11", "4 / 11", "2 / 8", "3 / 9", "3 / 6"],
    },
    image3: {
      column: ["6 / 12", "7 / 12", "6 / 11", "7 / 12", "10 / 12"],
    },
  }

  return (
    <Box as="section" position="relative" id={slug}>
      <ContainerGrid rowGap={[12]}>
        {/* Section intro image */}
        <GridItem
          gridColumn={gridConfig.highlightImage1.column}
          gridRow={gridConfig.highlightImage1.row}
          mt={[-10, -14]}
          {...salConfig}
        >
          <Detail {...highlightImage1} />
        </GridItem>

        {/* Section intro column */}
        <GridItem
          gridColumn={gridConfig.sectionIntro.column}
          gridRow={gridConfig.sectionIntro.row}
          mt={[120, null, null, null, null]}
          {...salConfig}
        >
          <ContentStack>
            {/* Headline */}
            {!!title && (
              <Text as="h2" textStyle="h2" color="orange.500">
                <MDXRenderer>{title}</MDXRenderer>
              </Text>
            )}

            {/* Text */}
            {!!text && (
              <ContentStack>
                <MDXRenderer>{text}</MDXRenderer>
              </ContentStack>
            )}
          </ContentStack>
        </GridItem>

        {/* Advantages */}
        <GridItem
          gridColumn={gridConfig.advantages.column}
          gridRow={gridConfig.advantages.row}
          mt={[null, 10, null, null, 100]}
        >
          <AdvantagesSection
            type="advantages"
            title={advantagesTitle}
            advantages={advantages}
            allowAdvantagesColumnToGrow={true}
          />
        </GridItem>

        {/* Highlight image 2 */}
        <GridItem
          gridColumn={gridConfig.highlightImage2.column}
          gridRow={gridConfig.highlightImage2.row}
          mt={[10, 14, null, 30, 200]}
          {...salConfig}
        >
          <Detail {...highlightImage2} />
        </GridItem>

        {/* Image 1 */}
        {!!imageData1 && (
          <GridItem
            gridColumn={gridConfig.image1.column}
            mt={[100, null, 120, null, 0]}
            {...salConfig}
          >
            <StyleableGatsbyImage
              image={imageData1}
              alt={image1?.alt ?? ""}
              style={{ display: "block" }}
            />
          </GridItem>
        )}

        {/* Image 2 */}
        {!!imageData2 && (
          <GridItem
            gridColumn={gridConfig.image2.column}
            mt={[null, null, null, null, -100]}
            {...salConfig}
          >
            <StyleableGatsbyImage
              image={imageData2}
              alt={image2?.alt ?? ""}
              style={{ display: "block" }}
            />
          </GridItem>
        )}

        {/* Image 3 */}
        {!!imageData3 && (
          <GridItem
            gridColumn={gridConfig.image3.column}
            mt={[null, null, null, null, 50]}
            {...salConfig}
          >
            <StyleableGatsbyImage
              image={imageData3}
              alt={image3?.alt ?? ""}
              style={{ display: "block" }}
            />
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default CardsDeltaSection

export const query = graphql`
  fragment CardsDeltaSectionFields on CardsDeltaSection {
    type
    title
    slug

    text
    advantagesTitle
    advantages

    highlightImage1 {
      ... on DetailsYaml {
        ...DetailsFragment
      }
    }

    highlightImage2 {
      ... on DetailsYaml {
        ...DetailsFragment
      }
    }

    image1 {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 90
          )
        }
      }
      alt
      fit
      position
    }

    image2 {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 90
          )
        }
      }
      alt
      fit
      position
    }

    image3 {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 90
          )
        }
      }
      alt
      fit
      position
    }
  }
`
