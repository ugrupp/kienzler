"use strict"

const selectAll = require(`unist-util-select`).selectAll
const select = require(`unist-util-select`).select

module.exports = ({ markdownAST, markdownNode }) => {
  if (markdownNode.internal.removeRootParagraph) {
    const p = select("root paragraph", markdownAST)
    if (p && p.type === "paragraph") {
      markdownAST.children = selectAll("root paragraph > *", markdownAST)
    }
  }

  return markdownAST
}
