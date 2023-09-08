/* eslint-disable no-restricted-imports */
import { EsgTestUserTypes } from "../../utils/getCredentials";
import { newTagAssertion } from "../../utils/helper";
import {
  NEW_POPOVER_CORE_FOOTNOTE,
  NEW_POPOVER_CORE_LINK,
} from "../../../src/constants/popover";
import { agGridHeaderDefaultForCoreUser } from "./permission";
describe(
  "Validate core user's screener access",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit(EsgTestUserTypes.ESG_CORE);
      cy.preVisit();
      cy.visitScreener();
      cy.viewport(7000, 1240);
    });
    it(
      "Validate core user can only access main score columns and not sub score columns",
      { scrollBehavior: false },
      () => {
        cy.step("Validate grid behavior for core user");
        agGridHeaderDefaultForCoreUser();
        cy.step("Validate new tag functionality for core user");
        newTagAssertion(NEW_POPOVER_CORE_FOOTNOTE + NEW_POPOVER_CORE_LINK);
      }
    );
  }
);
