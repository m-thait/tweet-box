/* eslint-disable no-restricted-imports */
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import {
  topFilterSplit,
  entityDetails,
  outlook,
} from "../../locators/screener";
import { enableColumnFilterAndSelect } from "../../utils/helper";

export const topFilterDefaultBehavior = () => {
  cy.get(topFilterSplit.getTopFilterBar).should("exist").and("be.visible");
  cy.get(topFilterSplit.getTopFilterBar).click();
  cy.get(topFilterSplit.getFilterModal).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelHeader).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelTitle).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelFooter).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFooterResetButton).should("be.disabled");
  cy.get(topFilterSplit.getFooterCancelButton)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getFooterApplyFilterButton)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getFilterModelCloseIcon).click();
  cy.get(topFilterSplit.getFilterModal).should("not.exist");
};

export const topFilterBehaviorAfterApplyingMultipleFilters = () => {
  enableColumnFilterAndSelect(entityDetails.getSubSector, "Advertising");
  enableColumnFilterAndSelect(outlook.getIssuerOutlook, "Stable");
  cy.get(topFilterSplit.getFooterFilterApplied)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getTopFilterBar).click();
  cy.get(topFilterSplit.getFilterModal).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelHeader).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelTitle).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFilterModelFooter).should("exist").and("be.visible");
  cy.get(topFilterSplit.getFooterResetButton).should("be.enabled");
  cy.get(topFilterSplit.getFooterCancelButton)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getFooterApplyFilterButton)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getFooterAppliedFilterSection)
    .should("exist")
    .and("be.visible");
  cy.get(topFilterSplit.getAppliedFilterChip(ColumnFieldNames.ORG_INDUSTRY))
    .should("exist")
    .and("be.visible");
  cy.get(
    topFilterSplit.getAppliedFilterChip(
      ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK
    )
  )
    .should("exist")
    .and("be.visible");
  cy.get(
    topFilterSplit.getAppliedFilterChipCloseIcon(ColumnFieldNames.ORG_INDUSTRY)
  ).click;
  cy.get(topFilterSplit.getFooterResetButton).click();
  cy.get(topFilterSplit.getFooterAppliedFilterSection).should("not.exist");
  cy.get(topFilterSplit.getFooterApplyFilterButton).click();
  cy.get(topFilterSplit.getFilterModal).should("not.exist");
  cy.get(topFilterSplit.getFooterFilterApplied).should("not.exist");
};
