import React from "react"
import { MenuDisclosureContextProvider } from "./src/context/MenuDisclosureContext"
import Layout from "./src/components/layout"

export const wrapPageElement = ({ element, props }) => {
  return (
    <MenuDisclosureContextProvider>
      <Layout {...props}>{element}</Layout>
    </MenuDisclosureContextProvider>
  )
}
