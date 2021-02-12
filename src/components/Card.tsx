import {
  Box,
  Button,
  ChakraTheme,
  Flex,
  GridItem,
  Heading,
  useTheme,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useState } from "react"
import ArrowIcon from "../icons/Arrow"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Image } from "../models/Image"
import { Link as LinkModel } from "../models/Link"
import { convertMSToInt } from "../util/helpers"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import Link from "./Link"
import { MotionBox } from "./MotionBox"
import ShiftBy from "./ShiftBy"

export interface CardModel {
  type: string
  title?: string
  image?: Image
  content?: string
  cta?: LinkModel
  gridColumns: {
    title: string[]
    image: string[]
    text: string[]
    cta: string[]
  }
  colorScheme: "default" | "white"
}

const Card: React.FC<CardModel> = ({
  title,
  image,
  content,
  cta,
  gridColumns,
  colorScheme = "default",
}) => {
  const imageData = getImage(image?.file)
  const [cardHover, setCardHover] = useState<true | undefined>(undefined)
  const theme: ChakraTheme = useTheme()
  const defaultGridColumns = {
    title: [
      "3 / -3",
      "4 / -3",
      "main / -5",
      "main / -7",
      "main / -3",
      "main / -4",
    ],
    image: ["3 / full", "4 / full", "main", "main / -5", "main"],
    text: [
      "3 / -3",
      "4 / -3",
      "main / -5",
      "main / -7",
      "main / -3",
      "main / -4",
    ],
    cta: [
      "3 / -3",
      "4 / -3",
      "main / -5",
      "main / -7",
      "main / -3",
      "main / -4",
    ],
  }

  gridColumns = {
    ...defaultGridColumns,
    ...gridColumns,
  }

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
    <Box
      display="block"
      position="relative"
      {...wrapperProps}
      color={colorScheme === "white" ? "white" : undefined}
    >
      <ContainerGrid
        sizes={[
          {
            mainColumns: 12,
            mainMaxWidth: "sm",
            outerSpace: 4,
          },
          null,
          {
            mainColumns: 10,
            mainMaxWidth: "container",
            outerSpace: 0,
          },
          null,
          {
            mainColumns: 10,
            mainMaxWidth: "container",
            outerSpace: 0,
          },
        ]}
      >
        {/* Title */}
        {!!title && (
          <GridItem gridColumn={gridColumns.title} mb={[6, null, 10]}>
            <Heading
              as="h2"
              textStyle="h2"
              color={colorScheme === "white" ? "white" : "orange.500"}
            >
              {title}
            </Heading>
          </GridItem>
        )}

        {/* Image */}
        {!!imageData && (
          <GridItem gridColumn={gridColumns.image} mb={[10, null, 12]}>
            <Flex
              alignItems="flex-end"
              pointerEvents="none" // workaround for https://github.com/gatsbyjs/gatsby/discussions/27950#discussioncomment-290788
            >
              {/* Icon */}
              <Box
                sx={{
                  marginRight: [4, null, 6],
                  flexShrink: 0,
                  color: colorScheme === "white" ? "white" : "orange.500",
                }}
              >
                <ArrowIcon
                  boxSize={[5, null, 6, null, 7]}
                  style={{ transform: "rotate(90deg)" }}
                />
              </Box>

              {/* Image */}
              <Box flexGrow={1} position="relative" overflow="hidden">
                <motion.div
                  initial={false}
                  animate={{
                    transform: cardHover ? "scale(1.1)" : "scale(1)",
                  }}
                  transition={{
                    type: "spring",
                    bounce: cardHover ? 0.4 : 0, // no overshoot on mouseout (image bg would be visible)
                  }}
                >
                  <GatsbyImage
                    image={imageData}
                    alt={image.alt ?? ""}
                    imgStyle={{
                      objectFit: image.fit,
                      objectPosition: image.position,
                    }}
                    style={{ display: "block" }}
                  />
                </motion.div>

                {/* Image overlay */}
                <AnimatePresence>
                  {cardHover && (
                    <MotionBox
                      position="absolute"
                      left={0}
                      right={0}
                      top={0}
                      bottom={0}
                      zIndex={5}
                      opacity={0}
                      bgGradient="linear-gradient(to-b, orange.500 0%, transparent 100%)"
                      sx={{
                        mixBlendMode: "multiply",
                      }}
                      transition={{
                        duration: convertMSToInt(
                          theme.transition.duration.slow
                        ),
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </Box>
            </Flex>
          </GridItem>
        )}

        {/* Content */}
        {!!content && (
          <GridItem gridColumn={gridColumns.text}>
            <ContentStack>
              <MDXRenderer>{content}</MDXRenderer>
            </ContentStack>
          </GridItem>
        )}

        {/* Button */}
        {!!cta && (
          <GridItem
            gridColumn={gridColumns.cta}
            mt={content ? [8, null, 10] : undefined}
          >
            <Button
              data-hover={cardHover}
              rightIcon={<ArrowBoldIcon />}
              colorScheme={colorScheme === "white" ? "white-dark" : undefined}
            >
              <ShiftBy y={"2px"}>{cta.label}</ShiftBy>
            </Button>
          </GridItem>
        )}
      </ContainerGrid>
    </Box>
  )
}

export default Card

export const query = graphql`
  fragment CardFragment on Card {
    type
    title
    content
    image {
      file {
        childImageSharp {
          gatsbyImageData(
            width: 800
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            quality: 75
          )
        }
      }
      alt
      fit
      position
    }
    cta {
      ...LinkFragment
    }
  }
`
