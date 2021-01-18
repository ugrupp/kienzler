import { Button, Heading } from "@chakra-ui/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import Link from "./Link"
import ShiftBy from "./ShiftBy"

export interface CardProps {
  type: string
  title: string
  // TODO
  image: any
  content: string
  // TODO
  cta: any
}

const Card: React.FC<CardProps> = ({ title, image, content, cta }) => {
  const imageData = getImage(image?.file)

  return (
    <div>
      {/* Title */}
      {!!title && <Heading>{title}</Heading>}

      {/* Content */}
      {!!content && (
        <div>
          <MDXRenderer>{content}</MDXRenderer>
        </div>
      )}

      {!!imageData && (
        <GatsbyImage
          image={imageData}
          alt={image.alt ?? ""}
          objectFit={image.fit}
          objectPosition={image.position}
        />
      )}

      {/* Button */}
      {!!cta && (
        <Button
          mt={6}
          as={Link}
          to={cta.url}
          target={cta.target}
          rightIcon={<ArrowBoldIcon />}
        >
          <ShiftBy y={2}>{cta.label}</ShiftBy>
        </Button>
      )}
    </div>
  )
}

export default Card
