import { AnchorLink } from "gatsby-plugin-anchor-links"
import React, { useContext } from "react"
import { MenuDisclosureContext } from "../context/MenuDisclosureContext"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  const { onClose } = useContext(MenuDisclosureContext)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <AnchorLink
        to={to}
        stripHash={true}
        gatsbyLinkProps={{
          activeClassName,
          partiallyActive,
          ...other,
        }}
        // Close menu overlay on click
        onAnchorLinkClick={() => {
          onClose()
        }}
      >
        {children}
      </AnchorLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Link
