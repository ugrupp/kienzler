import { Box, Button, chakra, Flex, Image } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
// @ts-ignore
import Logo from "../images/logo.svg"
import ContainerGrid from "./ContainerGrid"

const StyleableLink = chakra(Link)

const logoHeights = [12, null, 14]

export interface HeaderModel {
  siteTitle: string
}

const Header: React.FC<HeaderModel> = ({ siteTitle }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
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
            <Button variant="solid">+</Button>
          </Flex>
        </Box>
      </ContainerGrid>
    </Box>
  )
}

export default Header
