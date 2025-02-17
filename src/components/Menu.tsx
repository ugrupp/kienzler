import {
  Box,
  Flex,
  List,
  ListItem,
  useBreakpointValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import MenuToggleIcon from "../icons/MenuToggle"
import Link from "./Link"

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

  return (
    <nav>
      <TopMenu
        menuLinks={menuLinks}
        handleArrowClick={handleArrowClick}
        activeMenus={activeMenus}
      />
    </nav>
  )
}

// Top menu (level 1)
const TopMenu = ({ menuLinks, handleArrowClick, activeMenus }) => {
  const depth = 1

  return (
    <List
      sx={{
        "& > * ~ *": {
          mt: [5, null, null, null, 0],
        },
      }}
      display={[null, null, null, null, "flex"]}
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
            activeMenus={activeMenus}
            handleArrowClick={handleArrowClick}
            ml={index !== 0 ? [null, null, null, null, 24] : undefined}
          />
        )
      })}
    </List>
  )
}

// List item
const Item = ({
  menuLink,
  hasChildren,
  depth,
  itemId,
  menuIndex,
  activeMenus,
  handleArrowClick,
  ...props
}) => {
  const linkStyles =
    depth === 1
      ? {
          fontSize: "xl",
          color: "orange.500",
          transitionDuration: "normal",
          transitionProperty: "colors",
          _hover: {
            color: "inherit",
          },
        }
      : {
          fontSize: "md",
          transitionDuration: "normal",
          transitionProperty: "colors",
          _hover: {
            color: "orange.500",
          },
          _before: {
            content: "counter(submenu)",
            color: "orange.500",
            fontSize: "3xs",
            fontWeight: "bold",
            mr: 2,
          },
        }

  return (
    <ListItem id={itemId} sx={{ counterIncrement: "submenu" }} {...props}>
      <Flex alignItems="center" justifyContent="space-between">
        {/* Link */}
        <Box as={Link} to={menuLink.link} {...linkStyles}>
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
          handleArrowClick={handleArrowClick}
          activeMenus={activeMenus}
        />
      )}
    </ListItem>
  )
}

// Sub menu (sub levels)
const SubMenu = ({
  menuLinks,
  depth,
  isVisible,
  menuIndex,
  handleArrowClick,
  activeMenus,
}) => {
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
            handleArrowClick={handleArrowClick}
            activeMenus={activeMenus}
          />
        )
      })}
    </List>
  )
}

export default Menu
