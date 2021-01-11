import { Box, Button } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import Link from "./Link"

const CardsSection = ({ section }) => {
  const { type, slug, cards_type, columns } = section
  return (
    <Box>
      Cards section ({type})
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
    </Box>
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
