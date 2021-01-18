import { chakra, GridItem, Heading, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import ContainerGrid from "./ContainerGrid"
import ShiftBy from "./ShiftBy"

export interface HeaderSectionModel {
  section: {
    type: string
    slug?: string
    title?: string

    headerType?: string
    image?: Image
    text?: string
  }
}

const HeaderSection: React.FC<HeaderSectionModel> = ({ section }) => {
  const { type, slug, title, headerType, image, text } = section

  const imageData = getImage(image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Adjust typography
  const originalComponents = useMDXComponents()

  // Text
  const textComponents = {
    ...originalComponents,
    p: props => <Text textStyle="paragraph-lg" {...props} />,
  }

  return (
    <ContainerGrid rowGap={[9]}>
      {/* Title */}
      {title && (
        <GridItem
          gridRow={[2, null, null, null, 1]}
          gridColumn={[
            "3 / main",
            "4 / main",
            "3 / -6",
            null,
            "3 / 7",
            null,
            "3 / 6",
          ]}
        >
          <Heading
            as="h1"
            textStyle="h1"
            sx={{
              strong: {
                fontWeight: "inherit",
                color: "orange.500",
              },
            }}
          >
            <ShiftBy y={"-0.2em"}>
              <MDXRenderer>{title}</MDXRenderer>
            </ShiftBy>
          </Heading>
        </GridItem>
      )}

      {/* Image */}
      {imageData && (
        <GridItem
          gridRow={[1, null, null, null, 1]}
          gridColumn={[
            "3 / full",
            "4 / full",
            "3 / main",
            null,
            "7 / main",
            null,
            "6 / main",
          ]}
          ml={[null, null, null, null, 7, 8]}
        >
          <StyleableGatsbyImage
            image={imageData}
            alt={image.alt ?? ""}
            objectFit={image.fit}
            objectPosition={image.position}
            sx={{
              height: ["19.75rem", null, "33.25rem", null, "45rem"],
            }}
          />
        </GridItem>
      )}

      {/* Text */}
      {text && (
        <MDXProvider components={textComponents}>
          <MDXRenderer>{text}</MDXRenderer>
        </MDXProvider>
      )}
    </ContainerGrid>
  )
}

export default HeaderSection

export const query = graphql`
  fragment HeaderSectionFields on HeaderSection {
    type
    slug
    title
    headerType: header_type
    image {
      file {
        childImageSharp {
          gatsbyImageData(
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
    text
  }
`
