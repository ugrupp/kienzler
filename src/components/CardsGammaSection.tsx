import { Box, GridItem, useToken, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { pick } from "lodash"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import React from "react"
import { Image } from "../models/Image"
import { Link } from "../models/Link"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import Person from "./Person"
import SocialMediaPost, { SocialMediaPostModel } from "./SocialMediaPost"
import PhoneBoldIcon from "../icons/PhoneBold"
import { salConfig } from "./SALWrapper"

export interface CardsGammaSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  socialMediaPost?: SocialMediaPostModel
  text?: string
  contact: {
    text: string
    firstName: string
    lastName: string
    image: Image
    phone: Link
    mail: Link
  }
}

const CardsGammaSection: React.FC<CardsGammaSectionModel> = ({
  slug,
  title,
  text,
  spacing,
  socialMediaPost,
  contact,
}) => {
  // Grid columns config
  const gridConfig = {
    text: {
      row: [1, null, null, null, "1 / span 2"],
      column: [
        "3 / 13",
        "4 / 13",
        "3 / span 6",
        "3 / span 5",
        "3 / span 4",
        null,
        "3 / span 3",
      ],
    },
    socialMediaPost: {
      row: [2, null, null, null, 1],
      column: [
        "3 / span 5",
        "4 / span 5",
        "main / span 5",
        "main / span 4",
        "9 / span 3",
        "10 / span 2",
      ],
    },
    contact: {
      row: [3, null, 2, null, 2],
      column: [
        "span 8 / 13",
        "span 7 / 13",
        "span 4 / main",
        "span 3 / main",
        "8 / span 3",
        "9 / span 2",
      ],
    },
  }

  // Adjust typography
  const originalComponents = useMDXComponents()

  // strong tag
  const textComponents = {
    ...originalComponents,
    strong: props => (
      <Text
        as="strong"
        sx={{
          color: "orange.500",
          textTransform: "uppercase",
          fontSize: ["2xs", null, null, "xs"],
        }}
        {...props}
      />
    ),
  }

  // Get top spacing as rem values
  const tokenizedTopSpacing = useToken("space", spacing.top as string[])

  return (
    <Box
      as="section"
      position="relative"
      id={slug}
      sx={{ scrollMarginTop: tokenizedTopSpacing }}
    >
      <ContainerGrid rowGap={[24, null, null, null, 48]}>
        {/* Text column */}
        {(!!title || !!text) && (
          <GridItem
            gridColumn={gridConfig.text.column}
            gridRow={gridConfig.text.row}
            alignSelf="flex-end"
            pb={{ xl: 32, "2xl": 64 }}
            {...salConfig}
          >
            <ContentStack>
              {/* Headline */}
              {!!title && (
                <Text as="h2" textStyle="h2" color="orange.500">
                  <MDXRenderer>{title}</MDXRenderer>
                </Text>
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

        {/* Social media post */}
        {!!socialMediaPost && (
          <GridItem
            gridColumn={gridConfig.socialMediaPost.column}
            gridRow={gridConfig.socialMediaPost.row}
            pt={{ md: 24, xl: 0 }}
          >
            <SocialMediaPost {...socialMediaPost} />
          </GridItem>
        )}

        {/* Contact */}
        {!!contact && (
          <GridItem
            gridColumn={gridConfig.contact.column}
            gridRow={gridConfig.contact.row}
            {...salConfig}
          >
            <ContentStack>
              {/* Text */}
              {!!contact.text && (
                <MDXProvider components={textComponents}>
                  <MDXRenderer>{contact.text}</MDXRenderer>
                </MDXProvider>
              )}

              {/* Person */}
              {!!contact.image && (
                <Person
                  {...pick(contact, ["firstName", "lastName", "image"])}
                  namePosition="left"
                />
              )}

              {/* Info */}
              {(!!contact.phone || !!contact.mail) && (
                <Box>
                  {/* Phone */}
                  {!!contact.phone && (
                    <Box
                      as="a"
                      href={contact.phone.url}
                      title="Telefon"
                      _hover={{ color: "orange.500" }}
                      transitionProperty="colors"
                      transitionDuration="normal"
                      display="block"
                      textStyle="paragraph"
                    >
                      <PhoneBoldIcon
                        sx={{
                          color: "orange.500",
                          height: "0.8em",
                          width: "0.8em",
                          marginRight: "0.3em",
                          verticalAlign: "baseline",
                        }}
                      />{" "}
                      {contact.phone.label}
                    </Box>
                  )}

                  {/* Mail */}
                  {!!contact.mail && (
                    <Box
                      as="a"
                      href={contact.mail.url}
                      title="E-Mail"
                      _hover={{ color: "orange.500" }}
                      transitionProperty="colors"
                      transitionDuration="normal"
                      display="block"
                      textStyle="paragraph"
                    >
                      {contact.mail.label}
                    </Box>
                  )}
                </Box>
              )}
            </ContentStack>
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default CardsGammaSection

export const query = graphql`
  fragment CardsGammaSectionFields on CardsGammaSection {
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
    contact {
      text
      firstName: first_name
      lastName: last_name

      image {
        file {
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
      phone {
        url
        label
        target
      }
      mail {
        url
        label
        target
      }
    }
  }
`
