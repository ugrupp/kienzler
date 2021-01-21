import { Box, chakra, GridItem, Heading, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import ContainerGrid from "./ContainerGrid"
import { HeaderSectionModel } from "./HeaderSection"

const HeaderSectionBeta: React.FC<HeaderSectionModel> = ({
  type,
  slug,
  title,
  image,
  text,
}) => {
  const imageData = getImage(image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Adjust typography
  const originalComponents = useMDXComponents()

  // Text
  const textComponents = {
    ...originalComponents,
    p: props => <Text textStyle="paragraph-lg" {...props} />,
  }

  return (
    <Box as="header" pt={["17vh", null, "20vh", null, "0"]}>
      <ContainerGrid rowGap={[9]}>
        {/* Text & title*/}
        {(!!text || !!title) && (
          <GridItem
            gridRow={[2, null, null, null, 1]}
            gridColumn={["3 / main", "4 / main", "3 / 10", "3 / 9", "3 / 6"]}
            mt={[null, null, null, null, "54vh"]}
          >
            {/* Title */}
            {!!title && (
              <Box
                as="h1"
                textStyle="paragraph-lg"
                color="orange.500"
                float="left"
                mr={2}
              >
                <MDXRenderer>{title}</MDXRenderer>
                <ArrowBoldIcon
                  boxSize={"0.7em"}
                  ml={2}
                  verticalAlign="baseline"
                />
              </Box>
            )}

            {/* Text */}
            <MDXProvider components={textComponents}>
              <MDXRenderer>{text}</MDXRenderer>
            </MDXProvider>
          </GridItem>
        )}

        {/* Image */}
        {imageData && (
          <GridItem
            gridRow={[1, null, null, null, 1]}
            gridColumn={["3 / full", "4 / full", "3 / main", null, "7 / main"]}
          >
            <StyleableGatsbyImage
              image={imageData}
              alt={image.alt ?? ""}
              objectFit={image.fit}
              objectPosition={image.position}
              style={{ display: "block" }}
              sx={{
                height: ["47vh", null, "51vh", null, "100vh"],
                minHeight: "100%",
              }}
            />
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default HeaderSectionBeta
