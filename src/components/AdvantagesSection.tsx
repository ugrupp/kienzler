import { Heading, List, ListIcon, ListItem } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Spacing } from "../models/Spacing"

export interface AdvantagesSectionModel {
  type: string
  slug?: string
  title?: string
  spacing?: Spacing

  text?: string
  advantages?: string[]
}

const AdvantagesSection: React.FC<AdvantagesSectionModel> = ({
  title,
  slug,
  advantages,
}) => {
  return (
    <section id={slug}>
      {/* Title */}
      {!!title && (
        <Heading as="h3" textStyle="h3" color="orange.500">
          {title}
        </Heading>
      )}

      {/* Advantages */}
      {!!advantages.length && (
        <List textStyle="paragraph">
          {advantages.map((advantage, idx) => (
            <ListItem key={idx}>
              <ListIcon as={ArrowBoldIcon} color="orange.500" /> {advantage}
            </ListItem>
          ))}
        </List>
      )}
    </section>
  )
}

export default AdvantagesSection

export const query = graphql`
  fragment AdvantagesSectionFields on AdvantagesSection {
    type
    slug
    title
    text
    advantages
  }
`
