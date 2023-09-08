// eslint-disable-next-line no-restricted-imports
import {
  country,
  screener,
  sector,
  summaryRatings,
  topFilter,
} from "../../locators/screener";
import {
  ltRatingDropDownAssertion,
  investmentGradeListAssertion,
  speculativeGradeListAssertion,
  defaultLtRatingAssertion,
  checkedLtRatingAssertion,
  checkedInvestmentGradeAssertion,
  defaultInvestmentGradeAssertion,
  validateRowValueWhenCheckedTopFilter,
  validateRowValueWhenUncheckedTopFilter,
  sectorListAssertion,
  countryListAssertion,
} from "../top-filter/topFilter";
import {
  investmentGrade,
  northAmerica,
  sectorList,
} from "../top-filter/topFilter-constant";

describe(
  "Validate top filter functionalities",
  { tags: ["@dev", "@stg", "@prd"] },
  () => {
    beforeEach(() => {
      cy.authVisit();
      cy.preVisit();
      cy.visitScreener();
    });

    it(
      "Validate app top filter bar exist and it's child elements and their functionalities",
      { scrollBehavior: false, tags: "@pr" },
      () => {
        cy.step("app top filter bar exist");
        cy.get(topFilter.getAppTopFilter).should("exist").and("be.visible");
        cy.step("app top left and right options bar exist");
        cy.get(topFilter.getLeftOptions).should("exist").and("be.visible");
        cy.get(topFilter.getRightOptions).should("exist").and("be.visible");
        cy.step(
          "all the expected elements inside app top left options bar exist"
        );
        cy.get(topFilter.getFilterIcon).should("exist").and("be.visible");
        cy.get(topFilter.getMoreFilterButton).should("exist").and("be.visible");
        cy.step(
          "all the expected elements inside app top right options bar exist"
        );
        cy.get(topFilter.getEditColumnButton).should("exist").and("be.visible");
        cy.get(topFilter.getExportXlsButton).should("exist").and("be.visible");
        cy.step(
          "when clicked on more filter button, filter menu from left panel appears and clicking again caused the panel to disappear"
        );
        cy.get(topFilter.getMoreFilterButton).click();
        cy.get(screener.getAgGridFilterToolPanel)
          .should("exist")
          .and("be.visible");
        cy.get(topFilter.getMoreFilterButton).click();
        cy.get(screener.getAgGridFilterToolPanel).should("not.be.visible");
        cy.step(
          "when clicked on edit column button, column menu from left panel appears and clicking again caused the panel to disappear"
        );
        cy.get(topFilter.getEditColumnButton).click();
        cy.get(screener.getAgGridColumnPanel).should("exist").and("be.visible");
        cy.get(topFilter.getEditColumnButton).click();
        cy.get(screener.getAgGridColumnPanel).should("not.be.visible");
      }
    );

    it(
      "Validate top filter LT Rating functionalities",
      { scrollBehavior: false, tags: "@pr" },
      () => {
        cy.step("LT Rating items are visible in their respective order");
        cy.get(topFilter.getLTRatingFilter).click();
        cy.get(topFilter.getLTRatingSelectDropdown)
          .should("exist")
          .and("be.visible");
        ltRatingDropDownAssertion();
        cy.step("Investment Grade items are visible in their respective order");
        investmentGradeListAssertion();
        cy.step(
          "Speculative Grade options are visible in their respective order"
        );
        speculativeGradeListAssertion();
        cy.step(
          "everything within top filter LT Rating is unselected by default"
        );
        defaultLtRatingAssertion();
        cy.step(
          "selecting Investment Grade checkbox selects everything within the hierarchy"
        );
        cy.get(topFilter.getCheckbox("investment_grade")).check({
          force: true,
        });
        checkedInvestmentGradeAssertion();
        cy.step(
          "unselecting Investment Grade checkbox unselects everything within the hierarchy"
        );
        cy.get(topFilter.getCheckbox("investment_grade")).uncheck({
          force: true,
        });
        defaultInvestmentGradeAssertion();
        cy.step("select all button selects every item in LT Rating dropdown");
        cy.get(topFilter.getCheckbox("select-all")).check({ force: true });
        checkedLtRatingAssertion();
        cy.step("reset button unselects everything in LT Rating dropdown");
        cy.get(topFilter.getButton)
          .contains("Reset")
          .should("exist")
          .click({ force: true });
        defaultLtRatingAssertion();
      }
    );

    it(
      "Validate state of checkboxes and table content after selecting and unselecting",
      { scrollBehavior: false },
      () => {
        cy.step(
          "state of checkboxes and table content after selecting items in Investment Grade dropdown"
        );
        cy.get(topFilter.getLTRatingFilter).click();
        cy.get(topFilter.getLTRatingSelectDropdown)
          .should("exist")
          .and("be.visible");
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Aaa"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(0, 2)
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Aa"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(0, 8)
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("A"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(0, 14)
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Baa"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice()
        );
        cy.step(
          "state of checkboxes and table content after unselecting items in Investment Grade dropdown"
        );
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("Aaa"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(2)
        );
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("Aa"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(8)
        );
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("A"),
          summaryRatings.getLtRatingValue,
          investmentGrade.slice(14)
        );
        cy.get(topFilter.getCheckbox("Baa")).uncheck({ force: true });
        cy.get(topFilter.getCheckbox("investment_grade"))
          .should("not.be.checked")
          .and("have.attr", "data-indeterminate", "false");
        cy.get(topFilter.getCheckbox("select-all"))
          .should("not.be.checked")
          .and("have.attr", "data-indeterminate", "false");
      }
    );

    it(
      "Validate top filter Sector and Country functionalities",
      { scrollBehavior: false },
      () => {
        cy.step("Add sector column to table");
        cy.get(topFilter.getEditColumnButton).click({ force: true });
        cy.get(topFilter.getSectorCheckBox).check({ force: true });
        cy.log("Validate Sector list order");
        cy.get(topFilter.getSectorFilter).click();
        cy.get(topFilter.getSectorFilterDropdown)
          .should("exist")
          .and("be.visible");
        sectorListAssertion();
        cy.step(
          "Verify table content after selecting and unselecting Sector list items"
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Insurance_fin"),
          sector.getSectorValue,
          sectorList.slice(3, 4)
        );
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("Insurance_fin"),
          sector.getSectorValue,
          sectorList
        );
        cy.step("Verify user can search using search box");
        cy.get(topFilter.getSearchBox).type("Airline", { force: true });
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Airline_trans"),
          sector.getSectorValue,
          sectorList.slice(0, 1)
        );
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("Airline_trans"),
          sector.getSectorValue,
          sectorList
        );
        cy.step("Validate Country list order");
        cy.get(topFilter.getCountryFilter).click();
        cy.get(topFilter.getCountryFilterDropdown)
          .should("exist")
          .and("be.visible");
        countryListAssertion();
        cy.step(
          "Verify table content after selecting and unselecting Country list items"
        );
        cy.get(topFilter.getExpandArrow("North_America_reg")).click({
          force: true,
        });
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("United_States"),
          country.getCountryValue,
          northAmerica.slice(0, 1)
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Bermuda"),
          country.getCountryValue,
          northAmerica.slice(0, 2)
        );
        validateRowValueWhenCheckedTopFilter(
          topFilter.getCheckbox("Canada"),
          country.getCountryValue,
          northAmerica
        );
        cy.step("Verify user can search using search box");
        cy.get(topFilter.getSearchBox).type("United States", { force: true });
        validateRowValueWhenUncheckedTopFilter(
          topFilter.getCheckbox("United_States"),
          country.getCountryValue,
          northAmerica.slice(1, 3)
        );
      }
    );
  }
);
