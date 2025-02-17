import { Box, GridItem, Text } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React, { useRef } from "react"
import SwiperCore, { Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import { Spacing } from "../models/Spacing"
import ContainerGrid from "./ContainerGrid"
import ContentStack from "./ContentStack"
import NavButtons from "./NavButtons"
import Reference, { ReferenceModel } from "./Reference"
import { salConfig } from "./SALWrapper"

SwiperCore.use([Navigation])

export interface ReferencesSectionProps {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  references: Array<ReferenceModel>
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  slug,
  title,
  references,
}) => {
  // Nav refs
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const gridConfig = {
    title: {
      column: ["3 / main", "4 / main", "3 / 10", "3 / 9", "3 / 6"],
      row: 1,
    },
    controls: {
      column: ["3 / main", "4 / main", "3 / 10", "10 / main", "10 / 13"],
      row: [2, null, null, 3],
    },
    slider: {
      column: "full",
      row: 3,
    },
  }

  return (
    <Box as="section" position="relative" id={slug}>
      <ContainerGrid rowGap={[10]} {...salConfig}>
        {/* Title */}
        <GridItem
          gridRow={gridConfig.title.row}
          gridColumn={gridConfig.title.column}
        >
          <ContentStack>
            {/* Title */}
            {!!title && (
              <Text as="h2" textStyle="h2" color="orange.500">
                {title}
              </Text>
            )}
          </ContentStack>
        </GridItem>

        {/* Controls */}
        <GridItem
          gridRow={gridConfig.controls.row}
          gridColumn={gridConfig.controls.column}
          pos="relative"
          zIndex={10}
          alignSelf="flex-start"
        >
          <NavButtons
            prevRef={prevRef}
            nextRef={nextRef}
            wrapperProps={{ justifyContent: "flex-start" }}
          />
        </GridItem>

        {/* Slider */}
        <GridItem
          gridRow={gridConfig.slider.row}
          gridColumn={gridConfig.slider.column}
        >
          <Swiper
            slidesPerView={1}
            grabCursor={true}
            lazy={{
              checkInView: true,
              loadPrevNext: true,
              loadPrevNextAmount: 1,
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
            {references.map((reference, idx) => (
              <SwiperSlide key={idx}>
                <Reference {...reference} />
              </SwiperSlide>
            ))}
          </Swiper>
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default ReferencesSection

export const query = graphql`
  fragment ReferencesSectionFragment on ReferencesSection {
    type
    slug
    title
    spacing {
      ...SpacingFragment
    }
    references {
      ... on Reference {
        ...ReferenceFragment
      }
    }
  }
`
