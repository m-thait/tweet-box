/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-restricted-imports */
import {
  CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY,
  PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
  CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
} from "../../../src/constants/local-storage";
import {
  topFilter,
  creditImpactScore,
  entityDetails,
} from "../../locators/screener";
import { validateRowValues } from "../../utils/helper";
import { enableEsgCreditSectorColumn } from "./externalNavigation";

describe(
  "Validate CIS distribution navigation from esg-view page",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.viewport(4000, 1240);
      cy.setLocalStorage(
        CIS_DISTRIBUTION_ORGS_LOCAL_STORAGE_KEY,
        JSON.stringify({
          anchorOrg: "600035606",
          sector: "Pharmaceuticals",
          filters: { cis: ["CIS-3"] },
        })
      );
      cy.preVisit();
      cy.visitScreener();
    });
    it("Validate screener page after CIS distribution navigation from esg-view page", () => {
      cy.step("Enable ESG Credit Score column");
      enableEsgCreditSectorColumn();
      cy.step("Validate top filters are applied");
      cy.get(topFilter.getTopFilterApplied)
        .contains("CIS")
        .should("exist")
        .and("be.visible");
      cy.get(topFilter.getTopFilterApplied)
        .contains("ESG Credit Sector")
        .should("exist")
        .and("be.visible");
      cy.step("Validate column values");
      validateRowValues(creditImpactScore.getCISValue, ["CIS-3"]);
      validateRowValues(entityDetails.getEsgCreditSectorValue, [
        "Pharmaceuticals",
      ]);
    });
  }
);

describe(
  "Validate Peer Comparison navigation from esg-view page",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.setLocalStorage(
        PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
        JSON.stringify([
          "243115",
          "276230",
          "40000",
          "494500",
          "694000",
          "809360313",
        ])
      );
      cy.preVisit();
      cy.visitScreener();
    });
    it(
      "Validate screener page after Peer Comparison navigation from esg-view page",
      { scrollBehavior: false },
      () => {
        cy.step("Validate top filters are applied");
        cy.get(topFilter.getTopFilterApplied)
          .contains("Moody's Organization ID")
          .should("exist")
          .and("be.visible");
      }
    );
  }
);

describe(
  "Validate Peer Comparison navigation from cv2 page for a sovereign company",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.setLocalStorage(
        CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
        JSON.stringify(["186200"])
      );
      cy.preVisit();
      cy.visitScreener();
    });
    it(
      "Validate when come from comp page to screener ESG widget and the sovereign has no peers show the whole sub-sector ",
      { scrollBehavior: false },
      () => {
        cy.wait(3000);
        cy.step("Validate top filters are applied");
        cy.get(topFilter.getSectorLabelCancelIcon)
          .should("exist")
          .and("be.visible");
        cy.step("Validate sub sector is sovereign");
        cy.get(entityDetails.getSubSectorCellValue)
          .not(":first")
          .each(($el) => {
            cy.wrap($el).should("have.text", "Sovereign");
          });
      }
    );
  }
);

describe(
  "Validate Peer Comparison navigation from cv2 page for a specific company",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.setLocalStorage(
        CV2_PEER_COMPARISON_ORGS_LOCAL_STORAGE_KEY,
        JSON.stringify(["550425"])
      );
      cy.preVisit();
      cy.visitScreener();
    });
    it(
      "Validate when come from comp page to screener ESG widget and the company has peers filter by moodys org id",
      { scrollBehavior: false },
      () => {
        cy.wait(3000);
        cy.get(topFilter.getTopFilterApplied)
          .contains("Moody's Organization ID")
          .should("exist")
          .and("be.visible");
        cy.step("Validate sub sector is Passenger Vehicles");
        cy.get(entityDetails.getSubSectorCellValue)
          .not(":first")
          .each(($el) => {
            cy.wrap($el).should("have.text", "Passenger Vehicles");
          });
      }
    );
  }
);
