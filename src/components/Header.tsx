import { Box } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
import ContainerGrid from "./ContainerGrid"

export interface HeaderModel {
  siteTitle: string
}

const Header: React.FC<HeaderModel> = ({ siteTitle }) => {
  return (
    <Box
      bgColor="rgba(0,0,0,.1)"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="10"
    >
      <ContainerGrid>
        <strong style={{ margin: 0, backgroundColor: "rgba(0,0,0,.1)" }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </strong>
      </ContainerGrid>
    </Box>
  )
}

export default Header
