import { Grid, useTheme } from "@chakra-ui/react"
import React from "react"

export interface ContainerGridProps {
  mainColumns?: number
  sizes?: Array<{
    mainMaxWidth: string
    outerSpace: number
  }>
  rowGap?: number[]
  columnGap?: string[]
}

const ContainerGrid: React.FC<ContainerGridProps> = ({
  children,
  mainColumns = 12,
  sizes = [
    {
      mainMaxWidth: "sm",
      outerSpace: 4,
    },
    null,
    {
      mainMaxWidth: "container",
      outerSpace: 16,
    },
    null,
    {
      mainMaxWidth: "container",
      outerSpace: 20,
    },
  ],
  rowGap = [0],
  columnGap = [0],
}) => {
  const theme = useTheme()

  const gridProps = {
    columnGap: columnGap,
    rowGap: rowGap,
    templateColumns: sizes.map(size => {
      return !!size
        ? `
        [full-start]
        minmax(${theme.space[size.outerSpace]}, 1fr)
        [main-start]
        repeat(
          ${mainColumns / 2},
          minmax(0, calc(${theme.sizes[size.mainMaxWidth]} / ${mainColumns}))
        )
        [center]
        repeat(
          ${mainColumns / 2},
          minmax(0, calc(${theme.sizes[size.mainMaxWidth]} / ${mainColumns}))
        )
        [main-end]
        minmax(${theme.space[size.outerSpace]}, 1fr)
        [full-end];
        `
        : null
    }),
  }

  return (
    <Grid
      {...gridProps}
      sx={{
        "& > *": {
          gridColumn: "main",
        },
      }}
    >
      {children}
    </Grid>
  )
}

export default ContainerGrid
