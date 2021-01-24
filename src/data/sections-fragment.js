import { graphql } from "gatsby"

export const mdxFrontmatterSectionsFields = graphql`
  fragment MdxFrontmatterSectionsFields on MdxFrontmatterSections {
    ... on HeaderSection {
      ...HeaderSectionFields
    }
    ... on DetailsSection {
      ...DetailsSectionFields
    }
    ... on CardsSection {
      ...CardsSectionFields
    }
    ... on AdvantagesSection {
      ...AdvantagesSectionFields
    }
    ... on HeaderCompanySection {
      ...HeaderCompanySectionFragment
    }
    ... on FaqsSection {
      faqs {
        id
        fields {
          refId
        }
        question
        answer
      }
    }
  }
`
