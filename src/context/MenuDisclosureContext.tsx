import {
  useDisclosure,
  UseDisclosureReturn,
  usePrevious,
} from "@chakra-ui/react"
import { useLocation } from "@reach/router"
import React, { createContext, useEffect } from "react"

export const MenuDisclosureContext = createContext<UseDisclosureReturn>(null)

export const MenuDisclosureContextProvider = ({ children }) => {
  const menuDisclosure = useDisclosure()
  const { onClose } = menuDisclosure

  // Close menu on location change
  const location = useLocation()
  const prevLocation = usePrevious(location)

  useEffect(() => {
    if (prevLocation && location !== prevLocation) {
      onClose()
    }
  }, [location, prevLocation, onClose])

  return (
    <MenuDisclosureContext.Provider value={menuDisclosure}>
      {children}
    </MenuDisclosureContext.Provider>
  )
}
