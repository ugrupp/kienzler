import React from "react"
import { MenuDisclosureContextProvider } from "./src/context/MenuDisclosureContext"

export const wrapPageElement = ({ element }) => {
  return (
    <MenuDisclosureContextProvider>{element}</MenuDisclosureContextProvider>
  )
}
