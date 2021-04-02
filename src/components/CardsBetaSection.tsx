import { Box, chakra, GridItem, Heading } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import SocialMediaPost, { SocialMediaPostModel } from "./SocialMediaPost"
// @ts-ignore
import CardVideo from "../videos/kienzler-leistung-video-2.mp4"
import { salConfig } from "./SALWrapper"

export interface CardsBetaSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text?: string
  socialMediaPost?: SocialMediaPostModel
  image1?: Image
  image2?: Image
  image3?: Image
}

const CardsBetaSection: React.FC<CardsBetaSectionModel> = ({
  slug,
  title,
  text,
  socialMediaPost,
  image1,
  image2,
  image3,
}) => {
  // Get image data
  const imageData1 = getImage(image1.file)
  const imageData2 = getImage(image2.file)
  const imageData3 = getImage(image3.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Grid columns config
  const gridConfig = {
    image1: {
      row: 1,
      column: [
        "full / 13",
        null,
        "main / 8",
        null,
        "main / 7",
        null,
        "main / 6",
      ],
    },
    text: {
      row: 2,
      column: [
        "3 / 13",
        "4 / 13",
        "8 / span 6",
        "8 / span 5",
        "8 / span 4",
        null,
        "9 / span 3",
      ],
    },
    image2: {
      row: [3, null, 2],
      column: ["3 / 8", "4 / 9", "3 / 6", null, null, "3 / 5"],
    },
    video: {
      row: [4, null, 3],
      column: [
        "3 / full",
        "4 / full",
        "3 / main",
        null,
        "7 / main",
        null,
        "6 / main",
      ],
    },
    socialMediaPost: {
      row: [3],
      column: [null, null, null, "main / 5", null, "main / 4"],
    },
  }

  return (
    <Box as="section" position="relative" id={slug}>
      <ContainerGrid rowGap={[24]}>
        {/* Image 1 */}
        {!!imageData1 && (
          <GridItem
            gridColumn={gridConfig.image1.column}
            gridRow={gridConfig.image1.row}
            mt={[-10, -14]}
          >
            <StyleableGatsbyImage
              image={imageData1}
              alt={image1.alt ?? ""}
              style={{ display: "block" }}
            />
          </GridItem>
        )}

        {/* Text column */}
        {(!!title || !!text) && (
          <GridItem
            gridColumn={gridConfig.text.column}
            gridRow={gridConfig.text.row}
            mt={[null, null, null, null, -52, null, -72]}
            {...salConfig}
          >
            <ContentStack>
              {/* Headline */}
              {!!title && (
                <Heading as="h2" textStyle="h2" color="orange.500">
                  <MDXRenderer>{title}</MDXRenderer>
                </Heading>
              )}

              {/* Text */}
              {!!text && (
                <ContentStack>
                  <MDXRenderer>{text}</MDXRenderer>
                </ContentStack>
              )}
            </ContentStack>
          </GridItem>
        )}

        {/* Image 2 */}
        {!!imageData2 && (
          <GridItem
            gridColumn={gridConfig.image2.column}
            gridRow={gridConfig.image2.row}
          >
            <StyleableGatsbyImage
              image={imageData2}
              alt={image2.alt ?? ""}
              style={{ display: "block" }}
            />
          </GridItem>
        )}

        {/* Video */}
        {!!imageData3 && (
          <GridItem
            gridColumn={gridConfig.video.column}
            gridRow={gridConfig.video.row}
            {...salConfig}
          >
            {/* Video */}
            <Box
              as="video"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              preload="auto"
              w="full"
              display="block"
            >
              <source src={CardVideo} type="video/mp4" />

              {/* Fallback image */}
              <StyleableGatsbyImage
                image={imageData2}
                alt={image3.alt ?? ""}
                style={{ display: "block" }}
                imgStyle={{
                  objectFit: image3.fit,
                  objectPosition: image3.position,
                }}
                w="full"
              />
            </Box>
          </GridItem>
        )}

        {/* Social media post */}
        {!!socialMediaPost && (
          <GridItem
            gridColumn={gridConfig.socialMediaPost.column}
            gridRow={gridConfig.socialMediaPost.row}
            display={{ base: "none", xl: "block" }}
            alignSelf="flex-end"
          >
            <SocialMediaPost {...socialMediaPost} />
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default CardsBetaSection

export const query = graphql`
  fragment CardsBetaSectionFields on CardsBetaSection {
    type
    title
    slug
    spacing {
      ...SpacingFragment
    }

    text
    socialMediaPost: social_media_post {
      ...SocialMediaPostFragment
    }

    image1 {
      file {
        childImageSharp {
          gatsbyImageData(
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

    image2 {
      file {
        childImageSharp {
          gatsbyImageData(
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

    image3 {
      file {
        childImageSharp {
          gatsbyImageData(
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
`
