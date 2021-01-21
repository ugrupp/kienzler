import { graphql } from "gatsby"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import HeaderSectionAlpha from "./HeaderSectionAlpha"
import HeaderSectionBeta from "./HeaderSectionBeta"

export interface HeaderSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  headerType?: string
  image?: Image
  text?: string
}

const HeaderSection: React.FC<HeaderSectionModel> = props =>
  props.headerType === "alpha" ? (
    <HeaderSectionAlpha {...props} />
  ) : (
    <HeaderSectionBeta {...props} />
  )

export default HeaderSection

export const query = graphql`
  fragment HeaderSectionFields on HeaderSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }
    headerType: header_type
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
    text
  }
`
