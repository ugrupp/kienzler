import { chakra, Flex, GridItem, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"

export interface TeamSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  members?: Array<{
    firstName: string
    lastName: string
    image: Image
  }>
}

const TeamSection: React.FC<TeamSectionModel> = ({ members, slug }) => {
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <section id={slug}>
      <ContainerGrid
        rowGap={[10, null, 12, null, null, 14]}
        gridAutoFlow="row dense"
      >
        {members.map(({ firstName, lastName, image }, idx) => {
          const imageData = getImage(image?.file)

          return (
            <GridItem
              key={firstName + lastName}
              gridColumn={[
                "3 / main",
                "4 / main",
                "3 / main",
                [0, 1].includes(idx % 4) ? "3 / 7" : "8 / 12",
                null,
                null,
                [0, 1].includes(idx % 4) ? null : "9 / 12",
              ]}
            >
              <Flex
                align="center"
                key={`${firstName}-${lastName}-${image.file.id}`}
              >
                {/* Image */}
                <StyleableGatsbyImage
                  maxWidth={[40, null, 48, null, null, 64]}
                  image={imageData}
                  alt={image.alt ?? `${firstName} ${lastName}` ?? ""}
                  style={{ display: "block" }}
                />

                {/* Name */}
                <Text
                  textStyle="paragraph"
                  fontWeight="bold"
                  textTransform="uppercase"
                  ml={[-4, null, -5, -6]}
                  pos="relative"
                >
                  {firstName} <br />
                  {lastName}
                </Text>
              </Flex>
            </GridItem>
          )
        })}
      </ContainerGrid>
    </section>
  )
}

export default TeamSection

export const query = graphql`
  fragment TeamSectionFragment on TeamSection {
    type
    slug
    spacing {
      ...SpacingFragment
    }
    title
    members {
      firstName: first_name
      lastName: last_name
      image {
        file {
          id
          childImageSharp {
            gatsbyImageData(
              width: 256
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              quality: 90
            )
          }
        }
        alt
        fit
        position
      }
    }
  }
`
