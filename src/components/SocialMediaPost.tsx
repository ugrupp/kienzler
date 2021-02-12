import { Box, ChakraTheme, Link, useTheme } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import FacebookIcon from "../icons/Facebook"
import InstagramIcon from "../icons/Instagram"
import YouTubeIcon from "../icons/YouTube"
import { Image } from "../models/Image"
import { convertMSToInt } from "../util/helpers"
import { MotionBox } from "./MotionBox"

export interface SocialMediaPostModel {
  type: string
  post?: {
    fields: {
      postType: string
    }
    id: string
    title: string
    url: string
    thumbnail: Image
  }
}

const SocialMediaPost: React.FC<SocialMediaPostModel> = ({ post }) => {
  const { title, url, thumbnail } = post
  const thumbnailData = getImage(thumbnail?.file)
  const [hover, setHover] = useState<true | undefined>(undefined)
  const theme: ChakraTheme = useTheme()

  // Get icon, based on post type
  const Icon =
    post.fields.postType === "facebook"
      ? FacebookIcon
      : post.fields.postType === "instagram"
      ? InstagramIcon
      : post.fields.postType === "youtube"
      ? YouTubeIcon
      : null

  return (
    <Link
      href={url}
      isExternal
      display="block"
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(undefined)}
      title={title ?? undefined}
    >
      {/* Image */}
      {!!thumbnailData && (
        <Box
          position="relative"
          overflow="hidden"
          pointerEvents="none" // workaround for https://github.com/gatsbyjs/gatsby/discussions/27950#discussioncomment-290788
        >
          <motion.div
            initial={false}
            animate={{
              transform: hover ? "scale(1.1)" : "scale(1)",
            }}
            transition={{
              type: "spring",
              bounce: hover ? 0.4 : 0, // no overshoot on mouseout (image bg would be visible)
            }}
          >
            <GatsbyImage
              image={thumbnailData}
              alt={thumbnail?.alt ?? ""}
              style={{ display: "block" }}
            />
          </motion.div>

          {/* Image overlay */}
          <AnimatePresence>
            {hover && (
              <MotionBox
                position="absolute"
                left={0}
                right={0}
                top={0}
                bottom={0}
                zIndex={5}
                opacity={0}
                bgGradient="linear-gradient(to-b, orange.500 0%, transparent 100%)"
                sx={{
                  mixBlendMode: "multiply",
                }}
                transition={{
                  duration: convertMSToInt(theme.transition.duration.slow),
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </Box>
      )}

      {/* Icon */}
      <Box
        position="absolute"
        left={[4, null, null, null, null, 5]}
        bottom={0}
        zIndex={5}
        transform="translateY(50%)"
      >
        <Icon color="orange.500" bgColor="white" boxSize={6} />
      </Box>
    </Link>
  )
}

export default SocialMediaPost

export const query = graphql`
  fragment SocialMediaPostThumbnailFragment on Image {
    file {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          aspectRatio: 1
          placeholder: DOMINANT_COLOR
          quality: 75
        )
      }
    }
  }

  fragment SocialMediaPostFragment on SocialMediaPost {
    type
    post {
      ... on FacebookYaml {
        fields {
          postType
        }
        id
        title
        url
        thumbnail {
          ...SocialMediaPostThumbnailFragment
          alt
        }
      }
      ... on InstagramYaml {
        fields {
          postType
        }
        id
        title
        url
        thumbnail {
          ...SocialMediaPostThumbnailFragment
          alt
        }
      }
      ... on YoutubeYaml {
        fields {
          postType
        }
        id
        title
        url
        thumbnail {
          ...SocialMediaPostThumbnailFragment
          alt
        }
      }
    }
  }
`
