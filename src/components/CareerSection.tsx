import { Button, GridItem, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Link } from "../models/Link"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ShiftBy from "./ShiftBy"
import TitleText from "./TitleText"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export interface CareerSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text?: string
  ctaText?: string
  cta?: Link
  images?: Image[]
}

const CareerSection: React.FC<CareerSectionModel> = ({
  type,
  slug,
  title,
  text,
  ctaText,
  cta,
  images,
}) => {
  // Adjust typography
  const originalComponents = useMDXComponents()

  // strong tag
  const textComponents = {
    ...originalComponents,
    strong: props => (
      <Text
        as="strong"
        sx={{ fontWeight: "inherit", color: "orange.500" }}
        {...props}
      />
    ),
  }

  return (
    <ContainerGrid>
      {/* Image 1 */}
      {!!images?.[0] && (
        <GridItem
          gridRow={["1", null, null, null, "1 / span 2"]}
          gridColumn={[
            "full / 13",
            null,
            "main / 13",
            "main / span 6",
            null,
            null,
            "main / span 5",
          ]}
        >
          <GatsbyImage
            image={getImage(images?.[0]?.file)}
            alt={images?.[0].alt ?? ""}
            style={{ display: "block" }}
          />
        </GridItem>
      )}

      {/* Text & title */}
      {(!!text || !!title) && (
        <GridItem
          mt={[28, null, 36, null, 24]}
          gridRow={["2", null, null, null, "3 / span 2"]}
          gridColumn={[
            "3 / 13",
            "4 / 13",
            "3 / span 6",
            "3 / span 5",
            "4 / span 4",
            "5 / span 3",
            "4 / span 3",
          ]}
        >
          <TitleText title={title} text={text} />
        </GridItem>
      )}

      {/* CTA section */}
      {(!!ctaText || !!cta) && (
        <GridItem
          mt={[16, null, 24]}
          gridRow={["3", null, null, null, "4"]}
          gridColumn={[
            "3 / 13",
            "4 / 13",
            "8 / span 6",
            "8 / span 5",
            "8 / span 4",
            null,
            "9 / span 3",
          ]}
        >
          {/* Text */}
          {!!ctaText && (
            <MDXProvider components={textComponents}>
              <MDXRenderer>{ctaText}</MDXRenderer>
            </MDXProvider>
          )}

          {/* Button */}
          {!!cta && (
            <Button rightIcon={<ArrowBoldIcon />} mt={[8, null, 10]}>
              <ShiftBy y={"2px"}>{cta.label}</ShiftBy>
            </Button>
          )}
        </GridItem>
      )}

      {/* Image 2 */}
      {!!images?.[1] && (
        <GridItem
          mt={[28, null, 36, null, 0]}
          gridRow={["4", null, null, null, "2 / span 2"]}
          gridColumn={[
            "3 / span 5",
            "4 / span 5",
            "3 / span 5",
            "3 / span 4",
            "span 3 / main",
          ]}
        >
          <GatsbyImage
            image={getImage(images?.[1]?.file)}
            alt={images?.[1].alt ?? ""}
            style={{ display: "block" }}
          />
        </GridItem>
      )}

      {/* Image 3 */}
      {!!images?.[2] && (
        <GridItem
          mt={[null, null, null, null, 48]}
          gridRow={[null, null, null, null, "5"]}
          gridColumn={[
            null,
            null,
            null,
            null,
            "4 / span 4",
            "5 / span 3",
            "4 / span 3",
          ]}
          display={["none", null, null, null, "block"]}
        >
          <GatsbyImage
            image={getImage(images?.[2]?.file)}
            alt={images?.[2].alt ?? ""}
            style={{ display: "block" }}
          />
        </GridItem>
      )}
    </ContainerGrid>
  )
}

export default CareerSection

export const query = graphql`
  fragment CareerSectionFragment on CareerSection {
    type
    title
    slug
    spacing {
      ...SpacingFragment
    }
    text
    ctaText: cta_text
    cta {
      ...LinkFragment
    }
    images {
      file {
        childImageSharp {
          gatsbyImageData(
            width: 840
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 95
          )
        }
      }
    }
  }
`
