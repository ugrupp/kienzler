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
          backgroundColor="rgba(255,255,255,.96)"
          boxShadow="none"
        >
          <ContainerGrid>
            <GridItem>
              <Box minH={200}>Menu overlay content</Box>
            </GridItem>
          </ContainerGrid>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default MenuOverlay
