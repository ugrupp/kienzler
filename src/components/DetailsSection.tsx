import { Box, Flex, Spacer } from "@chakra-ui/react"
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
    <Flex gridGap={10}>
      {details.map((detail, idx) => (
        <Box flexShrink={0} key={idx}>
          <Detail {...detail} />
        </Box>
      ))}
    </Flex>
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
      ... on DetailsYaml {
        ...DetailsFragment
      }
    }
  }
`
