import { Heading, List, ListIcon, ListItem } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"

export interface AdvantagesSectionProps {
  section: {
    type: string
    slug?: string
    title?: string

    text?: string
    advantages?: string[]
  }
}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ section }) => {
  const { title, advantages } = section
  return (
    <section>
      {/* Title */}
      {!!title && (
        <Heading as="h3" textStyle="h3" color="orange.500">
          {title}
        </Heading>
      )}

      {/* Advantages */}
      {!!advantages.length && (
        <List textStyle="paragraph">
          {advantages.map(advantage => (
            <ListItem>
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
