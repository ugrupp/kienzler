import { Link as GatsbyLink } from "gatsby"
import React from "react"

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = React.forwardRef(
  ({ children, to, activeClassName, partiallyActive, ...other }, ref) => {
    const external = /(mailto:\w+)|(tel:\w+)|https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i.test(
      to
    )

    // Use Gatsby Link for internal links, and <a> for others
    if (external) {
      return (
        <a href={to} {...other}>
          {children}
        </a>
      )
    }
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
)

export default Link
