/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Grid, GridItem } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import _ from "lodash"
import React from "react"
import { SectionModel } from "../models/Section"
import { Fonts } from "../theme/Fonts"
import Header from "./Header"
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

  // Transform section frontmatter into actual components
  const frontmatterSections: SectionModel[] = _.get(
    pageData,
    "mdx.frontmatter.sections",
    []
  )
  const sectionComponents = frontmatterSections
    .map(sectionData => {
      const component: React.FC<SectionModel> =
        sections[_.upperFirst(_.camelCase(`${sectionData.type}_section`))]

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

  return (
    <>
      <Fonts />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

      <main>
        {/* Render sections as vertically stacked grid */}
        <Grid gridTemplateColumns="1fr">
          {sectionComponents.map(
            ({ type, component: Section, data, spacing }, sectionIdx) => (
              <GridItem key={`${type}-${sectionIdx}`} mb={spacing?.bottom}>
                <Section {...data} />
              </GridItem>
            )
          )}
        </Grid>
      </main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
