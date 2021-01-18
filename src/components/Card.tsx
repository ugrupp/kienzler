import { Button, Heading } from "@chakra-ui/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import { Image } from "../models/Image"
import { Link as LinkModel } from "../models/Link"
import Link from "./Link"
import ShiftBy from "./ShiftBy"

export interface CardModel {
  type: string
  title?: string
  image?: Image
  content?: string
  cta?: LinkModel
}

const Card: React.FC<CardModel> = ({ title, image, content, cta }) => {
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
