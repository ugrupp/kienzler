import { Box, chakra, Flex, GridItem, Img, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
// @ts-ignore
import KemmlerLogo from "../images/kemmler-logo.svg"
import ContainerGrid from "./ContainerGrid"
import { salConfig } from "./SALWrapper"

export interface StoererSectionProps {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text: string
  backgroundImage?: Image
}

const StoererSection: React.FC<StoererSectionProps> = ({
  slug,
  text,
  backgroundImage,
}) => {
  const backgroundImageData = getImage(backgroundImage?.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <Box as="section" position="relative" id={slug}>
      {/* Concrete background, full bleed behind the content */}
      {!!backgroundImageData && (
        <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
          <StyleableGatsbyImage
            image={backgroundImageData}
            alt={backgroundImage.alt ?? ""}
            imgStyle={{
              objectFit: "cover",
              objectPosition: backgroundImage.position ?? "50% 50%",
            }}
            style={{ display: "block", height: "100%" }}
            h="full"
            w="full"
          />
        </Box>
      )}

      {/* Content */}
      <ContainerGrid
        position="relative"
        zIndex={1}
        py={[20, null, 32, null, 40]}
      >
        <GridItem
          gridColumn={["3 / main", "4 / main", "3 / main"]}
          {...salConfig}
        >
          <Flex
            direction={["column", null, "row"]}
            align={["flex-start", null, "center"]}
            justifyContent={[null, null, "space-between"]}
            gap={[8, null, 12, null, 16]}
          >
            <Img
              src={KemmlerLogo}
              alt="Beton Kemmler"
              flexShrink={0}
              display="block"
              w={["240px", null, "260px", null, "350px"]}
              h="auto"
            />

            {!!text && (
              <Text
                textStyle="h2"
                fontSize={["2xl", null, null, "3xl"]}
                color="gray.500"
                whiteSpace="pre-line"
              >
                {text}
              </Text>
            )}
          </Flex>
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default StoererSection

export const query = graphql`
  fragment StoererSectionFragment on StoererSection {
    type
    slug
    spacing {
      ...SpacingFragment
    }

    text
    backgroundImage: background_image {
      file {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 80)
        }
      }
      alt
      position
    }
  }
`
