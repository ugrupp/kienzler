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
    ... on CardsBetaSection {
      ...CardsBetaSectionFields
    }
    ... on CardsGammaSection {
      ...CardsGammaSectionFields
    }
    ... on CardsDeltaSection {
      ...CardsDeltaSectionFields
    }
    ... on AdvantagesSection {
      ...AdvantagesSectionFields
    }
    ... on HeaderCompanySection {
      ...HeaderCompanySectionFragment
    }
    ... on TeamSection {
      ...TeamSectionFragment
    }
    ... on CareerSection {
      ...CareerSectionFragment
    }
    ... on HeaderServiceSection {
      ...HeaderServiceSectionFragment
    }
    ... on HeaderErrorSection {
      ...HeaderErrorSectionFragment
    }
    ... on PlainSection {
      ...PlainSectionFragment
    }
    ... on ColorsSection {
      ...ColorsSectionFragment
    }
    ... on SizesSection {
      ...SizesSectionFragment
    }
    ... on ReferencesSection {
      ...ReferencesSectionFragment
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
