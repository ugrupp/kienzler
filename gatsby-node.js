/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { upperFirst, camelCase } = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Extend YAML nodes with refId, based on their file path
  // this refId can later be used to resolve frontmatter refs
  if (
    node.internal.type === "DetailsYaml" ||
    node.internal.type === "FaqsYaml" ||
    node.internal.type === "FacebookYaml" ||
    node.internal.type === "InstagramYaml" ||
    node.internal.type === "YoutubeYaml" ||
    node.internal.type === "ColorsYaml"
  ) {
    // Create ref id (= filename without extension)
    const refParts = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    })
      .split("/")
      .reverse()
    const refId = refParts[0]

    // Added at node.fields.refId
    createNodeField({
      name: "refId",
      node,
      value: refId,
    })

    // Also provide the social media post type as a separate field
    if (
      node.internal.type === "FacebookYaml" ||
      node.internal.type === "InstagramYaml" ||
      node.internal.type === "YoutubeYaml"
    ) {
      createNodeField({
        name: "postType",
        node,
        value: refParts[1],
      })
    }
  }
}

// Customize schema
// 1. Tell gatsby about all the section types defined in frontmatter data
// 2. Resolve frontmatter refs to yaml files
// 3. Add MDX extension
exports.createSchemaCustomization = ({
  actions,
  schema,
  createContentDigest,
}) => {
  const { createTypes, createFieldExtension } = actions

  const typeDefs = [
    `#graphql
      type Image {
        file: File
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

      type Spacing {
        top: [String]
        bottom: [String]
      }

      type Background {
        rows: String!
        gradient: String!
        spacing: Spacing
      }

      type FooterOptions {
        show_contact_footer: Boolean
        show_contact_column: Boolean
        spacing: Spacing
      }

      # Page frontmatter
      type MdxFrontmatter implements Node {
        footer: FooterOptions
        backgrounds: [Background]
        sections: [MdxFrontmatterSections]
      }

      # General
      interface Section {
        type: String!
        slug: String
        title: String
        spacing: Spacing
      }

      # Header
      type HeaderSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        header_type: String
        image: Image
        text: String @mdx
      }

      # Team
      type TeamSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        members: [TeamMember]
      }

      # Team members
      type TeamMember {
        image: Image
        first_name: String
        last_name: String
      }

      # Career
      type CareerSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        text: String @mdx
        cta_text: String @mdx
        cta: Link
        images: [Image]
      }

      # Advantages
      type AdvantagesSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        text: String @mdx
        advantages: String @mdx
      }

      # References
      type Reference {
        image: Image
        title: String @mdx
        goal: String @mdx
        location: String @mdx
      }

      type ReferencesSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        references: [Reference]
      }

      # Details
      type DetailsSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        background_image: Image
        text: String @mdx
        details: [String]
      }

      type DetailsYaml implements Node {
        image: Image
        text: String @mdx
      }

      # Colors
      type ColorsSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        text: String @mdx
        color_groups: String
      }

      # Sizes
      type SizesSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        sizes: [GarageSize]
      }

      type GarageSize {
        title: String!
        widths: String
        lengths: String
        heights: String
        image: Image
      }

      # FAQ
      type FaqsSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        faqs: [String]
      }

      # Card
      type Card {
        type: String!
        title: String
        image: Image
        content: String @mdx
        cta: Link
      }

      # Social media post card
      type SocialMediaPostCard {
        type: String!
        post: String
      }

      # Social media post types
      type FacebookYaml implements Node {
        thumbnail: Image
      }

      type InstagramYaml implements Node {
        thumbnail: Image
      }

      type YoutubeYaml implements Node {
        thumbnail: Image
      }

      union SocialMediaPost = FacebookYaml | InstagramYaml | YoutubeYaml

      # Cards
      type CardsSection implements Section & Node {
        type: String!
        slug: String
        title: String
        spacing: Spacing

        cards_type: String
        background_image: Image
        columns: [CardsColumn]
      }

      # Cards beta
      type CardsBetaSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        image1: Image
        image2: Image
        image3: Image
        social_media_post: String
        text: String @mdx
      }

      # Cards gamma
      type CardsGammaSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        social_media_post: String
        text: String @mdx
        contact: CardsGammaSectionContact
      }

      type CardsGammaSectionContact  {
        text: String @mdx
        first_name: String
        last_name: String
        image: Image
        phone: Link
        mail: Link
      }

      # Company header
      type HeaderCompanySection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        image: Image
        background_image: Image
        columns: [HeaderCompanySectionColumn]
        listColumn: HeaderCompanySectionColumn
        imageColumn: Image
      }

      type HeaderCompanySectionColumn {
        headline: String @mdx(removeRootParagraph: true)
        content: String @mdx
      }

      # Service header
      type HeaderServiceSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        image: Image
        background_image: Image
        decor_image: Image
        columns: [HeaderServiceSectionColumn]
        listColumn: HeaderServiceSectionColumn
      }

      type HeaderServiceSectionColumn {
        headline: String @mdx(removeRootParagraph: true)
        content: String @mdx
      }

      # 404 header
      type HeaderErrorSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        image: Image
      }

      # Plain section
      type PlainSection implements Section & Node {
        type: String!
        slug: String
        title: String @mdx(removeRootParagraph: true)
        spacing: Spacing

        textCol1: String @mdx
        textCol2: String @mdx
      }
    `,

    // Cards column union type with custom resolver
    schema.buildUnionType({
      name: "CardsColumn",
      types: ["Card", "SocialMediaPostCard"],
      resolveType({ type }) {
        return type === "social_media_post" ? "SocialMediaPostCard" : "Card"
      },
    }),

    // YAML ref resolvers
    resolveRefs({
      schema,
      sectionName: "DetailsSection",
      fieldType: "[DetailsYaml]",
      fieldId: "details",
      targetType: "DetailsYaml",
    }),
    resolveRefs({
      schema,
      sectionName: "FaqsSection",
      fieldType: "[FaqsYaml]",
      fieldId: "faqs",
      targetType: "FaqsYaml",
    }),
    resolveRef({
      schema,
      sectionName: "ColorsSection",
      fieldType: "ColorsYaml",
      fieldId: "color_groups",
      targetType: "ColorsYaml",
    }),
    schema.buildObjectType({
      name: "SocialMediaPostCard",
      fields: {
        post: {
          type: "SocialMediaPost",
          resolve: resolveSocialMediaPost("post"),
        },
      },
    }),
    schema.buildObjectType({
      name: "CardsBetaSection",
      fields: {
        social_media_post: {
          type: "SocialMediaPost",
          resolve: resolveSocialMediaPost("social_media_post"),
        },
      },
    }),
    schema.buildObjectType({
      name: "CardsGammaSection",
      fields: {
        social_media_post: {
          type: "SocialMediaPost",
          resolve: resolveSocialMediaPost("social_media_post"),
        },
      },
    }),

    // Image: transform src to file node
    schema.buildObjectType({
      name: "Image",
      fields: {
        file: {
          type: "File",
          resolve: (source, args, context, info) =>
            context.nodeModel
              .getAllNodes({ type: "File" })
              .find(
                node => node.relativePath === source.src.replace("images/", "")
              ),
        },
      },
    }),

    // Map image: transform src to file node
    schema.buildObjectType({
      name: "SiteSiteMetadataMapImage",
      fields: {
        file: {
          type: "File",
          resolve: (source, args, context, info) =>
            context.nodeModel
              .getAllNodes({ type: "File" })
              .find(
                node => node.relativePath === source.src.replace("images/", "")
              ),
        },
      },
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
        "CardsBetaSection",
        "CardsGammaSection",
        "HeaderCompanySection",
        "TeamSection",
        "CareerSection",
        "SizesSection",
        "HeaderServiceSection",
        "HeaderErrorSection",
        "PlainSection",
        "ReferencesSection",
      ],
      // Resolve section based on `type` property
      resolveType: ({ type }) => `${upperFirst(camelCase(type))}Section`,
    }),
  ]
  createTypes(typeDefs)

  // MDX extension, allows for MDX in frontmatter (slightly modified version of https://github.com/zslabs/gatsby-plugin-mdx-frontmatter)
  createFieldExtension({
    name: "mdx",
    args: {
      removeRootParagraph: "Boolean",
    },
    extend(options) {
      return {
        type: "String",
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName]

          // Check if field value is defined (this is the modified part)
          if (!value) {
            return null
          }

          // Isolate MDX
          const mdxType = info.schema.getType("Mdx")
          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body

          return resolve(
            {
              rawBody: value,
              internal: {
                contentDigest: createContentDigest(value), // Used for caching
                removeRootParagraph: !!options.removeRootParagraph,
              },
            },
            args,
            context,
            info
          )
        },
      }
    },
  })
}

// Override single ref fields, using the ref to search for a corresponding node, which must be sourced earlier.
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

          // Find corresponding node for ref
          const refId = source[fieldId]
            .split("/")
            .reverse()[0]
            .replace(".yaml", "")

          return nodes.find(node => node.fields.refId === refId)
        },
      },
    },
  })

// Override ref array fields, using the ref to search for corresponding nodes, which must be sourced earlier.
// Only works with YAML nodes right now, created by the gatsby-transformer-yaml plugin.
const resolveRefs = ({ schema, sectionName, fieldType, fieldId, targetType }) =>
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
            // Unfortunately the file path isn't exposed on the YAML nodes so we search by the previously set refId
            const refId = ref.split("/").reverse()[0].replace(".yaml", "")
            return nodes.find(node => node.fields.refId === refId)
          })
        },
      },
    },
  })

const resolveSocialMediaPost = field => (source, args, context, info) => {
  // Get post type and ref id from post ref
  const postRefParts = source[field].split("/").reverse()
  const postType = postRefParts[1]
  const refId = postRefParts[0].replace(".yaml", "")

  // Query for all nodes of the given postType
  const nodes = context.nodeModel.getAllNodes({
    type:
      postType === "facebook"
        ? "FacebookYaml"
        : postType === "instagram"
        ? "InstagramYaml"
        : postType === "youtube"
        ? "YoutubeYaml"
        : null,
  })

  // Unfortunately the file path isn't exposed on the YAML nodes so we search by the previously set refId
  return nodes.find(node => node.fields.refId === refId)
}
