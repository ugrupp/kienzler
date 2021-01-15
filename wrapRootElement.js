import { Button } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import React from "react"

const components = {
  Button,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
