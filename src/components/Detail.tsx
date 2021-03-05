import { Box, chakra, ChakraTheme, useTheme } from "@chakra-ui/react"
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
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Image calculations
  const imageData = getImage(image?.file)
  const { height, width } = imageData
  const svgCircleRadius = 0.025 * Math.max(width, height)
  const svgStrokeWidth = 0.002 * Math.max(width, height)
  const svgLineOffset = 0.07 * Math.max(width, height)
  const tooltipPositionPercentages = tooltip.position.split(" ")
  const tooltipPadding = "1.75em"
  const imageAr = 0.7

  const [x, y] = tooltipPositionPercentages.map(
    (percent, idx) =>
      (parseInt(percent) / 100) *
      (idx === 0 ? imageData.width : imageData.height)
  )

  const imageSizes = [312, null, 500, null, null, 663]

  const imageStyles =
    imageData.width / imageData.height <= 1
      ? // Portrait
        {
          height: imageSizes,
          width: imageSizes.map(size => size * imageAr || null),
        }
      : // Landscape
        {
          height: imageSizes.map(size => size * imageAr || null),
          width: imageSizes,
        }

  return (
    <>
      {/* Don't render anything if image isn't there */}
      {imageData && (
        <Box
          position="relative"
          height={imageStyles.height}
          width={imageStyles.width}
        >
          {/* Image */}
          <Box position="relative">
            <StyleableGatsbyImage
              image={imageData}
              imgStyle={{ display: "block" }}
              style={{ display: "block" }}
              alt={image.alt ?? ""}
              {...imageStyles}
            />

            {/* Image overlay svg for tooltip indicator */}
            {!!title && (
              <Box
                position="absolute"
                left={0}
                right={0}
                bottom={0}
                top={0}
                zIndex={10} // > image
              >
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
            zIndex={10}
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
                : `calc(-${tooltipPadding} - 0.5em)`
            }
            mt={
              tooltip.direction === "bottom"
                ? -5
                : `calc(-${tooltipPadding} - 0.5em)`
            }
            width={[200, null, 250]}
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
            quality: 90
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
