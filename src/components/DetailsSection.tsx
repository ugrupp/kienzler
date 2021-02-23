import { Box, chakra, GridItem, HStack, VisuallyHidden } from "@chakra-ui/react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { forwardRef, useRef } from "react"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import ArrowIcon from "../icons/Arrow"
import { Image } from "../models/Image"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import Detail, { DetailModel } from "./Detail"
import TitleText from "./TitleText"

SwiperCore.use([Navigation])

export interface NavButtonProps {
  type: "previous" | "next"
  ref: React.MutableRefObject<any>
}

const NavButton = forwardRef<any, NavButtonProps>(({ type }, ref) => {
  return (
    <Box
      ref={ref}
      as={"button"}
      height={["1.625rem", null, "1.875rem"]}
      width={["1.625rem", null, "1.875rem"]}
      color="currentColor"
      transitionProperty="all"
      transitionDuration="normal"
      appearance="none"
      p={0}
      _hover={{
        color: "orange.500",
      }}
      _focus={{
        outline: "none",
        color: "orange.500",
      }}
      sx={{
        "&.swiper-button-disabled": {
          opacity: 0.5,
          cursor: "not-allowed",
        },
      }}
      // @ts-ignore
      onClick={e => {
        e.currentTarget.blur()
      }}
    >
      <VisuallyHidden>
        {type === "next" ? "Nächstes Detail" : "Vorheriges Detail"}
      </VisuallyHidden>
      <ArrowIcon
        height="100%"
        width="100%"
        display="block"
        transform={type === "previous" ? "rotate(180deg)" : undefined}
      />
    </Box>
  )
})

export interface DetailsSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing
  backgroundImage?: Image
  text?: string
  details?: DetailModel[]
}

const DetailsSection: React.FC<DetailsSectionModel> = ({
  slug,
  text,
  backgroundImage,
  title,
  details,
}) => {
  // Background image
  const backgroundImageData = getImage(backgroundImage?.file)
  const StyleableGatsbyImage = chakra(GatsbyImage)

  // Nav refs
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const gridConfig = {
    titleText: {
      column: ["3 / main", "4 / main", "3 / 10", "3 / 9", "3 / 6"],
      row: 1,
    },
    controls: {
      column: ["3 / main", "4 / main", null, null, "6 / 10"],
      row: [2, null, 1],
    },
    slider: {
      column: ["3 / full", "4 / full", "3 / full"],
      row: [3, null, 2],
    },
    sliderTrackLine: {
      column: ["full"],
      row: [3, null, 2],
    },
  }

  return (
    <Box as="section" position="relative" id={slug}>
      {/* Background image */}
      {!!backgroundImageData && (
        <Box position="sticky" top={0} zIndex={0} height="100vh">
          <StyleableGatsbyImage
            image={backgroundImageData}
            alt={backgroundImage.alt ?? ""}
            imgStyle={{
              objectFit: "cover",
              objectPosition: backgroundImage.position,
            }}
            style={{ display: "block" }}
            height="100%"
          />
        </Box>
      )}

      {/* Background gradient overlay */}
      <Box
        position="relative"
        zIndex={5} // > bg image
        mt={!!backgroundImageData ? "-100vh" : undefined}
        height="100vh"
        bgGradient="linear-gradient(to-b, white, transparent)"
        opacity={0.4}
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={10} // > bg image, > bg gradient
        mt="-100vh"
        pt={[40, null, 48]}
        pb={[64, null, 72]}
      >
        <ContainerGrid rowGap={[10]}>
          {/* Text & title */}
          {(!!text || !!title) && (
            <GridItem
              gridRow={gridConfig.titleText.row}
              gridColumn={gridConfig.titleText.column}
              mb={[10, null, 0]}
            >
              <TitleText title={title} text={text} />
            </GridItem>
          )}

          {/* Controls */}
          <GridItem
            gridRow={gridConfig.controls.row}
            gridColumn={gridConfig.controls.column}
            alignSelf="flex-end"
          >
            <HStack spacing={5} justifyContent={{ md: "flex-end" }}>
              {/* Previous */}
              <NavButton type="previous" ref={prevRef} />

              {/* Custom spacer */}
              <Box height="1px" bgColor="currentColor" width={8} />

              {/* Next */}
              <NavButton type="next" ref={nextRef} />
            </HStack>
          </GridItem>

          {/* Slider */}
          <GridItem
            gridRow={gridConfig.slider.row}
            gridColumn={gridConfig.slider.column}
            mt={[null, null, 14]}
          >
            <Swiper
              spaceBetween={180}
              slidesPerView="auto"
              grabCursor={true}
              lazy={{
                checkInView: true,
                loadPrevNext: true,
                loadPrevNextAmount: 3,
              }}
              onInit={swiper => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.prevEl = prevRef.current
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.nextEl = nextRef.current
                swiper.update()
              }}
            >
              {details.map((detail, idx) => (
                // Global styles are applied to .swiper-slide-details to set the slide width
                <SwiperSlide key={idx} className="swiper-slide-details">
                  <Detail {...detail} />
                </SwiperSlide>
              ))}
            </Swiper>
          </GridItem>

          {/* Slider track line */}
          <GridItem
            gridRow={gridConfig.sliderTrackLine.row}
            gridColumn={gridConfig.sliderTrackLine.column}
            mt={[null, null, 14]}
            pt={[10, null, 12]}
            height="px"
            backgroundRepeat="repeat-x"
            bgGradient="linear-gradient(to-r, gray.500, gray.500 50%, transparent 50%, transparent 100%)"
            backgroundSize="7px 1px"
            backgroundPosition="bottom"
          />
        </ContainerGrid>
      </Box>
    </Box>
  )
}

export default DetailsSection

export const query = graphql`
  fragment DetailsSectionFields on DetailsSection {
    type
    slug
    title
    text
    backgroundImage: background_image {
      file {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 90)
        }
      }
      alt
      fit
      position
    }
    details {
      ... on DetailsYaml {
        ...DetailsFragment
      }
    }
  }
`
