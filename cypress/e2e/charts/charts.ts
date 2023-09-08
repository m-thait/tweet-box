/* eslint-disable no-restricted-imports */
import { enableColumnFilter } from "../../utils/helper";
import {
  agGridTable,
  chart,
  creditImpactScore,
  summaryRatings,
  topFilter,
} from "../../locators/screener";
import {
  governanceIssuerProfileScores,
  LTRatings,
  creditImpactScores,
  environementalIssuerProfileScores,
  scoringAndDefinition,
  socialIssuerProfileScores,
} from "./charts-constants";

export const validateChartViewButton = () => {
  cy.get(topFilter.getChartViewLabel)
    .should("be.visible")
    .and("have.text", "Chart View");
  cy.get(chart.getTopChartView).should("not.be.visible");
  cy.get(topFilter.getChartViewButton).should("not.be.checked");
  cy.get(topFilter.getChartViewButton).click();
  cy.get(topFilter.getChartViewButton).should("be.checked");
  cy.get(chart.getTopChartView).should("be.visible");
};

export const validateChartTabs = () => {
  cy.get(chart.getAppTabs).should("exist").and("be.visible");
  cy.get(chart.getCreditRatingChartsTab)
    .should("be.visible")
    .and("have.text", "Credit Rating Charts");
  cy.get(chart.getESGChartsTab)
    .should("be.visible")
    .and("have.text", "ESG Charts");
};

export const validateCreditRatingCharts = () => {
  cy.get(chart.getCreditRatingChart)
    .should("be.visible")
    .find(chart.getXaxisLabels)
    .should("be.visible")
    .should("have.length", 21)
    .each((item, index) => {
      cy.wrap(item).should("have.text", LTRatings[index]);
    });
  cy.get(chart.getCreditRatingChartsLegend)
    .should("be.visible")
    .and("contain.text", "Credit Outlook:");
};

export const validateESGCharts = () => {
  cy.get(chart.getESGChartsTab).click();
  cy.get(chart.getScoreCharts).should("be.visible");
  cy.get(chart.getESGChartsTitle)
    .should("be.visible")
    .and("have.text", "CIS and IPS Distribution");
  cy.get(chart.getCISChart)
    .should("be.visible")
    .and("contain.text", "Credit Impact Score")
    .find(chart.getXaxisLabels)
    .each((item, index) => {
      cy.wrap(item).should("have.text", creditImpactScores[index]);
    });
  cy.get(chart.getIPSEnvironmentalChart)
    .should("be.visible")
    .and("contain.text", "Issuer Profile Score - Environmental")
    .find(chart.getXaxisLabels)
    .each((item, index) => {
      cy.wrap(item).should(
        "have.text",
        environementalIssuerProfileScores[index]
      );
    });
  cy.get(chart.getIPSSocialChart)
    .should("be.visible")
    .and("contain.text", "Issuer Profile Score - Social")
    .find(chart.getXaxisLabels)
    .each((item, index) => {
      cy.wrap(item).should("have.text", socialIssuerProfileScores[index]);
    });
  cy.get(chart.getIPSGovernanceChart)
    .should("be.visible")
    .and("contain.text", "Issuer Profile Score - Governance")
    .find(chart.getXaxisLabels)
    .each((item, index) => {
      cy.wrap(item).should("have.text", governanceIssuerProfileScores[index]);
    });
  cy.get(chart.getESGChartsLegend)
    .should("be.visible")
    .and("contain.text", "Scoring and Definitions:");
  cy.get(chart.getESGChartsLegendItems)
    .should("be.visible")
    .should("have.length", 5)
    .each((item, index) => {
      cy.wrap(item).should("have.text", scoringAndDefinition[index]);
    });
};

export const validateEmptyCreditRatingChart = (listItem: string) => {
  enableColumnFilter(summaryRatings.getLtRating);
  cy.get(agGridTable.getFilterList).contains(listItem).click({ force: true });
  cy.get(chart.getCreditRatingsChartSeries).and((chart) => {
    expect(chart.height()).to.equal(0);
  });
  cy.get(chart.getYaxisLabels).should("be.visible").and("have.text", "0");
  cy.get(chart.getRatingsChartStat).should(
    "contain.text",
    "Entities with LT Rating: 0"
  );
  cy.get(topFilter.getResetButton).click({ force: true });
};

export const validateEmptyCISChart = () => {
  enableColumnFilter(creditImpactScore.getCIS);
  cy.get(agGridTable.getFilterList)
    .contains("--(No data)")
    .click({ force: true });
  cy.get(chart.getCISDistributionChartSeries)
    .should("be.visible")
    .and((chart) => {
      expect(chart.height()).to.equal(0);
    });
  cy.get(chart.getCISBarPercentage(0)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(1)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(2)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(3)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(4)).should("contain.text", "0%");
  cy.get(chart.getESGChartsStat).should(
    "have.text",
    "Entities with ESG Scores: 0"
  );
  cy.get(topFilter.getResetButton).click({ force: true });
};

export const validateCISChartWithSelectedScore = () => {
  enableColumnFilter(creditImpactScore.getCIS);
  cy.get(agGridTable.getFilterList).contains("CIS-2").click({ force: true });
  cy.get(chart.getBar("CIS-1")).invoke("height").should("equal", 0);
  cy.get(chart.getBar("CIS-2")).invoke("height").should("gt", 0);
  cy.get(chart.getBar("CIS-3")).invoke("height").should("equal", 0);
  cy.get(chart.getBar("CIS-4")).invoke("height").should("equal", 0);
  cy.get(chart.getBar("CIS-5")).invoke("height").should("equal", 0);
  cy.get(chart.getCISBarPercentage(0)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(1)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(2)).should("contain.text", "0%");
  cy.get(chart.getCISBarPercentage(3)).should("contain.text", "100%");
  cy.get(chart.getCISBarPercentage(4)).should("contain.text", "0%");
  cy.get(topFilter.getResetButton).click({ force: true });
};
