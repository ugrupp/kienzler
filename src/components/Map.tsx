import { chakra } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"
import React from "react"

export const Map = ({ map }) => {
  const imageData = getImage(map.image.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  return (
    <Box h="full" w="full">
      {/* Image */}
      <StyleableGatsbyImage
        image={imageData}
        alt={map.image.alt ?? ""}
        style={{ display: "block" }}
        h="full"
        w="full"
        imgStyle={{
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
    </Box>
  )
}
