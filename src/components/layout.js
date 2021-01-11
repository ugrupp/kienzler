/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import _ from "lodash"
import React from "react"
import Header from "./header"
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

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />

      <main>
        {_.get(pageData, "mdx.frontmatter.sections", [])
          .map((section, sectionIdx) => {
            const Section =
              sections[_.upperFirst(_.camelCase(`${section.type}_section`))]
            return Section ? (
              <Section key={sectionIdx} {...props} section={section} />
            ) : undefined
          })
          .filter(section => section)}
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
