import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import { Image } from "../models/Image"

export interface SocialMediaPostModel {
  type: string
  post?: {
    id: string
    title: string
    url: string
    thumbnail: Image
  }
}

const SocialMediaPost: React.FC<SocialMediaPostModel> = ({ post }) => {
  const imageData = getImage(post.thumbnail?.file)

  return (
    <div>
      Social media post
      <GatsbyImage image={imageData} alt={post.thumbnail?.alt ?? ""} />
    </div>
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
        id
        title
        url
        thumbnail {
          ...SocialMediaPostThumbnailFragment
          alt
        }
      }
      ... on InstagramYaml {
        id
        title
        url
        thumbnail {
          ...SocialMediaPostThumbnailFragment
          alt
        }
      }
      ... on YoutubeYaml {
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
