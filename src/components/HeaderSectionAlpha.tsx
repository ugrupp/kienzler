import { Box, Button, chakra, GridItem, Text } from "@chakra-ui/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"
import { HeaderSectionModel } from "./HeaderSection"
import ShiftBy from "./ShiftBy"
// @ts-ignore
import HomepageVideo from "../videos/homepage.mp4"
// @ts-ignore
import PosterVideo from "../images/platzhalter-video.jpg"

const HeaderSectionAlpha: React.FC<HeaderSectionModel> = ({
  slug,
  title,
  image,
  showVideo,
  videoUrl,
}) => {
  const imageData = getImage(image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <Box
      as="header"
      id={slug}
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
            <Text
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
            </Text>
          </GridItem>
        )}

        {/* Video */}
        {showVideo && (
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
            {/* Video */}
            <Box
              as="video"
              autoPlay={true}
              loop={true}
              muted={true}
              controls={true}
              playsInline={true}
              preload="auto"
              poster={PosterVideo}
              objectFit="cover"
              objectPosition="50% 50%"
              height={["47vh", null, "51vh", null, "67vh"]}
              w="full"
              display="block"
            >
              <source src={HomepageVideo} type="video/mp4" />
            </Box>
            {videoUrl && (
              <GridItem mt={[4, null, 5]} display="flex">
                <Button
                  rightIcon={<ArrowBoldIcon />}
                  as={Link}
                  to={videoUrl}
                  target="_blank"
                  ml={[null, null, "auto"]}
                >
                  <ShiftBy y={"2px"}>Video Ansehen</ShiftBy>
                </Button>
              </GridItem>
            )}
          </GridItem>
        )}

        {/* Image */}
        {/* Show image if there is no video */}
        {!showVideo && imageData && (
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
      </ContainerGrid>
    </Box>
  )
}

export default HeaderSectionAlpha
