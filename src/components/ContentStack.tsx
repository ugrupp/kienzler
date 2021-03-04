import { SystemProps, VStack } from "@chakra-ui/react"
import React from "react"

export interface ContentStackProps {
  spacing?: SystemProps["margin"]
}

const ContentStack: React.FC<ContentStackProps> = ({
  children,
  spacing = [5, null, 6, null, 7],
}) => {
  return (
    <VStack align="flex-start" spacing={spacing}>
      {children}
    </VStack>
  )
}

export default ContentStack
