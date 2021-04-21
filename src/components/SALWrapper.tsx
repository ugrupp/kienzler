import React, { useEffect } from "react"
import sal, { Options } from "sal.js"

export const salConfig = {
  "data-sal": "fade",
  "data-sal-duration": 1250,
}

export interface SALWrapperProps {
  path: any
}

const SALWrapper: React.FC<SALWrapperProps> = ({ children, path }) => {
  const options: Options = {
    root: null,
    threshold: 0.15,
  }

  useEffect(() => {
    sal(options)
  }, [path])

  return <>{children}</>
}

export default SALWrapper
