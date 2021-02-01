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

  const { organization, socialProviders } = data.site.siteMetadata

  const iconStyle = {
    color: "orange.500",
    height: "0.7em",
    width: "0.7em",
    marginRight: "0.3em",
    verticalAlign: "baseline",
  }

  return (
    <section>
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
                <>
                  Betontechnik
                  <br />
                  Garagen
                </>
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
            <a href={`tel:${organization.telephone.href}`} title="Telefon">
              <PhoneBoldIcon {...iconStyle} /> {organization.telephone.label}
            </a>
            <br />
            <span title="Fax">
              <FaxBoldIcon {...iconStyle} /> {organization.faxNumber}
            </span>
            <br />
            <br />
            <a href={`mailto:${organization.email}`}>{organization.email}</a>
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
                  <>
                    <br />
                    <a
                      href={url}
                      target="_blank"
                      title={filter([title, user]).join(": ")}
                    >
                      <Icon {...iconStyle} /> {user}
                    </a>
                  </>
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
          <AspectRatio ratio={0.7} backgroundColor="gray.200" color="gray.500">
            <Box>Map</Box>
          </AspectRatio>
        </GridItem>
      </ContainerGrid>
    </section>
  )
}

export default ContactFooter