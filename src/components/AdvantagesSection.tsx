import { Box, GridItem, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import { salConfig } from "./SALWrapper"

export interface AdvantagesSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text?: string
  advantages?: string
}

const AdvantagesSection: React.FC<AdvantagesSectionModel> = ({
  title,
  slug,
  text,
  advantages,
}) => {
  const gridConfig = {
    text: {
      row: 1,
      column: ["3 / main", "4 / main", "span 7 / 13", "span 6 / 13", "3 / 6"],
    },
    advantages: {
      row: [2, null, null, null, 1],
      column: [
        "3 / main",
        "4 / main",
        "span 7 / 13",
        "span 6 / 13",
        "span 3 / 13",
      ],
    },
  }
  return (
    <Box as="section" position="relative" id={slug}>
      <ContainerGrid rowGap={[20, null, 32]}>
        {/* Text column */}
        {!!text && (
          <GridItem
            gridRow={gridConfig.text.row}
            gridColumn={gridConfig.text.column}
            {...salConfig}
          >
            <MDXRenderer>{text}</MDXRenderer>
          </GridItem>
        )}

        {/* Advantages column */}
        {(!!title || !!advantages) && (
          <GridItem
            gridRow={gridConfig.advantages.row}
            gridColumn={gridConfig.advantages.column}
            {...salConfig}
          >
            <ContentStack>
              {/* Title */}
              {!!title && (
                <Text as="h3" textStyle="h3" color="orange.500">
                  {title}
                </Text>
              )}

              {/* Advantages */}
              {!!advantages && <MDXRenderer>{advantages}</MDXRenderer>}
            </ContentStack>
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default AdvantagesSection

export const query = graphql`
  fragment AdvantagesSectionFields on AdvantagesSection {
    type
    slug
    spacing {
      ...SpacingFragment
    }
    title
    text
    advantages
  }
`
