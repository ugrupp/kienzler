/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { upperFirst } = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

// Extend YAML nodes with refId, based on their file path
// this refId can later be used to resolve frontmatter refs
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (
    node.internal.type === "DetailsYaml" ||
    node.internal.type === "FaqsYaml"
  ) {
    // Create ref id (= filename without extension)
    const refId = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    })
      .split("/")
      .reverse()[0]

    // Added at node.fields.refId
    createNodeField({
      name: "refId",
      node,
      value: refId,
    })
  }
}

// Customize schema
// 1. Tell gatsby about all the section types defined in frontmatter data
// 2. Resolve frontmatter refs to yaml files
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    `#graphql
      type Image {
        src: String
        alt: String
        fit: String
        position: String
      }

      type Link {
        url: String
        label: String
        target: String
      }

      # Sections
      type MdxFrontmatter implements Node {
        sections: [MdxFrontmatterSections]
      }

      # General
      interface Section {
        type: String!
        slug: String
        title: String
      }

      # Header
      type HeaderSection implements Section & Node {
        type: String!
        slug: String
        title: String

        header_type: String
        image: Image
        text: String
      }

      # Advantages
      type AdvantagesSection implements Section & Node {
        type: String!
        slug: String
        title: String

        text: String
        advantages: [String]
      }

      # Details
      type DetailsSection implements Section & Node {
        type: String!
        slug: String
        title: String

        text: String
        details: [String]
      }

      # Colors
      type ColorsSection implements Section & Node {
        type: String!
        slug: String
        title: String

        text: String
        color_groups: String
      }

      # FAQ
      type FaqsSection implements Section & Node {
        type: String!
        slug: String
        title: String

        faqs: [String]
      }

      # Card
      type Card {
        type: String!
        title: String
        content: String
        cta: Link
      }

      # Social media post
      type SocialMediaPost {
        type: String!
        post: String
      }

      # Cards
      type CardsSection implements Section & Node {
        type: String!
        slug: String
        title: String

        cards_type: String
        background_image: Image
        columns: [CardsColumn]
      }
    `,

    // Cards column union type with custom resolver
    schema.buildUnionType({
      name: "CardsColumn",
      types: ["Card", "SocialMediaPost"],
      resolveType({ type }) {
        return type === "social_media_post" ? "SocialMediaPost" : "Card"
      },
    }),

    // Ref resolvers
    resolveRef({
      schema,
      sectionName: "DetailsSection",
      fieldType: "[DetailsYaml]",
      fieldId: "details",
      targetType: "DetailsYaml",
    }),
    resolveRef({
      schema,
      sectionName: "FaqsSection",
      fieldType: "[FaqsYaml]",
      fieldId: "faqs",
      targetType: "FaqsYaml",
    }),

    // Sections union type with custom resolver
    schema.buildUnionType({
      name: "MdxFrontmatterSections",
      types: [
        "HeaderSection",
        "AdvantagesSection",
        "DetailsSection",
        "ColorsSection",
        "FaqsSection",
        "CardsSection",
      ],
      // Resolve section based on `type` property
      resolveType: ({ type }) => `${upperFirst(type)}Section`,
    }),
  ]
  createTypes(typeDefs)
}

// Override ref fields, using the ref to search for corresponding nodes, which must be sourced earlier.
// Only works with YAML nodes right now, created by the gatsby-transformer-yaml plugin.
const resolveRef = ({ schema, sectionName, fieldType, fieldId, targetType }) =>
  schema.buildObjectType({
    name: sectionName,
    fields: {
      [fieldId]: {
        type: fieldType,
        resolve: (source, args, context, info) => {
          // Query for all nodes
          const nodes = context.nodeModel.getAllNodes({ type: targetType })
          // Map through refs (file paths) and find corresponding nodes
          return source[fieldId].map(ref => {
            // Unfortunately the file path isn't exposed on the YAML nodes.
            // TODO: Find a way to query by filepath instead of ref id.
            const refId = ref.split("/").reverse()[0].replace(".yaml", "")
            return nodes.find(node => node.fields.refId === refId)
          })
        },
      },
    },
  })
