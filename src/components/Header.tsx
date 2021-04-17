import {
  Box,
  chakra,
  ChakraTheme,
  Flex,
  GridItem,
  Img,
  Tooltip,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import React, { useContext } from "react"
import { MenuDisclosureContext } from "../context/MenuDisclosureContext"
import useBoop from "../hooks/useBoop"
import MenuToggleIcon from "../icons/MenuToggle"
// @ts-ignore
import Logo from "../images/logo.svg"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"

const StyleableLink = chakra(Link)

export interface HeaderModel {
  siteTitle: string
}

const Header: React.FC<HeaderModel> = ({ siteTitle }) => {
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = useContext(
    MenuDisclosureContext
  )

  const theme: ChakraTheme = useTheme()
  const [
    menuToggleBoopAnimation,
    menuToggleBoopTransition,
    menuToggleBoopTrigger,
  ] = useBoop({
    scale: 1.15,
  })
  const logoHeights = [12, null, 14]

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={theme.zIndices.banner}
      mt={["6vh", null, "7vh", null, "9vh"]}
    >
      <ContainerGrid>
        <GridItem gridColumn="main" position="relative">
          {/* Logo */}
          <StyleableLink
            to="/"
            display="block"
            height={logoHeights}
            position="absolute"
            left="0"
            top="0"
          >
            <Box as="strong" display="inline-block" height="full">
              <Img src={Logo} alt={siteTitle} height="full" />
            </Box>
          </StyleableLink>

          {/* Menu toggle */}
          <Flex
            position="absolute"
            right="0"
            top="0"
            alignItems="center"
            height={logoHeights}
          >
            <Tooltip
              label={
                <Flex direction="column" alignItems="flex-end">
                  {["Menü", isMenuOpen ? "schließen" : "öffnen"].map(
                    (labelPart, idx) => (
                      <Box
                        key={idx}
                        backgroundColor="gray.200"
                        textStyle="h4"
                        fontSize="3xs"
                        lineHeight="shorter"
                        px={"0.6em"}
                        py={"0.4em"}
                      >
                        {labelPart}
                      </Box>
                    )
                  )}
                </Flex>
              }
              bg={"transparent"}
              color="white"
              p={0}
              borderRadius="none"
              boxShadow="none"
              gutter={0}
              placement="bottom-end"
              closeOnClick={true}
            >
              <Box
                as="button"
                height={["1.625rem", null, "1.875rem"]}
                width={["1.625rem", null, "1.875rem"]}
                color="orange.500"
                transitionProperty="all"
                transitionDuration="normal"
                appearance="none"
                p={0}
                _hover={{
                  color: "gray.500",
                }}
                _focus={{
                  outline: "none",
                  color: "gray.500",
                }}
                onMouseEnter={menuToggleBoopTrigger}
                onClick={onMenuToggle}
              >
                <VisuallyHidden>Menü öffnen</VisuallyHidden>
                <MenuToggleIcon
                  height="100%"
                  width="100%"
                  display="block"
                  animate={menuToggleBoopAnimation}
                  transition={menuToggleBoopTransition}
                  isOpen={isMenuOpen}
                />
              </Box>
            </Tooltip>
          </Flex>
        </GridItem>
      </ContainerGrid>
    </Box>
  )
}

export default Header
