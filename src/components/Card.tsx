import {
  Box,
  Button,
  Flex,
  Heading,
  ScaleFade,
  Theme,
  useTheme,
} from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useState } from "react"
import ArrowIcon from "../icons/Arrow"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Image } from "../models/Image"
import { Link as LinkModel } from "../models/Link"
import { convertMSToInt } from "../util/helpers"
import Link from "./Link"
import { MotionBox } from "./MotionBox"
import ShiftBy from "./ShiftBy"

export interface CardModel {
  type: string
  title?: string
  image?: Image
  content?: string
  cta?: LinkModel
}

const Card: React.FC<CardModel> = ({ title, image, content, cta }) => {
  const imageData = getImage(image?.file)
  const [cardHover, setCardHover] = useState<true | undefined>(undefined)
  const theme: Theme = useTheme()

  // Wrapper props (conditionally renders a link)
  const wrapperProps = cta
    ? {
        as: Link,
        to: cta.url,
        target: cta.target,
        onMouseEnter: () => setCardHover(true),
        onMouseLeave: () => setCardHover(undefined),
      }
    : {}

  return (
    <Box display="block" position="relative" {...wrapperProps}>
      {/* Title */}
      {!!title && (
        <Heading as="h2" textStyle="h2" color="orange.500" mb={[6, null, 10]}>
          {title}
        </Heading>
      )}

      {/* Image */}
      {!!imageData && (
        <Flex
          mb={[10, null, 12]}
          alignItems="flex-end"
          pointerEvents="none" // workaround for https://github.com/gatsbyjs/gatsby/discussions/27950#discussioncomment-290788
        >
          {/* Icon */}
          <Box
            sx={{
              marginRight: [4, null, 6],
              flexShrink: 0,
              color: "orange.500",
            }}
          >
            <ArrowIcon
              boxSize={[5, null, 6, null, 7]}
              style={{ transform: "rotate(90deg)" }}
            />
          </Box>

          {/* Image */}
          <Box flexGrow={1} position="relative" overflow="hidden">
            <GatsbyImage
              image={imageData}
              alt={image.alt ?? ""}
              objectFit={image.fit}
              objectPosition={image.position}
            />

            {/* Image overlay */}
            <AnimatePresence>
              {cardHover && (
                <MotionBox
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 10,
                    mixBlendMode: "multiply",
                    backgroundImage: `linear-gradient(180deg, rgba(234, 106, 31, 1) 0%, rgba(234, 106, 31, 0) 100%)`,
                  }}
                  transition={{
                    duration: convertMSToInt(theme.transition.duration.slow),
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </Box>
        </Flex>
      )}

      {/* Content */}
      {!!content && (
        <Box>
          <MDXRenderer>{content}</MDXRenderer>
        </Box>
      )}

      {/* Button */}
      {!!cta && (
        <Button
          data-hover={cardHover}
          mt={content ? [8, null, 10] : undefined}
          rightIcon={<ArrowBoldIcon />}
        >
          <ShiftBy y={2}>{cta.label}</ShiftBy>
        </Button>
      )}
    </Box>
  )
}

export default Card
