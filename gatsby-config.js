module.exports = {
  siteMetadata: {
    title: `Kienzler Betontechnik`,
    description: `Wir sind Ihr kompetenter Ansprechpartner für Garagen, Nutzräume und Fertiggaragen von der Beratung bis zur Realisierung.`,
    keywords: `Grötz Fertiggaragen, Vario-Garagen, Betonteile, Garagen nach Maß, Nutzräume`,
    author: `Kienzler Betontechnik`,
    organization: {
      name: `Kienzler Betontechnik`,
      legalName: "Kienzler Betontechnik Garagen GmbH & Co. KG",
      email: `info@kienzler-betontechnik.de`,
      address: {
        addressCountry: `Deutschland`,
        addressLocality: `Freiburg`,
        postalCode: `79110`,
        streetAddress: `Ziegelhofstraße 35a`,
      },
      telephone: {
        label: `0761 898 284 04`,
        href: `+4976189828404`,
      },
    },
    socialProviders: [
      {
        type: "facebook",
        title: "Facebook",
        user: "@kienzlerbetontechnik",
        url: "https://www.facebook.com/Kienzler-Betontechnik-1170071456487005",
      },
      {
        type: "instagram",
        title: "Instagram",
        user: "@kienzlerbetontechnik",
        url: "https://www.instagram.com/kienzlerbetontechnik/",
      },
      {
        type: "youtube",
        title: "YouTube",
        url: "https://www.youtube.com/channel/UCb0-oNK94ZUQe5ZVemD6DrQ",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
