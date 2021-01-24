import React from "react"
import { VStack } from "@chakra-ui/react"

export interface ContentStackProps {}

const ContentStack: React.FC<ContentStackProps> = ({ children }) => {
  return (
    <VStack align="flex-start" spacing={[5, null, 6, null, 7]}>
      {children}
    </VStack>
  )
}

export default ContentStack
