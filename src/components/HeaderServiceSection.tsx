import {
  Box,
  chakra,
  GridItem,
  Heading,
  VisuallyHidden,
} from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
// @ts-ignore
import FrontVideo from "../videos/kienzler-leistung-video-1.mp4"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"

export interface HeaderServiceSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  image?: Image
  backgroundImage?: Image
  decorImage?: Image
  columns: Array<{
    headline: string
    content: string
  }>
  listColumn: {
    headline: string
    content: string
  }
}

const HeaderServiceSection: React.FC<HeaderServiceSectionModel> = ({
  title,
  slug,
  image,
  backgroundImage,
  decorImage,
  columns,
  listColumn,
}) => {
  const imageData = getImage(image.file)
  const decorImageData = getImage(decorImage.file)

  // Background image
  const backgroundImageData = getImage(backgroundImage?.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Grid columns config
  const gridConfig = {
    defaults: {
      row: "auto",
      column: "main",
    },
    mainItems: [
      {
        row: ["1", null, null, null, "1"],
        column: [
          "3 / 13",
          "4 / 13",
          "3 / span 6",
          "3 / span 5",
          "3 / span 4",
          null,
          "3 / span 3",
        ],
      },
      {
        row: ["2", null, null, null, "1"],
        column: [
          "3 / 13",
          "4 / 13",
          "8 / span 6",
          "8 / span 5",
          "8 / span 4",
          null,
          "9 / span 3",
        ],
        mt: {
          xl: "26vh",
        },
      },
    ],
    listItem: {
      row: ["3", null, null, null, "2"],
      column: [
        "3 / 13",
        "4 / 13",
        "8 / span 6",
        "8 / span 5",
        "8 / span 4",
        null,
        "9 / span 3",
      ],
    },
  }

  // Adjust list icon color and indentation
  const columnsIndentation = [5, null, 6, null, 7, null, 8]
  const originalComponents = useMDXComponents()
  const modifiedComponents = {
    ...originalComponents,
    li: props =>
      originalComponents.li({
        ...props,
        color: "inherit",
        iconWidth: columnsIndentation,
      }),
    p: props => originalComponents.p({ ...props, pl: columnsIndentation }),
  }

  const sectionTopSpacing = [20, null, 24]

  return (
    <Box as="section" position="relative" pt={sectionTopSpacing} id={slug}>
      {/* h1, hidden but visible for screen readers and crawlers */}
      <VisuallyHidden as="h1">
        <MDXRenderer>{title}</MDXRenderer>
      </VisuallyHidden>

      {/* Decor image */}
      {decorImageData && (
        <StyleableGatsbyImage
          image={decorImageData}
          alt={decorImage.alt ?? ""}
          style={{ display: "block" }}
          pos="absolute"
          zIndex={1} // > bg image, < video
          top={sectionTopSpacing}
          left={0}
          w="full"
          maxW={["none", "80vw", "80vw", 740, null, 885]}
          mt={["30vh", null, "70vh", null, "60vh"]}
          transform="translateX(-30%);"
          pointerEvents="none"
          opacity={0.6}
        />
      )}

      {/* Front Image / Video */}
      {imageData && (
        <Box
          position="absolute"
          zIndex={2} // > bg image
          top={0}
          left={0}
          right={0}
        >
          <ContainerGrid>
            <GridItem
              gridColumn={[
                "3 / full",
                "4 / full",
                "3 / main",
                null,
                "7 / main",
                null,
                "6 / main",
              ]}
            >
              {/* Video */}
              <Box
                as="video"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                preload="auto"
                objectFit="cover"
                objectPosition="50% 50%"
                height={["47vh", null, "51vh", null, "67vh"]}
                minHeight="100%"
                display="block"
              >
                <source src={FrontVideo} type="video/mp4" />

                {/* Fallback image */}
                <StyleableGatsbyImage
                  image={imageData}
                  alt={image.alt ?? ""}
                  imgStyle={{
                    objectFit: image.fit,
                    objectPosition: image.position,
                  }}
                  style={{ display: "block" }}
                  h="full"
                  w="full"
                />
              </Box>
            </GridItem>
          </ContainerGrid>
        </Box>
      )}

      {/* Background image */}
      {!!backgroundImageData && (
        <Box position="sticky" top={0} zIndex={0} height="100vh">
          <StyleableGatsbyImage
            image={backgroundImageData}
            alt={backgroundImage.alt ?? ""}
            imgStyle={{
              objectFit: "cover",
              objectPosition: backgroundImage.position,
            }}
            style={{ display: "block" }}
            height="100%"
          />
        </Box>
      )}

      {/* Background gradient overlay */}
      <Box
        position="relative"
        zIndex={5} // > bg image and front image
        mt={!!backgroundImageData ? "-100vh" : undefined}
        height="150vh"
        bgGradient="linear-gradient(to-b, orange.500 0%, transparent 90%)"
        sx={{
          mixBlendMode: "multiply",
        }}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={8} // > bg image, front image & bg gradient
        mt="-150vh"
        pt={["47vh", null, "28vh", null, "24vh"]}
        pb={[64, null, 80]}
      >
        {/* Content grid */}
        <Box color="white">
          <ContainerGrid rowGap={[28, null, 48]}>
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
                mt={gridConfig.mainItems[idx].mt}
              >
                <ContentStack>
                  {/* Headline */}
                  {!!headline && (
                    <Heading as="h2" textStyle="h2">
                      <MDXRenderer>{headline}</MDXRenderer>
                    </Heading>
                  )}

                  {/* Content */}
                  {!!content && (
                    <ContentStack>
                      <MDXProvider
                        components={{
                          ...modifiedComponents,
                          // Indented paragraph for columns with headline
                          p: !!headline
                            ? modifiedComponents.p
                            : originalComponents.p,
                        }}
                      >
                        <MDXRenderer>{content}</MDXRenderer>
                      </MDXProvider>
                    </ContentStack>
                  )}
                </ContentStack>
              </GridItem>
            ))}

            {/* List column */}
            {!!listColumn && (
              <GridItem
                gridRow={gridConfig.listItem.row}
                gridColumn={gridConfig.listItem.column}
              >
                <ContentStack>
                  {/* Headline */}
                  {!!listColumn.headline && (
                    <Heading as="h2" textStyle="h3" color="orange.500">
                      <MDXRenderer>{listColumn.headline}</MDXRenderer>
                    </Heading>
                  )}

                  {/* Content */}
                  {!!listColumn.content && (
                    <ContentStack>
                      <MDXProvider
                        components={{
                          ...modifiedComponents,
                          li: props =>
                            originalComponents.li({
                              ...props,
                              iconWidth: columnsIndentation,
                            }),
                        }}
                      >
                        <MDXRenderer>{listColumn.content}</MDXRenderer>
                      </MDXProvider>
                    </ContentStack>
                  )}
                </ContentStack>
              </GridItem>
            )}
          </ContainerGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderServiceSection

export const query = graphql`
  fragment HeaderServiceSectionFragment on HeaderServiceSection {
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
    decorImage: decor_image {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: TRACED_SVG
            quality: 80
          )
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
  }
`
