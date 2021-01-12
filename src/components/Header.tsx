import { Box } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
import ContainerGrid from "./ContainerGrid"

export interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  return (
    <Box as="header" bgColor="orange.500">
      <ContainerGrid>
        <h1 style={{ margin: 0, backgroundColor: "lightblue" }}>
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
      </ContainerGrid>
    </Box>
  )
}

export default Header
