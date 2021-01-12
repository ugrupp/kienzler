import { Box, Button } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"

const CardsSection = ({ section }) => {
  const { type, slug, cards_type, columns } = section
  return (
    <ContainerGrid>
      <Box gridColumn="full" backgroundColor="lightblue">
        full
      </Box>
      <Box gridColumn="main / full" backgroundColor="salmon">
        main-right
      </Box>
      <Box backgroundColor="palegreen">main</Box>
      <Box gridColumn={["full", "4 / 8"]} backgroundColor="darkkhaki">
        somewhere in the middle
      </Box>
      <div>
        {columns.map(({ cta }, idx) => (
          <div key={idx}>
            {!!cta && (
              <Button
                as={Link}
                to={cta.url}
                target={cta.target}
                rightIcon={<ArrowBoldIcon />}
              >
                {cta.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </ContainerGrid>
  )
}

export default CardsSection

export const query = graphql`
  fragment CardsSectionFields on CardsSection {
    type
    slug
    cards_type
    columns {
      ... on Card {
        type
        title
        content
        image {
          file {
            relativePath
          }
        }
        cta {
          url
          label
          target
        }
      }
      ... on SocialMediaPost {
        type
        post
      }
    }
  }
`
