import {
  Box,
  Button,
  chakra,
  GridItem,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"
import ShiftBy from "./ShiftBy"

export interface HeaderErrorSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  image?: Image
}

const HeaderErrorSection: React.FC<HeaderErrorSectionModel> = ({
  title,
  slug,
  image,
}) => {
  const imageData = getImage(image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <Box
      as="section"
      position="relative"
      id={slug}
      minHeight="100vh"
      pt={["24vh", null, "26vh", null, "33vh"]}
      display="flex"
      sx={{
        "& > *": {
          width: "full",
        },
      }}
    >
      <ContainerGrid>
        {/* Image */}
        {imageData && (
          <GridItem gridRow={1} gridColumn={"full"}>
            <StyleableGatsbyImage
              image={imageData}
              alt={image.alt ?? ""}
              imgStyle={{
                objectFit: image.fit,
                objectPosition: image.position,
              }}
              style={{ display: "block" }}
              sx={{
                height: ["47vh", null, "51vh", null, "67vh"],
                minHeight: "100%",
              }}
            />
          </GridItem>
        )}

        {/* Content */}
        <GridItem
          gridRow={1}
          gridColumn={["3 / 13", null, "main"]}
          pos="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={[8, null, 10]} align="flex-start" maxW={415}>
            {/* Heading */}
            <Heading as="h2" textStyle="h2">
              <Box as="strong" color="orange.500">
                404:
              </Box>{" "}
              die Seite konnte nicht gefunden werden.
            </Heading>

            {/* Home link */}
            <Button
              rightIcon={<ArrowBoldIcon />}
              as={Link}
              to={"/"}
              colorScheme="white-orange"
            >
              <ShiftBy y={"2px"}>Startseite</ShiftBy>
            </Button>
          </VStack>
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default HeaderErrorSection

export const query = graphql`
  fragment HeaderErrorSectionFragment on HeaderErrorSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }

    image {
      file {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 75
            transformOptions: { grayscale: true }
          )
        }
      }
      alt
      fit
      position
    }
  }
`
