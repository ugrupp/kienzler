import React from "react"

const Detail = ({ detail }) => {
  return (
    <li>
      Detail component ({detail.title}):{!!detail.text && <>{detail.text}</>}
    </li>
  )
}

export default Detail
