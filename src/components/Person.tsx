import { chakra, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Image } from "../models/Image"

export interface PersonProps {
  firstName: string
  lastName: string
  image: Image
  namePosition?: "left" | "right"
}

const Person: React.FC<PersonProps> = ({
  firstName,
  lastName,
  image,
  namePosition = "right",
}) => {
  const StyleableGatsbyImage = chakra(GatsbyImage)
  const imageData = getImage(image?.file)

  return (
    <Flex
      align="center"
      key={`${firstName}-${lastName}-${image.file.id}`}
      direction={namePosition === "right" ? "row" : "row-reverse"}
    >
      {/* Image */}
      <StyleableGatsbyImage
        width="full"
        image={imageData}
        alt={image.alt ?? `${firstName} ${lastName}` ?? ""}
        style={{ display: "block" }}
      />

      {/* Name */}
      <Text
        textStyle="paragraph"
        fontWeight="bold"
        textTransform="uppercase"
        sx={{
          [namePosition === "right" ? "ml" : "mr"]: [-4, null, -5, -6],
        }}
        pos="relative"
      >
        {firstName} <br />
        {lastName}
      </Text>
    </Flex>
  )
}

export default Person
