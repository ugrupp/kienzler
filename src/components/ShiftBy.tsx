import { Box } from "@chakra-ui/react"
import React from "react"
function ShiftBy({ x = "0px", y = "0px", children }) {
  return (
    <Box
      style={{
        transform: `translate(${x}, ${y})`,
      }}
    >
      {children}
    </Box>
  )
}
export default ShiftBy
