import {
  Box,
  chakra,
  Grid,
  GridItem,
  Heading,
  VisuallyHidden,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"

export interface HeaderCompanySectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  image?: Image
  backgroundImage?: Image
  columns: Array<{
    headline: string
    content: string
  }>
  listColumn: {
    headline: string
    content: string
  }
  imageColumn?: Image
}

const HeaderCompanySection: React.FC<HeaderCompanySectionModel> = ({
  title,
  image,
  backgroundImage,
  columns,
  listColumn,
  imageColumn,
}) => {
  const imageData = getImage(image.file)
  const imageColumnData = getImage(imageColumn.file)

  // Background image
  const backgroundImageData = getImage(backgroundImage?.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Grid columns config
  const gridConfig = {
    defaults: {
      row: "auto",
      column: "main",
    },
    templateRows: ["max-content"],
    mainItems: [
      {
        row: "1",
        column: ["3 / 13", "4 / 13", "3 / span 6", "3 / span 5", "4 / span 4"],
      },
      {
        row: "2",
        column: ["3 / 13", "4 / 13", "3 / span 6", "3 / span 5", "4 / span 4"],
      },
      {
        row: ["4", null, "4", null, "3", null, "4"],
        column: ["3 / 13", "4 / 13", "8 / span 6", "8 / span 5", "8 / span 4"],
      },
      {
        row: ["5", null, "5", null, "4", null, "5"],
        column: ["3 / 13", "4 / 13", "8 / span 6", "8 / span 5", "8 / span 4"],
      },
    ],
    listItem: {
      row: ["6", null, "6", null, "3 / span 3"],
      column: ["3 / 13", "4 / 13", "3 / span 6", "3 / span 5", "3 / span 4"],
    },
    imageItem: {
      row: ["3", null, "3 / span 3", null, "1 / span 2"],
      column: ["full / 10", "full / 8", "full / 6", "full / 6", "9 / 13"],
    },
  }

  return (
    <Box as="section" position="relative">
      {/* h1, hidden but visible for screen readers and crawlers */}
      <VisuallyHidden as="h1">
        <MDXRenderer>{title}</MDXRenderer>
      </VisuallyHidden>

      {/* Front Image */}
      {imageData && (
        <Box
          id="image"
          position="relative"
          zIndex={2} // > bg image
          mb={[-32, null, -48]}
        >
          <ContainerGrid>
            <GridItem gridColumn={["3 / full", "4 / full", "3 / main"]}>
              <StyleableGatsbyImage
                image={imageData}
                alt={image.alt ?? ""}
                objectFit={image.fit}
                objectPosition={image.position}
                style={{ display: "block" }}
                height={["47vh", null, "51vh", null, "67vh"]}
                minHeight="100%"
              />
            </GridItem>
          </ContainerGrid>
        </Box>
      )}

      {/* Background image */}
      {!!backgroundImageData && (
        <Box id="bgImage" position="sticky" top={0} zIndex={0} height="100vh">
          <StyleableGatsbyImage
            image={backgroundImageData}
            alt={backgroundImage.alt ?? ""}
            objectFit={"cover"}
            objectPosition={backgroundImage.position}
            style={{ display: "block" }}
            height="100%"
          />
        </Box>
      )}

      {/* Background gradient overlay */}
      {!!backgroundImageData && ( // TODO: handle or kick no-bg-image case
        <Box
          id="overlay"
          position="relative"
          zIndex={5} // > bg image and front image
          mt={!!backgroundImageData ? "-100vh" : undefined} // TODO: handle or kick no-bg-image case
          height="100vh"
          bgGradient="linear-gradient(to-b, orange.500 0%, transparent 90%)"
          sx={{
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Content */}
      <Box
        id="content"
        position="relative"
        zIndex={8} // > bg image, front image & bg gradient
        mt={!!backgroundImageData ? "-100vh" : undefined} // TODO: handle or kick no-bg-image case
        pt={[20, null, 24, null, 60]}
        pb={[64, null, 72]}
      >
        {/* Content grid */}
        <Box color="white">
          <ContainerGrid
            rowGap={[16, null, 20, null, 24]}
            templateRows={gridConfig.templateRows}
          >
            {/* Columns */}
            {columns.map(({ headline, content }, idx) => (
              <GridItem
                key={idx}
                gridRow={
                  gridConfig.mainItems[idx].row ?? gridConfig.defaults.row
                }
                gridColumn={
                  gridConfig.mainItems[idx].column ?? gridConfig.defaults.column
                }
              >
                <ContentStack>
                  <Heading as="h2" textStyle="h2">
                    <MDXRenderer>{headline}</MDXRenderer>
                  </Heading>
                  <Box pl={[5, null, 6, null, 7, null, 8]}>
                    <MDXRenderer>{content}</MDXRenderer>
                  </Box>
                </ContentStack>
              </GridItem>
            ))}

            {/* List column */}
            {!!listColumn && (
              <GridItem
                gridRow={gridConfig.listItem.row}
                gridColumn={gridConfig.listItem.column}
                mt={[null, null, null, null, 32, null, 0]}
              >
                <ContentStack>
                  <Heading as="h2" textStyle="h3" color="orange.500">
                    <MDXRenderer>{listColumn.headline}</MDXRenderer>
                  </Heading>
                  <MDXRenderer>{listColumn.content}</MDXRenderer>
                </ContentStack>
              </GridItem>
            )}

            {/* Image column */}
            {imageColumnData && (
              <GridItem
                gridRow={gridConfig.imageItem.row}
                gridColumn={gridConfig.imageItem.column}
                mt={[null, null, null, null, -24]}
              >
                <StyleableGatsbyImage
                  image={imageColumnData}
                  alt={imageColumn.alt ?? ""}
                  objectFit={imageColumn.fit}
                  objectPosition={imageColumn.position}
                  style={{ display: "block" }}
                  maxWidth={505}
                  ml={[null, null, null, null, "auto"]}
                />
              </GridItem>
            )}
          </ContainerGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderCompanySection

export const query = graphql`
  fragment HeaderCompanySectionFragment on HeaderCompanySection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }

    image {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 75
          )
        }
      }
      alt
      fit
      position
    }
    backgroundImage: background_image {
      file {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 75)
        }
      }
      alt
      fit
      position
    }
    columns {
      headline
      content
    }
    listColumn {
      headline
      content
    }
    imageColumn {
      file {
        childImageSharp {
          gatsbyImageData(
            width: 505
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 75
          )
        }
      }
      alt
      fit
      position
    }
  }
`
