import { Box } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"

export interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  return (
    <Box as="header" bgColor="orange.500">
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </Box>
  )
}

export default Header
