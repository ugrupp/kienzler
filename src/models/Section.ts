import { AdvantagesSectionModel } from "../components/AdvantagesSection"
import { CardsSectionModel } from "../components/CardsSection"
import { DetailsSectionModel } from "../components/DetailsSection"
import { HeaderSectionModel } from "../components/HeaderSection"

export type SectionModel =
  | HeaderSectionModel
  | AdvantagesSectionModel
  | DetailsSectionModel
  | CardsSectionModel
