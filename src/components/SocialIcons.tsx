import FacebookIcon from "../icons/Facebook"
import InstagramIcon from "../icons/Instagram"
import YouTubeIcon from "../icons/YouTube"
import React from "react"
import { Box, VisuallyHidden, VStack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { filter } from "lodash"

export interface SocialIconsProps {}

const SocialIcons: React.FC<SocialIconsProps> = () => {
  // Query for menu data
  const data = useStaticQuery(graphql`
    query SocialIconsQuery {
      site {
        siteMetadata {
          socialProviders {
            type
            title
            user
            url
          }
        }
      }
    }
  `)

  const { socialProviders } = data.site.siteMetadata

  return (
    <VStack
      spacing={6}
      height="100%"
      align="flex-end"
      justifyContent="flex-end"
    >
      {socialProviders.map(({ type, title, user, url }) => {
        // Get icon, based on post type
        const Icon =
          type === "facebook"
            ? FacebookIcon
            : type === "instagram"
            ? InstagramIcon
            : type === "youtube"
            ? YouTubeIcon
            : null

        return (
          <Box
            as="a"
            href={url}
            target="_blank"
            display="block"
            color="gray.200"
            _hover={{ color: "orange.500" }}
            transitionProperty="colors"
            transitionDuration="normal"
            h={8}
            w={8}
            title={filter([title, user]).join(": ")}
          >
            <VisuallyHidden>{title}</VisuallyHidden>
            <Icon height="100%" width="100%" />
          </Box>
        )
      })}
    </VStack>
  )
}

export default SocialIcons
