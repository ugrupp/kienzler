import { AspectRatio, Box, Flex, Img, Text, useToken } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import { Image } from "../models/Image"
import ContentStack from "./ContentStack"

export interface GarageSizeProps {
  title: string
  widths?: string
  lengths?: string
  heights?: string
  image?: Image
  index?: number
}

const GarageSize: React.FC<GarageSizeProps> = ({
  title,
  widths = "",
  lengths = "",
  heights = "",
  image,
  index,
}) => {
  const dimensions: Array<{
    label: string
    value: string
  }> = []
  dimensions.push({
    label: "Breite",
    value: widths,
  })

  dimensions.push({
    label: "Länge",
    value: lengths,
  })

  dimensions.push({
    label: "Höhe",
    value: heights,
  })

  return (
    <AspectRatio ratio={1}>
      <Box>
        {/* Background */}
        <Box
          pos="absolute"
          h="full"
          w="full"
          left={0}
          right={0}
          top={0}
          bottom={0}
          bgColor="gray.50"
          transform={`translateX(${useToken("space", 3)})`}
        >
          {/* Image */}
          {!!image?.file?.publicURL && (
            <Flex
              position="absolute"
              h="full"
              w="full"
              left={0}
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
            >
              <Img
                // @ts-ignore
                src={image.file.publicURL}
                alt={image.alt ?? ""}
                opacity={0.6}
                width="70%"
                height="70%"
                objectFit="contain"
              />
            </Flex>
          )}
        </Box>

        {/* Content */}
        <Flex h="full" w="full" alignItems="center" pos="relative" zIndex={10}>
          <ContentStack spacing={4}>
            {/* Title */}
            {!!title && (
              <Text as="h3" textStyle="h3" color="orange.500">
                {title}
              </Text>
            )}

            {/* Dimensions */}
            {dimensions.length && (
              <Box>
                {dimensions.map(({ label, value }) => (
                  <Text key={label} textStyle="paragraph" lineHeight="tall">
                    {value ? (
                      <>
                        <Text as="strong" textTransform="uppercase">
                          {label}:
                        </Text>{" "}
                        {value}
                      </>
                    ) : (
                      <br />
                    )}
                  </Text>
                ))}
              </Box>
            )}
          </ContentStack>
        </Flex>

        {/* Index */}
        {!!index && (
          <Flex
            pos="absolute"
            zIndex={10}
            bottom={[10, null, 12]}
            transform="translateY(50%);"
            left={0}
            width={6}
            height={6}
            alignItems="center"
            justifyContent="center"
            borderColor="orange.500"
            borderWidth="1px"
            bgColor="#fff"
            color="orange.500"
            fontSize="4xs"
            fontWeight="bold"
          >
            {index}
          </Flex>
        )}
      </Box>
    </AspectRatio>
  )
}

export default GarageSize

export const query = graphql`
  fragment GarageSizeFragment on GarageSize {
    title
    widths
    lengths
    heights
    image {
      file {
        publicURL
      }
      alt
    }
  }
`
