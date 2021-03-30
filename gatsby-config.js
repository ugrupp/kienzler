module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: require("./src/data/site.js"),
  plugins: [
    {
      resolve: `@chakra-ui/gatsby-plugin`,
      options: {
        isUsingColorMode: false,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: require.resolve(`./plugins/gatsby-remark-remove-root-p`),
          },
        ],
        remarkPlugins: [
          [
            require("remark-hypher"),
            {
              language: require("hyphenation.de"),
            },
          ],
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kienzler Betontechnik`,
        short_name: `Kienzler`,
        start_url: `/`,
        background_color: `#676767`,
        theme_color: `#EA6A1F`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
