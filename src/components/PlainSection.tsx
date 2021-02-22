import { Box, GridItem, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"

// Borrowed from ContentStack component
const contentSpacing = [5, null, 6, null, 7]

interface TextColumnProps {
  text: string
}

const TextColumn: React.FC<TextColumnProps> = ({ text }) => {
  // Adjust typography
  const originalComponents = useMDXComponents()
  const modifiedComponents = {
    ...originalComponents,
    strong: props => (
      <Text
        as="strong"
        sx={{ fontWeight: "inherit", color: "orange.500" }}
        {...props}
      />
    ),
    h4: props =>
      originalComponents.h4({
        ...props,
        color: "orange.500",
        lineHeight: "tall",
      }),
    h5: props =>
      originalComponents.h5({
        ...props,
        lineHeight: "tall",
      }),
    a: props => (
      <Box
        {...props}
        as={Link}
        _hover={{ color: "orange.500" }}
        transitionProperty="colors"
        transitionDuration="normal"
      />
    ),
  }

  return (
    <Box
      sx={{
        "& > * ~ *:not(h4 + p, h5 + p)": {
          mt: contentSpacing,
        },
      }}
    >
      <MDXProvider components={modifiedComponents}>
        <MDXRenderer>{text}</MDXRenderer>
      </MDXProvider>
    </Box>
  )
}

export interface PlainSectionProps {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  textCol1: string
  textCol2: string
}

const PlainSection: React.FC<PlainSectionProps> = ({
  slug,
  textCol1,
  textCol2,
}) => {
  const gridConfig = {
    col1: {
      row: 1,
      column: [
        "3 / 13",
        "4 / 13",
        "3 / span 6",
        "3 / span 5",
        "3 / span 4",
        "3 / span 3",
      ],
    },
    col2: {
      row: [2, null, null, 1],
      column: [
        "3 / 13",
        "4 / 13",
        "3 / span 6",
        "9 / span 5",
        "9 / span 4",
        "9 / span 3",
      ],
    },
  }

  return (
    <Box
      as="section"
      position="relative"
      id={slug}
      pt={["24vh", null, "26vh", null, "33vh"]}
    >
      <ContainerGrid rowGap={contentSpacing}>
        {/* Text column 1 */}
        <GridItem
          gridColumn={gridConfig.col1.column}
          gridRow={gridConfig.col1.row}
        >
          <TextColumn text={textCol1} />
        </GridItem>

        {/* Text column 2 */}
        <GridItem
          gridColumn={gridConfig.col2.column}
          gridRow={gridConfig.col2.row}
        >
          <TextColumn text={textCol2} />
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default PlainSection

export const query = graphql`
  fragment PlainSectionFragment on PlainSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }

    textCol1
    textCol2
  }
`
