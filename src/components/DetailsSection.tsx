import { graphql } from "gatsby"
import React from "react"
import Detail, { DetailModel } from "./Detail"

export interface DetailsSectionModel {
  section: {
    type: string
    slug?: string
    title?: String

    text?: string
    details?: DetailModel[]
  }
}

const DetailsSection: React.FC<DetailsSectionModel> = ({ section }) => {
  const { details } = section
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
