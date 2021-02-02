/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"
export { wrapPageElement } from "./wrapPageElement"
export { wrapRootElement } from "./wrapRootElement"

// Prepend myfonts import to <head>
const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.unshift(
    <style
      key="myfonts-counter"
      dangerouslySetInnerHTML={{
        __html: '@import url("https://hello.myfonts.net/count/3cf9fc");',
      }}
    />
  )
  replaceHeadComponents(headComponents)
}

export { onPreRenderHTML }
