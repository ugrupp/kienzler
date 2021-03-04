import { AspectRatio, Box, Flex } from "@chakra-ui/react"
import React from "react"
import invert from "invert-color"

export interface ColorProps {
  hex: string
  title: string
  label: string
}

const Color: React.FC<ColorProps> = ({ hex, title, label }) => {
  const textColor = invert(hex, {
    black: "gray.500",
    white: "#fff",
    threshold: 0.5,
  })

  return (
    <AspectRatio ratio={18 / 11} bgColor={hex}>
      <Box>
        <Flex
          h="full"
          w="full"
          fontSize={["3xs", null, "xs"]}
          alignItems={["flex-start", null, "flex-end"]}
          justifyContent={["flex-end", null, "flex-start"]}
          flexDirection={["column", null, "row"]}
          gridGap={[null, null, 1]}
          px={[2]}
          py={[1]}
          color={textColor}
        >
          <Box as="strong">{title}</Box>
          <Box as="span">{label}</Box>
        </Flex>
      </Box>
    </AspectRatio>
  )
}

export default Color
