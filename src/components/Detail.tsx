import React from "react"
import { Image } from "../models/Image"

export interface DetailModel {
  id: string
  title: string
  text?: string
  image?: Image
  tooltip?: {
    position: string
    direction: "right" | "bottom"
  }
}

const Detail: React.FC<DetailModel> = ({ title, text }) => {
  return (
    <li>
      Detail component ({title}): {!!text && <>{text}</>}
    </li>
  )
}

export default Detail
