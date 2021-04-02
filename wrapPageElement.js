import "intersection-observer" // SAL
import React from "react"
import "sal.js/dist/sal.css" // SAL
import Layout from "./src/components/layout"
import { MenuDisclosureContextProvider } from "./src/context/MenuDisclosureContext"

export const wrapPageElement = ({ element, props }) => {
  return (
    <MenuDisclosureContextProvider>
      <Layout {...props}>{element}</Layout>
    </MenuDisclosureContextProvider>
  )
}
