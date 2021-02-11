/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import { navigate } from "@reach/router"

export { wrapPageElement } from "./wrapPageElement"
export { wrapRootElement } from "./wrapRootElement"

export const onRouteUpdate = ({ location, prevLocation }) => {
  // Scroll to hash on route update
  if (prevLocation !== location && prevLocation?.hash !== location.hash) {
    let { hash } = location
    hash && navigate(hash)
  }
}
