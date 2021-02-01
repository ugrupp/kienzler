import { Box, Text } from "@chakra-ui/react"
import { MDXProvider, useMDXComponents } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"

export interface TitleTextProps {
  title?: string
  text: string
}

const TitleText: React.FC<TitleTextProps> = ({ title, text }) => {
  // Adjust typography
  const originalComponents = useMDXComponents()

  // Text
  const textComponents = {
    ...originalComponents,
    p: props => <Text textStyle="paragraph-lg" {...props} />,
  }

  return (
    <>
      {!!title && (
        <Box
          as="h1"
          textStyle="paragraph-lg"
          color="orange.500"
          float="left"
          mr={2}
        >
          <MDXRenderer>{title}</MDXRenderer>
          <ArrowBoldIcon boxSize={"0.7em"} ml={2} verticalAlign="baseline" />
        </Box>
      )}

      {/* Text */}
      <MDXProvider components={textComponents}>
        <MDXRenderer>{text}</MDXRenderer>
      </MDXProvider>
    </>
  )
}

export default TitleText
