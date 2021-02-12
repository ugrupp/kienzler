import { Box, ChakraTheme, useTheme } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Image } from "../models/Image"

export interface DetailModel {
  id: string
  title: string
  text?: string
  image?: Image
  tooltip?: {
    position: string
    direction: "right" | "bottom"
  }
}

const Detail: React.FC<DetailModel> = ({ title, text, image, tooltip }) => {
  const theme: ChakraTheme = useTheme()

  // Image calculations
  const imageData = getImage(image?.file)
  const { height, width } = imageData
  const svgCircleRadius = 0.025 * Math.max(width, height)
  const svgStrokeWidth = 0.002 * Math.max(width, height)
  const svgLineOffset = 0.07 * Math.max(width, height)
  const tooltipPositionPercentages = tooltip.position.split(" ")
  const tooltipPadding = 8

  const [x, y] = tooltipPositionPercentages.map(
    (percent, idx) =>
      (parseInt(percent) / 100) *
      (idx === 0 ? imageData.width : imageData.height)
  )

  return (
    <>
      {/* Don't render anything if image isn't there */}
      {imageData && (
        <Box position="relative">
          {/* Image */}
          <Box
            position="relative"
            maxWidth={imageData.width / imageData.height > 1 ? 500 : undefined}
          >
            <GatsbyImage
              image={imageData}
              alt={image.alt ?? ""}
              style={{ display: "block" }}
            />

            {/* Image overlay svg for tooltip indicator */}
            {!!title && (
              <Box position="absolute" left={0} right={0} bottom={0} top={0}>
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  height="100%"
                  width="100%"
                >
                  <line
                    x1={tooltip.direction === "right" ? x + svgCircleRadius : x}
                    y1={
                      tooltip.direction === "bottom" ? y + svgCircleRadius : y
                    }
                    x2={
                      tooltip.direction === "right" ? width - svgLineOffset : x
                    }
                    y2={
                      tooltip.direction === "bottom"
                        ? height - svgLineOffset
                        : y
                    }
                    stroke="white"
                    strokeWidth={svgStrokeWidth}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={svgCircleRadius}
                    fill={theme.colors.orange[500]}
                    fillOpacity={0.8}
                    stroke="white"
                    strokeWidth={svgStrokeWidth}
                  />
                </svg>
              </Box>
            )}
          </Box>

          {/* Tooltip */}
          <Box
            position="absolute"
            left={
              tooltip.direction === "right"
                ? "100%"
                : tooltipPositionPercentages[0]
            }
            top={
              tooltip.direction === "bottom"
                ? "100%"
                : tooltipPositionPercentages[1]
            }
            ml={
              tooltip.direction === "right"
                ? -5
                : `calc(-${theme.space[tooltipPadding]} - 0.5em)`
            }
            mt={
              tooltip.direction === "bottom"
                ? -5
                : `calc(-${theme.space[tooltipPadding]} - 0.5em)`
            }
            width={250}
            p={tooltipPadding}
            color="white"
            textStyle="paragraph"
            // Background
            _before={{
              content: "''",
              backgroundColor: "orange.500",
              opacity: 0.8,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            {/* The little arrow */}
            <ArrowBoldIcon
              boxSize={"1em"}
              verticalAlign="baseline"
              position="absolute"
              left={tooltip.direction === "right" ? 0 : tooltipPadding}
              top={tooltip.direction === "bottom" ? 0 : tooltipPadding}
              sx={{
                transform:
                  tooltip.direction === "bottom"
                    ? "translateY(-50%) rotate(90deg)"
                    : "translateX(-50%)",
              }}
            />

            {/* Content */}
            {!!title && (
              <Box position="relative" zIndex={5}>
                <Box
                  as="h4"
                  fontWeight="bold"
                  textTransform="uppercase"
                  // ShiftBy, but with margins so surrounding box will shrink also, too.
                  // TODO: move this into ShiftBy?
                  mt="-0.2em"
                  mb="-0.2em"
                >
                  {title}
                </Box>

                {/* Text */}
                {!!text && <MDXRenderer>{text}</MDXRenderer>}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default Detail

export const query = graphql`
  fragment DetailsFragment on DetailsYaml {
    title
    text
    image {
      file {
        childImageSharp {
          gatsbyImageData(
            height: 500
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
    tooltip {
      position
      direction
    }
  }
`
