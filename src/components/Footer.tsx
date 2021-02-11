import { Box, GridItem, Heading, Text, VStack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { filter } from "lodash"
import React from "react"
import ArrowIcon from "../icons/Arrow"
import FacebookIcon from "../icons/Facebook"
import InstagramIcon from "../icons/Instagram"
import YouTubeIcon from "../icons/YouTube"
import ContainerGrid from "./ContainerGrid"
import Link from "./Link"

export interface FooterProps {
  showContact?: boolean
}

const Footer: React.FC<FooterProps> = ({ showContact = true }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          organization {
            legalName
            email
            address {
              addressCountry
              addressLocality
              postalCode
              streetAddress
            }
            telephone {
              label
              href
            }
          }
          socialProviders {
            type
            title
            user
            url
          }
          menuLinks {
            title
            link
          }
          serviceMenuLinks {
            title
            link
          }
        }
      }
    }
  `)

  const {
    organization,
    menuLinks,
    socialProviders,
    serviceMenuLinks,
  } = data.site.siteMetadata

  const headingStyles = {
    textStyle: "h4",
    marginBottom: [9, null, 12],
    color: "orange.500",
  }

  return (
    <Box as="section" pt={[20, null, 24, null, 0]}>
      <ContainerGrid rowGap={[20]} gridTemplateRows="max-content max-content">
        {/* Menu */}
        <GridItem
          gridColumn={[
            "3 / 13",
            "4 / 13",
            showContact ? "3 / 9" : "3 / 8",
            null,
            "main / span 3",
            null,
            "main / span 2",
          ]}
          gridRow={[null, null, "1"]}
          mt={{ xl: 24 }}
        >
          <Heading as="h4" {...headingStyles}>
            Menü
          </Heading>

          <VStack spacing={4} alignItems="flex-start" textStyle="paragraph-lg">
            {menuLinks.map((menuLink, index) => (
              <Box
                as={Link}
                to={menuLink.link}
                key={index}
                _hover={{ color: "orange.500" }}
                transitionProperty="colors"
                transitionDuration="normal"
              >
                {menuLink.title}
              </Box>
            ))}
          </VStack>
        </GridItem>

        {/* Contact */}
        {showContact && (
          <GridItem
            gridColumn={[
              "3 / 13",
              "4 / 13",
              "9 / 13",
              null,
              "5 / span 3",
              null,
              "4 / span 2",
            ]}
            gridRow={[null, null, "1"]}
            mt={{ xl: 24 }}
          >
            <Heading as="h4" {...headingStyles}>
              Kontakt
            </Heading>

            <VStack spacing={[5, null, 6]} align="flex-start" lineHeight="tall">
              <Box>
                <Heading as="h5" textStyle="h4" lineHeight="tall">
                  Telefon
                </Heading>
                <Text textStyle="paragraph">
                  <Box
                    as="a"
                    href={`tel:${organization.telephone.href}`}
                    _hover={{ color: "orange.500" }}
                    transitionProperty="colors"
                    transitionDuration="normal"
                  >
                    {organization.telephone.label}
                  </Box>
                </Text>
              </Box>

              <Box>
                <Heading as="h5" textStyle="h4" lineHeight="tall">
                  E-Mail
                </Heading>
                <Text textStyle="paragraph">
                  <Box
                    as="a"
                    href={`mailto:${organization.email}`}
                    _hover={{ color: "orange.500" }}
                    transitionProperty="colors"
                    transitionDuration="normal"
                  >
                    {organization.email}
                  </Box>
                </Text>
              </Box>

              <Box>
                <Heading as="h5" textStyle="h4" lineHeight="tall">
                  Adresse
                </Heading>
                <Text textStyle="paragraph">
                  {organization.address.streetAddress}
                  <br />
                  {organization.address.postalCode}{" "}
                  {organization.address.addressLocality}
                </Text>
              </Box>
            </VStack>
          </GridItem>
        )}

        {/* Social */}
        <GridItem
          gridColumn={[
            "3 / 13",
            "4 / 13",
            showContact ? "3 / 9" : "3 / 8",
            null,
            showContact ? "8 / span 3" : "5 / span 3",
            null,
            showContact ? "6 / span 2" : "4 / span 2",
          ]}
          gridRow={[null, null, "2", null, "1"]}
          mt={{ xl: 24 }}
        >
          <Heading as="h4" {...headingStyles}>
            Mehr?
          </Heading>

          <VStack spacing={8} align="flex-start">
            {socialProviders.map(({ type, title, user, url }) => {
              // Get icon, based on post type
              const Icon =
                type === "facebook"
                  ? FacebookIcon
                  : type === "instagram"
                  ? InstagramIcon
                  : type === "youtube"
                  ? YouTubeIcon
                  : null

              return (
                <Box
                  key={type}
                  as="a"
                  href={url}
                  target="_blank"
                  display="flex"
                  alignItems="center"
                  _hover={{ color: "orange.500" }}
                  transitionProperty="colors"
                  transitionDuration="normal"
                  title={filter([title, user]).join(": ")}
                  textStyle="h4"
                >
                  <Icon height={8} width={8} mr={5} />
                  {title}
                </Box>
              )
            })}
          </VStack>
        </GridItem>

        {/* Service menu */}
        <GridItem
          gridColumn={[
            "3 / 13",
            "4 / 13",
            showContact ? "3 / 9" : "3 / 8",
            null,
            "main / span 3",
            null,
            "main / span 2",
          ]}
          gridRow={[null, null, "3", null, "2"]}
          pb={[null, null, 24]}
        >
          <VStack spacing={1} alignItems="flex-start" textStyle="h4">
            {serviceMenuLinks.map((menuLink, index) => (
              <Box
                as={Link}
                to={menuLink.link}
                key={index}
                color="gray.400"
                _hover={{ color: "orange.500" }}
                transitionProperty="colors"
                transitionDuration="normal"
              >
                {menuLink.title}
              </Box>
            ))}
          </VStack>
        </GridItem>

        {/* Image box */}
        <GridItem
          gridColumn={[
            "3 / full",
            "4 / full",
            showContact ? "9 / full" : "8 / full",
            null,
            showContact ? "11 / full" : "8 / full",
          ]}
          gridRow={["4", null, "2 / span 2", null, "1 / span 2"]}
        >
          <StaticImage
            src="../images/beton.jpg"
            alt=""
            placeholder="blurred"
            layout="constrained"
            width={1400}
            imgStyle={{
              objectPosition: "0 100%",
            }}
            style={{ display: "block", height: "100%" }}
          />
        </GridItem>

        {/* Top button */}
        <GridItem
          position="relative" // > image
          gridColumn={[
            "3 / main",
            "4 / main",
            showContact ? "9 / main" : "8 / main",
            null,
            showContact ? "11 / main" : "8 / main",
          ]}
          gridRow={["4", null, "2", null, "1"]}
          mt={[10, null, 12, null, 24]} // TODO: align tablet with social icons
          textAlign="right"
        >
          <Box
            as={Link}
            to="#start"
            display="inline-flex"
            alignItems="center"
            _hover={{ color: "orange.500" }}
            transitionProperty="colors"
            transitionDuration="normal"
            textStyle="h4"
            transformOrigin="bottom right"
            transform="translateY(-100%) rotate(-90deg)"
          >
            Nach oben
            <ArrowIcon height={8} width={8} ml={5} />
          </Box>
        </GridItem>

        {/* Copy */}
        {/* <div>
          © {new Date().getFullYear()}, {organization.legalName}
        </div> */}
      </ContainerGrid>
    </Box>
  )
}

export default Footer
