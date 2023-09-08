/* eslint-disable no-restricted-imports */
import {
  agGridHeaderDefault,
  agGridHeaderCollapsed,
  agGridHeaderExpended,
} from "../header/agHeaderViewport";
import { newTagAssertion } from "../../utils/helper";
import {
  NEW_POPOVER_PREMIUM_FOOTNOTE,
  NEW_POPOVER_PREMIUM_LINK,
} from "../../../src/constants/popover";
describe(
  "Validate ag grid header viewport default and manupulated behavior",
  { tags: ["@pr", "@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
      cy.viewport(7000, 1240);
    });
    it(
      "by default below columns are expended, collapsed and hidden",
      { scrollBehavior: false },
      () => {
        cy.step("Default behavior of the grid");
        agGridHeaderDefault();
        cy.step("behavior of the grid when columns are collapsed");
        agGridHeaderCollapsed();
        cy.step("behavior of the grid when columns are expended");
        agGridHeaderExpended();
        cy.step("Validate new tag functionality for premium user");
        newTagAssertion(
          NEW_POPOVER_PREMIUM_FOOTNOTE + NEW_POPOVER_PREMIUM_LINK
        );
      }
    );
  }
);
