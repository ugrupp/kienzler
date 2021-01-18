import { Heading, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"

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

  // Adjust typography
  const originalComponents = useMDXComponents()

  // Text
  const textComponents = {
    ...originalComponents,
    p: props => <Text textStyle="paragraph-lg" {...props} />,
  }

  return (
    <div>
      {/* Title */}
      {title && (
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
          <MDXRenderer>{title}</MDXRenderer>
        </Heading>
      )}

      {/* Image */}
      {imageData && (
        <GatsbyImage
          image={imageData}
          alt={image.alt}
          objectFit={image.fit}
          objectPosition={image.position}
        />
      )}

      {/* Text */}
      {text && (
        <MDXProvider components={textComponents}>
          <MDXRenderer>{text}</MDXRenderer>
        </MDXProvider>
      )}
    </div>
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
            maxWidth: 1920
            layout: FLUID
            placeholder: DOMINANT_COLOR
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
