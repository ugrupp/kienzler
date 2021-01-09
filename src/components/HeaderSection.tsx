import { graphql } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import React from "react"

const HeaderSection = ({ section }) => {
  return (
    <div>
      Header section ({section.type})
      <Img
        fluid={section.image.file.childImageSharp.fluid}
        alt={section.image.alt}
        objectFit={section.image.fit}
        objectPosition={section.image.position}
      />
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
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      src
      alt
      fit
      position
    }
    text
  }
`
