import React from "react"

export interface SocialMediaPostModel {
  type: string
  post?: string
}

const SocialMediaPost: React.FC<SocialMediaPostModel> = ({ post }) => {
  return <div>Social media post ({post})</div>
}

export default SocialMediaPost
