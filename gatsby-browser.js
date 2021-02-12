/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import { removeTrailingSlash } from "./src/util/helpers"

export { wrapPageElement } from "./wrapPageElement"
export { wrapRootElement } from "./wrapRootElement"

export const shouldUpdateScroll = ({ routerProps, prevRouterProps }) => {
  const { location } = routerProps

  return (
    !!location?.hash ||
    removeTrailingSlash(routerProps?.location?.pathname ?? "") ===
      removeTrailingSlash(prevRouterProps?.location?.pathname ?? "")
  )
}
