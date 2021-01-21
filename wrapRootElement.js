import { Button, Heading, Text } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import React from "react"
import { MenuDisclosureContextProvider } from "./src/context/MenuDisclosureContext"

const h1 = props => <Heading as="h1" textStyle="h1" {...props} />
const h2 = props => <Heading as="h2" textStyle="h2" {...props} />
const h3 = props => <Heading as="h3" textStyle="h3" {...props} />
const h4 = props => <Heading as="h4" textStyle="h4" {...props} />
const h5 = props => <Heading as="h5" textStyle="h5" {...props} />
const h6 = props => <Heading as="h6" textStyle="h6" {...props} />
const p = props => <Text textStyle="paragraph" {...props} />

const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  Button,
}

export const wrapRootElement = ({ element }) => (
  <MenuDisclosureContextProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </MenuDisclosureContextProvider>
)
