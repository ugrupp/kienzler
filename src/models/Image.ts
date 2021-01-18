import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"
import { CSSProperties } from "react"

export interface Image {
  file: FileNode
  src: string
  alt: string
  fit: CSSProperties["objectFit"]
  position: CSSProperties["objectPosition"]
}
