import { Box, useTheme } from "@chakra-ui/react"
import { css } from "@emotion/react"
import React from "react"

export interface ContainerGridProps {
  columns?: number
  outerSpace?: number
  maxW?: string
}

const ContainerGrid: React.FC<ContainerGridProps> = ({
  children,
  columns = 12,
  outerSpace = 8,
  maxW = "container",
}) => {
  const theme = useTheme()
  return (
    <Box
      css={css`
        display: grid;
        grid-template-columns:
          [full-start]
          minmax(${theme.space[outerSpace]}, 1fr)
          [main-start]
          repeat(
            ${columns / 2},
            minmax(0, calc(${theme.sizes[maxW]} / ${columns}))
          )
          [center]
          repeat(
            ${columns / 2},
            minmax(0, calc(${theme.sizes[maxW]} / ${columns}))
          )
          [main-end]
          minmax(${theme.space[outerSpace]}, 1fr)
          [full-end];

        & > * {
          grid-column: main;
        }
      `}
    >
      {children}
    </Box>
  )
}

export default ContainerGrid
