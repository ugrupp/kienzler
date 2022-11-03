import { AspectRatio, Box, GridItem } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { filter } from "lodash"
import React from "react"
import FacebookBoldIcon from "../icons/FacebookBold"
import FaxBoldIcon from "../icons/FaxBold"
import InstagramBoldIcon from "../icons/InstagramBold"
import PhoneBoldIcon from "../icons/PhoneBold"
import ContainerGrid from "./ContainerGrid"
import reactStringReplace from "react-string-replace"
import { Map } from "./Map"

export interface ContactFooterProps {}

const ContactFooter: React.FC<ContactFooterProps> = () => {
  const data = useStaticQuery(graphql`
    query ContactFooterQuey {
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
            faxNumber
          }
          map {
            image {
              alt
              file {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: NONE
                    quality: 90
                  )
                }
              }
            }
          }
          socialProviders {
            type
            title
            user
            url
          }
        }
      }
    }
  `)

  const { organization, map, socialProviders } = data.site.siteMetadata

  const iconStyle = {
    color: "orange.500",
    height: "0.7em",
    width: "0.7em",
    marginRight: "0.3em",
    verticalAlign: "baseline",
  }

  return (
    <section id="kontakt">
      <ContainerGrid>
        <GridItem
          gridColumn={["3 / 13", "4 / 13", "3 / 13", null, "8 / main"]}
          gridRow={{ xl: 1 }}
          pt={[40, null, 48, null, 40, null, 48]}
          pb={[28, null, 36]}
        >
          {/* Address column */}
          <Box as="address" textStyle="paragraph-lg" fontStyle="inherit">
            {reactStringReplace(
              organization.legalName,
              /Betontechnik(\s)Garagen/g,
              (match, i) => (
                <React.Fragment key={i}>
                  Betontechnik
                  <br />
                  Garagen
                </React.Fragment>
              )
            )}
            <br />
            <br />
            {organization.address.streetAddress}
            <br />
            {organization.address.postalCode}{" "}
            {organization.address.addressLocality}
            <br />
            <br />
            <Box
              as="a"
              href={`tel:${organization.telephone.href}`}
              title="Telefon"
              _hover={{ color: "orange.500" }}
              transitionProperty="colors"
              transitionDuration="normal"
            >
              <PhoneBoldIcon {...iconStyle} /> {organization.telephone.label}
            </Box>
            <br />
            <span title="Fax">
              <FaxBoldIcon {...iconStyle} /> {organization.faxNumber}
            </span>
            <br />
            <br />
            <Box
              as="a"
              href={`mailto:${organization.email}`}
              _hover={{ color: "orange.500" }}
              transitionProperty="colors"
              transitionDuration="normal"
            >
              {organization.email}
            </Box>
            {socialProviders
              .filter(({ type }) => ["facebook", "instagram"].includes(type))
              .map(({ type, title, user, url }) => {
                const Icon =
                  type === "facebook"
                    ? FacebookBoldIcon
                    : type === "instagram"
                    ? InstagramBoldIcon
                    : null

                return (
                  <React.Fragment key={type}>
                    <br />
                    <Box
                      as="a"
                      href={url}
                      target="_blank"
                      title={filter([title, user]).join(": ")}
                      _hover={{ color: "orange.500" }}
                      transitionProperty="colors"
                      transitionDuration="normal"
                    >
                      <Icon {...iconStyle} /> {user}
                    </Box>
                  </React.Fragment>
                )
              })}
          </Box>
        </GridItem>

        <GridItem
          gridColumn={[
            "full / 13",
            null,
            "8 / full",
            null,
            "main / 7",
            "main / 6",
          ]}
          gridRow={{ xl: 1 }}
        >
          <AspectRatio ratio={0.7} backgroundColor="gray.200">
            <Box>
              <Map map={map} />
            </Box>
          </AspectRatio>
        </GridItem>
      </ContainerGrid>
    </section>
  )
}

export default ContactFooter
