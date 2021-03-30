import { Box, HStack, StackProps, VisuallyHidden } from "@chakra-ui/react"
import React, { forwardRef } from "react"
import ArrowIcon from "../icons/Arrow"

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

export interface NavButtonsProps {
  prevRef: React.MutableRefObject<any>
  nextRef: React.MutableRefObject<any>
  wrapperProps?: StackProps
}

const NavButtons: React.FC<NavButtonsProps> = ({
  prevRef,
  nextRef,
  wrapperProps,
}) => {
  return (
    <HStack
      spacing={5}
      justifyContent={{ md: "flex-end", xl: "flex-start" }}
      {...wrapperProps}
    >
      {/* Previous */}
      <NavButton type="previous" ref={prevRef} />

      {/* Custom spacer */}
      <Box height="1px" bgColor="currentColor" width={8} />

      {/* Next */}
      <NavButton type="next" ref={nextRef} />
    </HStack>
  )
}

export default NavButtons
