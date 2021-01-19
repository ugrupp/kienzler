import { graphql } from "gatsby"
import React from "react"
import { Spacing } from "../models/Spacing"
import Detail, { DetailModel } from "./Detail"

export interface DetailsSectionModel {
  type: string
  slug?: string
  title?: String
  spacing?: Spacing

  text?: string
  details?: DetailModel[]
}

const DetailsSection: React.FC<DetailsSectionModel> = ({ details }) => {
  return (
    <ul>
      {details.map(detail => (
        <Detail {...detail} key={detail.id} />
      ))}
    </ul>
  )
}

export default DetailsSection

export const query = graphql`
  fragment DetailsSectionFields on DetailsSection {
    type
    slug
    title
    text
    details {
      id
      title
    }
  }
`
