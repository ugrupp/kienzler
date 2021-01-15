import { Heading, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

const HeaderSection = ({ section }) => {
  const imageData = getImage(section.image.file)

  // Adjust typography
  const originalComponents = useMDXComponents()

  // Heading
  const headingComponents = {
    ...originalComponents,
    h1: props => (
      <Heading
        as="h1"
        textStyle="h1"
        sx={{
          strong: {
            fontWeight: "inherit",
            color: "orange.500",
          },
        }}
        {...props}
      />
    ),
  }

  // Text
  const textComponents = {
    ...originalComponents,
    p: props => <Text textStyle="paragraph-lg" {...props} />,
  }

  return (
    <div>
      {/* Title */}
      {section.title && (
        <MDXProvider components={headingComponents}>
          <MDXRenderer>{section.title}</MDXRenderer>
        </MDXProvider>
      )}

      {/* Image */}
      {imageData && (
        <GatsbyImage
          image={imageData}
          alt={section.image.alt}
          objectFit={section.image.fit}
          objectPosition={section.image.position}
        />
      )}

      {/* Text */}
      {section.text && (
        <MDXProvider components={textComponents}>
          <MDXRenderer>{section.text}</MDXRenderer>
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
    header_type
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
