import { Button, Heading } from "@chakra-ui/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import ArrowBoldIcon from "../icons/ArrowBold"
import Link from "./Link"

export interface CardProps {
  type: string
  title: string
  // TODO
  image: any
  content: String
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
      {!!content && <div>{content}</div>}

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
          {cta.label}
        </Button>
      )}
    </div>
  )
}

export default Card
