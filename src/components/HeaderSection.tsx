import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

const HeaderSection = ({ section }) => {
  const imageData = getImage(section.image.file)

  return (
    <div>
      Header section ({section.type})
      {imageData && (
        <GatsbyImage
          image={imageData}
          alt={section.image.alt}
          objectFit={section.image.fit}
          objectPosition={section.image.position}
        />
      )}
      {section.text}
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
