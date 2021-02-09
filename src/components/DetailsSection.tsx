import { Box, Flex, Spacer } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import { Spacing } from "../models/Spacing"
import Detail, { DetailModel } from "./Detail"

export interface DetailsSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text?: string
  details?: DetailModel[]
}

const DetailsSection: React.FC<DetailsSectionModel> = ({ details, slug }) => {
  return (
    <section id={slug}>
      <Flex gridGap={10}>
        {details.map((detail, idx) => (
          <Box flexShrink={0} key={idx}>
            <Detail {...detail} />
          </Box>
        ))}
      </Flex>
    </section>
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
