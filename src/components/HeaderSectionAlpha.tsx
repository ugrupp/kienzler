import { Box, chakra, GridItem, Heading, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ContainerGrid from "./ContainerGrid"
import { HeaderSectionModel } from "./HeaderSection"
import ShiftBy from "./ShiftBy"

const HeaderSectionAlpha: React.FC<HeaderSectionModel> = ({
  type,
  slug,
  title,
  image,
  text,
}) => {
  const imageData = getImage(image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <Box
      as="header"
      minHeight="100vh"
      pt={["24vh", null, "26vh", null, "33vh"]}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <ContainerGrid rowGap={[9]}>
        {/* Title */}
        {title && (
          <GridItem
            gridRow={[2, null, null, null, 1]}
            gridColumn={[
              "3 / main",
              "4 / main",
              "3 / 10",
              null,
              "3 / 7",
              null,
              "3 / 6",
            ]}
          >
            <Heading
              as="h1"
              textStyle="h1"
              sx={{
                strong: {
                  fontWeight: "inherit",
                  color: "orange.500",
                },
              }}
            >
              <ShiftBy y={"-0.2em"}>
                <MDXRenderer>{title}</MDXRenderer>
              </ShiftBy>
            </Heading>
          </GridItem>
        )}

        {/* Image */}
        {imageData && (
          <GridItem
            gridRow={[1, null, null, null, 1]}
            gridColumn={[
              "3 / full",
              "4 / full",
              "3 / main",
              null,
              "7 / main",
              null,
              "6 / main",
            ]}
            ml={[null, null, null, null, 7, 8]}
          >
            <StyleableGatsbyImage
              image={imageData}
              alt={image.alt ?? ""}
              objectFit={image.fit}
              objectPosition={image.position}
              style={{ display: "block" }}
              sx={{
                height: ["47vh", null, "51vh", null, "67vh"],
                minHeight: "100%",
              }}
            />
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default HeaderSectionAlpha
