import {
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { omit } from "lodash"
import React from "react"
import ShiftBy from "./src/components/ShiftBy"
import ArrowBoldIcon from "./src/icons/ArrowBold"

const h1 = props => <Heading as="h1" textStyle="h1" {...props} />
const h2 = props => <Heading as="h2" textStyle="h2" {...props} />
const h3 = props => <Heading as="h3" textStyle="h3" {...props} />
const h4 = props => <Heading as="h4" textStyle="h4" {...props} />
const h5 = props => <Heading as="h5" textStyle="h5" {...props} />
const h6 = props => <Heading as="h6" textStyle="h6" {...props} />
const p = props => <Text textStyle="paragraph" {...props} />
const ul = props => (
  <List textStyle="paragraph" spacing={[3, null, 4]} {...props}>
    {props.children}
  </List>
)
const li = props => (
  <ListItem display="flex" {...omit(props, ["color", "iconWidth"])}>
    <ListIcon
      as={ArrowBoldIcon}
      color={props.color ?? "orange.500"}
      width={props.iconWidth ?? undefined}
      marginInlineEnd={props.iconWidth ? 0 : undefined}
      preserveAspectRatio="xMinYMid"
      transform="translateY(0.2em)"
    />
    {props.children}
  </ListItem>
)

const components = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  li,
  Button,
  ArrowBoldIcon,
  ShiftBy,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
