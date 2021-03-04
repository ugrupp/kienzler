import { Box, GridItem, Heading } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React, { useRef } from "react"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import GarageSize, { GarageSizeProps } from "./GarageSize"
import NavButtons from "./NavButtons"

SwiperCore.use([Navigation])

export interface SizesSectionProps {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  sizes: GarageSizeProps[]
}

const SizesSection: React.FC<SizesSectionProps> = ({ sizes, slug, title }) => {
  // Nav refs
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const gridConfig = {
    head: {
      column: ["3 / main", "4 / main", "3 / 10", "3 / 9", "3 / 6"],
      row: 1,
    },
    controls: {
      column: ["3 / main", "4 / main", null, null, "span 3 / main"],
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
      <ContainerGrid rowGap={[10]}>
        {/* Title */}
        {!!title && (
          <GridItem
            gridRow={gridConfig.head.row}
            gridColumn={gridConfig.head.column}
            mb={[10, null, 0]}
          >
            <Heading as="h3" textStyle="h3" color="orange.500">
              {title}
            </Heading>
          </GridItem>
        )}

        {/* Controls */}
        <GridItem
          gridRow={gridConfig.controls.row}
          gridColumn={gridConfig.controls.column}
          alignSelf="flex-end"
        >
          <NavButtons prevRef={prevRef} nextRef={nextRef} />
        </GridItem>

        {/* Slider */}
        <GridItem
          gridRow={gridConfig.slider.row}
          gridColumn={gridConfig.slider.column}
          mt={[null, null, 14]}
        >
          <Swiper
            spaceBetween={100}
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
            {sizes.map((size, idx) => (
              // Global styles are applied to .swiper-slide-details to set the slide width
              <SwiperSlide key={size.title} className="swiper-slide-sizes">
                <GarageSize {...size} index={idx + 1} />
              </SwiperSlide>
            ))}
          </Swiper>
        </GridItem>

        {/* Slider track line */}
        <GridItem
          gridRow={gridConfig.sliderTrackLine.row}
          gridColumn={gridConfig.sliderTrackLine.column}
          alignSelf="flex-end"
          pb={[10, null, 12]}
          height="px"
          backgroundRepeat="repeat-x"
          bgGradient="linear-gradient(to-r, gray.200, gray.200 50%, transparent 50%, transparent 100%)"
          backgroundSize="7px 1px"
          backgroundPosition="top"
        />
      </ContainerGrid>
    </Box>
  )
}

export default SizesSection

export const query = graphql`
  fragment SizesSectionFragment on SizesSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }

    sizes {
      ...GarageSizeFragment
    }
  }
`
