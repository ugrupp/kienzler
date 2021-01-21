import {
  Box,
  chakra,
  Flex,
  Image,
  Theme,
  Tooltip,
  useDisclosure,
  UseDisclosureReturn,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import { Link } from "gatsby"
import React, { createContext } from "react"
import useBoop from "../hooks/useBoop"
import MenuToggleIcon from "../icons/MenuToggle"
// @ts-ignore
import Logo from "../images/logo.svg"
import ContainerGrid from "./ContainerGrid"
import MenuOverlay from "./MenuOverlay"

const StyleableLink = chakra(Link)
export const MenuDisclosureContext = createContext<UseDisclosureReturn>(null)

export interface HeaderModel {
  siteTitle: string
}

const Header: React.FC<HeaderModel> = ({ siteTitle }) => {
  const menuDisclosure = useDisclosure()
  const { isOpen: isMenuOpen, onToggle: onMenuToggle } = menuDisclosure

  const theme: Theme = useTheme()
  const [
    menuToggleBoopAnimation,
    menuToggleBoopTransition,
    menuToggleBoopTrigger,
  ] = useBoop({
    scale: 1.15,
  })
  const logoHeights = [12, null, 14]

  return (
    <MenuDisclosureContext.Provider value={menuDisclosure}>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={theme.zIndices.banner}
        mt={["6vh", null, "7vh", null, "9vh"]}
      >
        <ContainerGrid>
          <Box position="relative">
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
                <Image src={Logo} alt={siteTitle} height="full" />
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
                closeOnClick={false}
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
                  _active={{
                    transform: "translate(1px, 1px)",
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
          </Box>
        </ContainerGrid>
      </Box>

      {/* Menu overlay (TODO: check rerendering performance - does header get rerendered on menu open?) */}
      <MenuOverlay />
    </MenuDisclosureContext.Provider>
  )
}

export default Header
