import { graphql } from "gatsby"
import React from "react"
import Detail from "./Detail"

const DetailsSection = ({ section }) => {
  return (
    <ul>
      {section.details.map(detail => (
        <Detail detail={detail} key={detail.id} />
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
