// eslint-disable-next-line no-restricted-imports
import {
  agGridTable,
  carbonTransitionAssessment,
  screener,
} from "../../locators/screener";

export const scoreFilterValidation = (
  scoreColumn: string,
  scoreValues: string[]
) => {
  cy.get(scoreColumn).trigger("mouseover", { force: true });
  cy.get(agGridTable.getVerticalIcon).click({ force: true });
  cy.get(agGridTable.getColumnMenuFilter).should("exist").and("be.visible");
  cy.get(agGridTable.getFilterList).should("have.length", 6);
  cy.get(agGridTable.getSelectAllFilter)
    .should("have.text", "Select All")
    .should("have.css", "color")
    .and("eq", "rgb(25, 25, 25)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(0)
    .should("have.text", scoreValues[0])
    .should("have.css", "color")
    .and("eq", "rgb(0, 76, 59)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(1)
    .should("have.text", scoreValues[1])
    .should("have.css", "color")
    .and("eq", "rgb(0, 80, 112)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(2)
    .should("have.text", scoreValues[2])
    .should("have.css", "color")
    .and("eq", "rgb(127, 109, 18)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(3)
    .should("have.text", scoreValues[3])
    .should("have.css", "color")
    .and("eq", "rgb(114, 41, 3)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(4)
    .should("have.text", scoreValues[4])
    .should("have.css", "color")
    .and("eq", "rgb(93, 6, 24)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(5)
    .should("have.text", scoreValues[5])
    .should("have.css", "color")
    .and("eq", "rgb(25, 25, 25)");
  cy.get(screener.getAgGridTable).click("topRight", { force: true });
};

export const CTAFilterValidation = () => {
  cy.get(carbonTransitionAssessment.getCTA).trigger("mouseover", {
    force: true,
  });
  cy.get(agGridTable.getVerticalIcon).click();
  cy.get(agGridTable.getColumnMenuFilter).should("exist").and("be.visible");
  cy.get(agGridTable.getFilterList).should("have.length", 11);
  cy.get(agGridTable.getSelectAllFilter)
    .should("have.text", "Select All")
    .should("have.css", "color")
    .and("eq", "rgb(25, 25, 25)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(0)
    .should("have.text", "CT-1")
    .should("have.css", "color")
    .and("eq", "rgb(0, 70, 75)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(1)
    .should("have.text", "CT-2")
    .should("have.css", "color")
    .and("eq", "rgb(0, 70, 75)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(2)
    .should("have.text", "CT-3")
    .should("have.css", "color")
    .and("eq", "rgb(60, 95, 16)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(3)
    .should("have.text", "CT-4")
    .should("have.css", "color")
    .and("eq", "rgb(60, 95, 16)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(4)
    .should("have.text", "CT-5")
    .should("have.css", "color")
    .and("eq", "rgb(60, 95, 16)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(5)
    .should("have.text", "CT-6")
    .should("have.css", "color")
    .and("eq", "rgb(114, 41, 3)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(6)
    .should("have.text", "CT-7")
    .should("have.css", "color")
    .and("eq", "rgb(114, 41, 3)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(7)
    .should("have.text", "CT-8")
    .should("have.css", "color")
    .and("eq", "rgb(114, 41, 3)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(8)
    .should("have.text", "CT-9")
    .should("have.css", "color")
    .and("eq", "rgb(93, 6, 24)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(9)
    .should("have.text", "CT-10")
    .should("have.css", "color")
    .and("eq", "rgb(93, 6, 24)");
  cy.get(agGridTable.getFilterNameLabels)
    .eq(10)
    .should("have.text", "--(No data)")
    .should("have.css", "color")
    .and("eq", "rgb(25, 25, 25)");
};
