import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  GridItem,
} from "@chakra-ui/react"
import React, { useContext } from "react"
import { MenuDisclosureContext } from "../context/MenuDisclosureContext"
import ContainerGrid from "./ContainerGrid"
import Menu from "./Menu"
import SocialIcons from "./SocialIcons"

export interface MenuOverlayProps {}

const MenuOverlay: React.FC<MenuOverlayProps> = () => {
  const { isOpen, onClose } = useContext(MenuDisclosureContext)
  return (
    <Drawer
      placement="top"
      onClose={onClose}
      isOpen={isOpen}
      blockScrollOnMount={false}
      returnFocusOnClose={false}
    >
      <DrawerOverlay backgroundColor="transparent">
        <DrawerContent
          pt={["24vh", null, "26vh", null, "33vh"]}
          pb={24}
          backgroundColor="rgba(255,255,255,.96)"
          boxShadow="none"
          minH={["100vh", null, "0"]}
          overflow="auto"
        >
          <ContainerGrid>
            {/* Menu */}
            <GridItem gridColumn={["3 / main", "4 / main", "3 / 13"]}>
              <Box maxW={[300, null, null, null, "none"]}>
                <Menu />
              </Box>
            </GridItem>

            {/* Social */}
            <GridItem
              gridColumn={[null, null, "13 / main"]}
              display={["none", null, "block"]}
            >
              <SocialIcons />
            </GridItem>
          </ContainerGrid>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default MenuOverlay
