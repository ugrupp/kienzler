import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react"
import React, { createContext } from "react"

export const MenuDisclosureContext = createContext<UseDisclosureReturn>(null)

export const MenuDisclosureContextProvider = ({ children }) => {
  const menuDisclosure = useDisclosure()

  return (
    <MenuDisclosureContext.Provider value={menuDisclosure}>
      {children}
    </MenuDisclosureContext.Provider>
  )
}
