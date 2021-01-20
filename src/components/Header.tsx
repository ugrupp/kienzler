import { Box, Button, chakra, Flex, Image, Tooltip } from "@chakra-ui/react"
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
            <Tooltip
              label={
                <Flex direction="column" alignItems="flex-end">
                  {["Menü", "öffnen"].map((labelPart, idx) => (
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
                  ))}
                </Flex>
              }
              bg={"transparent"}
              color="white"
              p={0}
              borderRadius="none"
              boxShadow="none"
              gutter={0}
              placement="bottom-end"
            >
              <Button variant="solid">+</Button>
            </Tooltip>
          </Flex>
        </Box>
      </ContainerGrid>
    </Box>
  )
}

export default Header
