import { Grid, useTheme } from "@chakra-ui/react"
import React from "react"

export interface ContainerGridProps {
  sizes?: Array<{
    mainColumns: number
    mainMaxWidth: string
    outerSpace: number
  }>
  rowGap?: number[]
  columnGap?: string[]
  templateRows?: string[]
}

const ContainerGrid: React.FC<ContainerGridProps> = ({
  children,
  sizes = [
    {
      mainColumns: 12,
      mainMaxWidth: "sm",
      outerSpace: 4,
    },
    null,
    {
      mainColumns: 12,
      mainMaxWidth: "container",
      outerSpace: 16,
    },
    null,
    {
      mainColumns: 12,
      mainMaxWidth: "container",
      outerSpace: 20,
    },
  ],
  rowGap = [0],
  columnGap = [0],
  templateRows,
}) => {
  const theme = useTheme()

  const gridProps = {
    columnGap: columnGap,
    rowGap: rowGap,
    templateRows,
    templateColumns: sizes.map(size => {
      return !!size
        ? `
        [full-start]
        minmax(${theme.space[size.outerSpace]}, 1fr)
        [main-start]
        repeat(
          ${size.mainColumns / 2},
          minmax(0, calc(${theme.sizes[size.mainMaxWidth]} / ${
            size.mainColumns
          }))
        )
        [center]
        repeat(
          ${size.mainColumns / 2},
          minmax(0, calc(${theme.sizes[size.mainMaxWidth]} / ${
            size.mainColumns
          }))
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
