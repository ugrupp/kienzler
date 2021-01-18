import { Box } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
import ContainerGrid from "./ContainerGrid"

export interface HeaderModel {
  siteTitle: string
}

const Header: React.FC<HeaderModel> = ({ siteTitle }) => {
  return (
    <Box bgColor="orange.500">
      <ContainerGrid>
        <strong style={{ margin: 0, backgroundColor: "lightblue" }}>
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
