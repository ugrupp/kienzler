import {
  Box,
  Flex,
  List,
  ListItem,
  Theme,
  useBreakpointValue,
  useTheme,
  VisuallyHidden,
} from "@chakra-ui/react"
import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import MenuToggleIcon from "../icons/MenuToggle"

export interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  // Query for menu data
  const data = useStaticQuery(graphql`
    query MenuQuery {
      site {
        siteMetadata {
          menuLinks {
            title
            link
            children {
              title
              link
            }
          }
        }
      }
    }
  `)

  const { menuLinks } = data.site.siteMetadata

  // Get theme object
  const theme: Theme = useTheme()

  // Set up menu state
  const [activeMenus, setActiveMenus] = useState(new Set())

  // Submenu indicator handler
  const handleArrowClick = itemId => {
    let newActiveMenus = new Set(activeMenus)

    // Toggle item in set
    if (newActiveMenus.has(itemId)) {
      newActiveMenus.delete(itemId)
    } else {
      newActiveMenus.add(itemId)
    }

    setActiveMenus(newActiveMenus)
  }

  // Top menu (level 1)
  const TopMenu = ({ menuLinks }) => {
    const depth = 1

    return (
      <Box
        as="ul"
        listStyleType="none"
        sx={{
          "& > * ~ *": {
            mt: [5, null, null, null, 0],
          },
        }}
        display={[null, null, null, null, "flex"]}
        gridGap={[null, null, null, null, 24]}
      >
        {menuLinks.map((menuLink, index) => {
          const itemId = `menu-${depth}-${index}`

          return (
            <Item
              key={itemId}
              menuLink={menuLink}
              hasChildren={menuLink.children?.length}
              depth={depth}
              itemId={itemId}
              menuIndex={index}
            />
          )
        })}
      </Box>
    )
  }

  // Sub menu (sub levels)
  const SubMenu = ({ menuLinks, depth, isVisible, menuIndex }) => {
    depth = depth + 1
    const isAlwaysVisible = useBreakpointValue({ base: false, xl: true })

    if (!(isVisible || isAlwaysVisible)) {
      return null
    }

    return (
      <List py={4} spacing={4} sx={{ counterReset: "submenu" }}>
        {menuLinks.map((menuLink, index) => {
          const itemId = `menu-${depth}-${menuIndex}-${index}`

          return (
            <Item
              key={itemId}
              menuLink={menuLink}
              hasChildren={menuLink.children?.length}
              depth={depth}
              itemId={itemId}
              menuIndex={index}
            />
          )
        })}
      </List>
    )
  }

  // List item
  const Item = ({ menuLink, hasChildren, depth, itemId, menuIndex }) => {
    const itemStyles =
      depth === 1
        ? {
            color: "orange.500",
            fontSize: "xl",
          }
        : {
            fontSize: "md",
            _before: {
              content: "counter(submenu)",
              color: "orange.500",
              fontSize: "3xs",
              fontWeight: "bold",
              mr: 2,
            },
          }

    return (
      <ListItem id={itemId} sx={{ counterIncrement: "submenu" }}>
        <Flex alignItems="center" justifyContent="space-between">
          {/* Link */}
          <Box as={Link} to={menuLink.link} {...itemStyles}>
            {menuLink.title}
          </Box>

          {/* Sub menu toggler */}
          {hasChildren && (
            // TODO: weird border on focus
            <Box
              as="button"
              appearance="none"
              p={0}
              height={8}
              width={8}
              display={["flex", null, null, null, "none"]}
              justifyContent="center"
              alignItems="center"
              color="orange.500"
              _focus={{
                outline: "none",
                color: "gray.500",
              }}
              onClick={() => handleArrowClick(itemId)}
            >
              <VisuallyHidden>Submenü öffnen</VisuallyHidden>
              {/* TODO: out-animation not working */}
              <MenuToggleIcon
                height="50%"
                width="50%"
                display="block"
                isOpen={activeMenus.has(itemId)}
                transition={{
                  type: "spring",
                  stiffness: 400,
                }}
              />
            </Box>
          )}
        </Flex>

        {/* Sub menu */}
        {hasChildren && (
          <SubMenu
            menuLinks={menuLink.children}
            depth={depth}
            isVisible={activeMenus.has(itemId)}
            menuIndex={menuIndex}
          />
        )}
      </ListItem>
    )
  }

  return (
    <nav>
      <TopMenu menuLinks={menuLinks} />
    </nav>
  )
}

export default Menu
