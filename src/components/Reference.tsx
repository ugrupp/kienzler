import { GridItem, Box, Text, chakra } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"

export interface ReferenceModel {
  title: string
  goal: string
  location: string
  image: Image
}

const Reference: React.FC<ReferenceModel> = ({
  title,
  goal,
  location,
  image,
}) => {
  const StyleableGatsbyImage = chakra(GatsbyImage)
  const imageData = getImage(image?.file)

  const gridConfig = {
    image: {
      column: ["full", null, null, "full / 9"],
    },
    info: {
      column: ["3 / main", "4 / main", "3 / 10", "10 / main", "10 / 13"],
    },
  }

  return (
    <ContainerGrid rowGap={[10]}>
      {/* Image */}
      {!!imageData && (
        <GridItem gridColumn={gridConfig.image.column}>
          <StyleableGatsbyImage
            image={imageData}
            imgStyle={{ display: "block" }}
            style={{ display: "block" }}
            alt={image.alt ?? ""}
          />
        </GridItem>
      )}

      {/* Info */}
      <GridItem gridColumn={gridConfig.info.column} alignSelf="flex-end">
        <ContentStack>
          {/* Project title */}
          {!!title && (
            <Box>
              <Text as="h5" textStyle="h4" color="orange.500">
                Projekt
              </Text>
              <MDXRenderer>{title}</MDXRenderer>
            </Box>
          )}

          {/* Goal */}
          {!!goal && (
            <Box>
              <Text as="h5" textStyle="h4" color="orange.500">
                Zielsetzung
              </Text>
              <MDXRenderer>{goal}</MDXRenderer>
            </Box>
          )}

          {/* Location */}
          {!!location && (
            <Box>
              <Text as="h5" textStyle="h4" color="orange.500">
                Standort
              </Text>
              <MDXRenderer>{location}</MDXRenderer>
            </Box>
          )}
        </ContentStack>
      </GridItem>
    </ContainerGrid>
  )
}

export default Reference

export const query = graphql`
  fragment ReferenceFragment on Reference {
    title
    goal
    location
    image {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 95
          )
        }
      }
      alt
      fit
      position
    }
  }
`
