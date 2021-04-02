import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Spacing } from "../models/Spacing"
import Color, { ColorProps } from "./Color"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import { salConfig } from "./SALWrapper"

export interface ColorsSectionProps {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text: string
  colorGroups: {
    groups: Array<{
      items: Array<ColorProps>
    }>
  }
}

const ColorsSection: React.FC<ColorsSectionProps> = ({
  title,
  slug,
  text,
  colorGroups,
}) => {
  return (
    <Box as="section" position="relative" id={slug}>
      {/* Head section */}
      <ContainerGrid rowGap={[10]} {...salConfig}>
        <GridItem
          gridColumn={[
            "3 / main",
            "4 / main",
            "main / span 7",
            "3 / 9",
            "3 / 6",
          ]}
        >
          <ContentStack>
            {/* Title */}
            {!!title && (
              <Heading as="h2" textStyle="h2" color="orange.500">
                {title}
              </Heading>
            )}

            {/* Text */}
            {!!text && <MDXRenderer>{text}</MDXRenderer>}
          </ContentStack>
        </GridItem>
      </ContainerGrid>

      {/* Colors grid */}
      <ContainerGrid mt={[16, null, 20]}>
        <GridItem
          gridColumn={[
            "3 / main",
            "4 / main",
            "main / main",
            "3 / 13",
            "3 / 10",
          ]}
        >
          <Grid
            rowGap={[10, null, 14]}
            columnGap={[5, null, 12, null, 16, 20, 24]}
            templateColumns={[
              "repeat(2, 1fr)",
              null,
              "repeat(3, 1fr)",
              null,
              null,
              null,
              "repeat(4, 1fr)",
            ]}
          >
            {colorGroups.groups.map(({ items }) => {
              let newRow = true

              return items.map(({ hex, title, label }) => {
                const item = (
                  <GridItem
                    key={hex}
                    gridColumnStart={newRow ? 1 : undefined}
                    {...salConfig}
                  >
                    <Color title={title} hex={hex} label={label} />
                  </GridItem>
                )

                newRow = false
                return item
              })
            })}
          </Grid>
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default ColorsSection

export const query = graphql`
  fragment ColorsSectionFragment on ColorsSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }

    text
    colorGroups: color_groups {
      groups {
        items {
          hex
          title
          label
        }
      }
    }
  }
`
