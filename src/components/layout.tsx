/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Box, Grid, GridItem } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { camelCase, get, upperFirst } from "lodash"
import React from "react"
import { Background } from "../models/Background"
import { SectionModel } from "../models/Section"
import { Fonts } from "../theme/Fonts"
import ContactFooter from "./ContactFooter"
import Header from "./Header"
import MenuOverlay from "./MenuOverlay"
import sections from "./sections"

const Layout = props => {
  // Get page query data
  const { data: pageData } = props

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // Get and transform section frontmatter into actual components
  const frontmatterSections: SectionModel[] = get(
    pageData,
    "mdx.frontmatter.sections",
    []
  )

  const sectionComponents = frontmatterSections
    .map(sectionData => {
      const component: React.FC<SectionModel> =
        sections[upperFirst(camelCase(`${sectionData.type}_section`))]

      if (!component) {
        return
      }

      return {
        type: sectionData.type,
        component,
        data: sectionData,
        spacing: sectionData.spacing,
      }
    })
    // Filter out invalid components
    .filter(sectionComponent => sectionComponent)

  // Get backgrounds frontmatter
  const backgrounds: Background[] =
    get(pageData, "mdx.frontmatter.backgrounds", []) ?? []

  return (
    <>
      <Fonts />

      {/* Header & menu overlay */}
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <MenuOverlay />

      <main>
        {/* Render sections and backgrounds as vertical grid */}
        <Grid>
          {/* Backgrounds */}
          {backgrounds.map(({ rows, gradient, spacing }, idx) => (
            <GridItem
              key={idx}
              bgGradient={gradient}
              gridColumn="1"
              gridRow={rows}
              pointerEvents="none"
              mt={spacing?.top}
              mb={spacing?.bottom}
            />
          ))}

          {/* Sections */}
          {sectionComponents.map(
            ({ type, component: Section, data, spacing }, sectionIdx) => (
              <GridItem
                key={`${type}-${sectionIdx}`}
                pt={spacing?.top}
                pb={spacing?.bottom}
                gridColumn="1"
                gridRow={sectionIdx + 1}
              >
                <Section {...data} />
              </GridItem>
            )
          )}
        </Grid>
      </main>

      <Box as="footer" backgroundColor="gray.500" color="white">
        <ContactFooter />

        <div>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </Box>
    </>
  )
}

export default Layout
