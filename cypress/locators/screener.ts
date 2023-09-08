import {
  ColumnFieldNames,
  ESGGroupNames,
} from "@moodys/mdc-table.schemas.screener";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";

export const entityDetails = {
  getEntityDetails: `[col-id="entity-details_0"]`,
  getOrgName: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_ISSUER_NAME}"]`,
  getSector: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_MARKET_SEGMENT}"]`,
  getSubSector: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_INDUSTRY}"]`,
  getSubSectorCellValue: `[role="gridcell"][col-id="${ColumnFieldNames.ORG_INDUSTRY}"] > div > span`,
  getCountry: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_COUNTRY}"]`,
  getEsgCreditSector: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_ESG_SECTOR_MIS}"]`,
  getEsgCreditSectorValue: `[role="gridcell"][col-id="${ColumnFieldNames.ORG_ESG_SECTOR_MIS}"] > div > span`,
  getCreditAnalyst: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_ANALYST_NAME}"]`,
  getCreditAnalystCellLink: (pos: number) =>
    `[data-testid="analyst-link-${pos}"]`,
  getOrgID: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_ID}"]`,
  getLei: `[data-testid="column-header-renderer-${ColumnFieldNames.ORG_LEI}"]`,
  getEntityDetailsExpandArrow:
    '[col-id="entity-details_0"] [class= "ag-icon ag-icon-contracted"]',
  getEntityDetailsCollapsedArrow:
    '[col-id="entity-details_0"] [class= "ag-icon ag-icon-expanded"]',
  getNameFilterList: `[data-testid*="base-filter-render-list-item"]`,
};

export const newTag = {
  getNewButton: '[data-testid="new-btn"]',
  getNewButtonCloseIcon: '[data-testid="new-popover-close"]',
  getNewPopoverContent: '[data-testid="new-popover-content"]',
  getNewPopoverParagraphOne:
    '[data-testid="new-popover-content"] p:nth-child(1)',
  getNewPopoverParagraphTwo:
    '[data-testid="new-popover-content"] p:nth-child(2)',
  getNewPopoverLink: '[data-testid="new-popover-link"]',
};

export const sector = {
  getSectorValue: `[role="gridcell"][col-id="${ColumnFieldNames.ORG_MARKET_SEGMENT}"] > div > span`,
};

export const subSector = {
  getSubsectorValue: `[role="gridcell"][col-id="${ColumnFieldNames.ORG_INDUSTRY}"] > div > span`,
};

export const country = {
  getCountryValue: `[role="gridcell"][col-id="${ColumnFieldNames.ORG_COUNTRY}"] > div > span`,
};

export const summaryRatings = {
  getSummaryRatings: `[col-id="summary-ratings_0"]`,
  getLtRating: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_RATING}"]`,
  getLtRatingValue: `[role="gridcell"][col-id="${ColumnFieldNames.LT_RATING}"] > div > span`,
  getLtRatingDescription: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_RATING_CLASS}"]`,
  getLtRatingDescriptionValue: `[role="gridcell"][col-id="${ColumnFieldNames.LT_RATING_CLASS}"] > div > span`,
  getLastLtRatingAction: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_RATING_LAST_ACTION}"]`,
  getLastLtRatingActionValue: `[role="gridcell"][col-id="${ColumnFieldNames.LT_RATING_LAST_ACTION}"] > div > span`,
  getLtRatingActionDate: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_RATING_DATE}"]`,
  getLastLtRatingActionDateValue: `[role="gridcell"][col-id="${ColumnFieldNames.LT_RATING_DATE}"] > div > span`,
  getLtRatingHistory: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_RATING_SPARKLINE}"]`,
  getCreditRatingExpandArrow:
    '[col-id="summary-ratings_0"] [class= "ag-icon ag-icon-contracted"]',
  getCreditRatingCollapsedArrow:
    '[col-id="summary-ratings_0"] [class= "ag-icon ag-icon-expanded"]',
};

export const banksSummaryRatings = {
  getBanksSummaryRatings: `[col-id="banks-summary-ratings_0"]`,
  getLtBankSummary: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_BANK_SUMMARY_RATING}"]`,
  getLtBankSummaryActionDate: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_BANK_SUMMARY_RATING_DATE}"]`,
  getLtBankSummaryAction: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_BANK_SUMMARY_RATING_ACTION}"]`,
  getLtBankSummaryActionClass: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_BANK_SUMMARY_RATING_CLASS}"]`,
  getBankSummaryRatingExpandArrow:
    '[col-id="banks-summary-ratings_0"] [class= "ag-icon ag-icon-contracted"]',
  getBankSummaryRatingCollapsedArrow:
    '[col-id="banks-summary-ratings_0"] [class= "ag-icon ag-icon-expanded"]',
  getLtBankSummaryRatingExpandArrow: `[data-testid="group-header-${replaceSpaceWithDash(
    ESGGroupNames.BANK_LT_RATING_GROUP
  )}-expanded"]`,
  getLtBankSummaryRatingCollapsedArrow: `[data-testid="group-header-${replaceSpaceWithDash(
    ESGGroupNames.BANK_LT_RATING_GROUP
  )}-collapsed"]`,
};

export const publicFinanceSummaryRatings = {
  getPublicFinanceSummaryRatings: `[col-id="public-finance-summary-ratings_0"]`,
  getLtIssuerRating: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_ISSUER_RATING}"]`,
  getLtIssuerRatingActionDate: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_ISSUER_RATING_DATE}"]`,
  getSeniormostTaxBacked: `[data-testid="column-header-renderer-${ColumnFieldNames.SENIORMOST_TAXED_BACKED_RATING}"]`,
  getSeniormostTaxBackedActionDate: `[data-testid="column-header-renderer-${ColumnFieldNames.SENIORMOST_TAX_BACKED_RATING_DATE}"]`,
  getSeniormostRevenueBacked: `[data-testid="column-header-renderer-${ColumnFieldNames.SENIORMOST_REVENUE_BACKED_RATING}"]`,
  getSeniormostRevenueBackedActionDate: `[data-testid="column-header-renderer-${ColumnFieldNames.SENIORMOST_REVENUE_BACKED_RATING_DATE}"]`,
};

export const outlook = {
  getOutlook: `[col-id="outlook_0"]`,
  getIssuerOutlook: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK}"]`,
  getIssuerOutlookValue: `[role="gridcell"][col-id="${ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK}"] > div > span`,
  getIssuerOutlookDate: `[data-testid="column-header-renderer-${ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK_DATE}"]`,
  getOutlookExpandArrow:
    '[col-id="outlook_0"] [class="ag-icon ag-icon-contracted"]',
  getOutlookCollapsedArrow:
    '[col-id="outlook_0"] [class="ag-icon ag-icon-expanded"]',
  getIssuerOutlookDateRowValues: `[role="gridcell"][col-id="${ColumnFieldNames.LT_ISSUER_RATING_OUTLOOK_DATE}"]`,
};

export const creditImpactScore = {
  getCreditImpactScore: `[col-id="credit-impact-score_0"]`,
  getCIS: `[data-testid="column-header-renderer-${ColumnFieldNames.CREDIT_IMPACT_SCORE}"]`,
  getCISValue: `[role="gridcell"][col-id="${ColumnFieldNames.CREDIT_IMPACT_SCORE}"] > div > span`,
  getCisAndIpsDate: `[data-testid="column-header-renderer-${ColumnFieldNames.CIS_AND_IPS_DATE}"]`,
  getDrawerButtonForCis: `[data-testid="info-icon-${replaceSpaceWithDash(
    ESGGroupNames.ESG_SCORES_MIS
  )}"]`,
  getCreditImpactScoreCellValues: `[col-id="${ColumnFieldNames.CREDIT_IMPACT_SCORE}"] > div > span > div > a`,
  getCisExpandArrow:
    '[col-id="credit-impact-score_0"] [class="ag-icon ag-icon-contracted"]',
  getCisCollapsedArrow:
    '[col-id="credit-impact-score_0"] [class="ag-icon ag-icon-expanded"]',
};

export const environmentIssuerProfileScore = {
  getEnvironmentIssuerProfileScore: `[col-id="environmental-issuer-profile-score_0"]`,
  getIpsE: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_IPS_SCORE}"]`,
  getPhysicalClimateRisks: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_PHYSICAL_CLIMATE_RISKS}"]`,
  getCarbonTransition: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_CARBON_TRANSITION}"]`,
  getWaterManagement: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_WATER_MANAGEMENT}"]`,
  getNaturalCapital: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_NATURAL_CAPITAL}"]`,
  getWasteAndPollution: `[data-testid="column-header-renderer-${ColumnFieldNames.ENV_WASTE_AND_POLLUTION}"]`,
  getDrawerButtonForEnvironment: `[data-testid="info-icon-${replaceSpaceWithDash(
    ESGGroupNames.ENVIRONMENTAL_SCORES_MIS
  )}"]`,
  getEnvironmentIssuerProfileScoreCellValues: `[col-id="${ColumnFieldNames.ENV_IPS_SCORE}"] > div > span > div > a`,
  getEnvExpandArrow:
    '[col-id="environmental-issuer-profile-score_0"] [class="ag-icon ag-icon-contracted"]',
  getEnvCollapsedArrow:
    '[col-id="environmental-issuer-profile-score_0"] [class="ag-icon ag-icon-expanded"]',
};

export const socialIssuerProfileScore = {
  getSocialIssuerProfileScore: `[col-id="social-issuer-profile-score_0"]`,
  getIpsS: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_IPS_SCORE}"]`,
  getCustomerRelations: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_CUSTOMER_RELATIONS}"]`,
  getHumanCapital: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_HUMAN_CAPITAL}"]`,
  getDemographicAndSocietalTrends: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_DEMOGRAPHIC_AND_SOCIETAL_TRENDS}"]`,
  getHealthAndSafetlyPrivate: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_HEALTH_AND_SAFETY_PRIVATE}"]`,
  getResponsibleProduction: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_RESPONSIBLE_PRODUCTION}"]`,
  getDemographics: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_DEMOGRAPHICS}"]`,
  getLaborAndIncome: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_LABOR_AND_INCOME}"]`,
  getEducation: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_EDUCATION}"]`,
  getHousing: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_HOUSING}"]`,
  getHealthAndSafety: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_HEALTH_AND_SAFETY_PUBLIC}"]`,
  getAccessToBasicServices: `[data-testid="column-header-renderer-${ColumnFieldNames.SOCIAL_ACCESS_TO_BASIC_SERVICES}"]`,
  getDrawerButtonForSocial: `[data-testid="info-icon-${replaceSpaceWithDash(
    ESGGroupNames.SOCIAL_SCORES_MIS
  )}"]`,
  getSocialIssuerProfileScoreCellValues: `[col-id="${ColumnFieldNames.SOCIAL_IPS_SCORE}"] > div > span > div > a`,
  getSocialExpandArrow:
    '[col-id="social-issuer-profile-score_0"] [class="ag-icon ag-icon-contracted"]',
  getSocialCollapsedArrow:
    '[col-id="social-issuer-profile-score_0"] [class="ag-icon ag-icon-expanded"]',
};

export const governanceIssuerProfileScore = {
  getGovernanceIssuerProfileScore: `[col-id="governance-issuer-profile-score_0"]`,
  getIpsG: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_IPS_SCORE}"]`,
  getFinancialStrategyAndRisk: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_FINANCIAL_STRATEGY_AND_RISK_MANAGEMENT}"]`,
  getManagementCredibilityAndTrackRecord: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_MANAGEMENT_CREDIBILITY_AND_TRACK_RECORD}"]`,
  getBoardStructureAndPolicies: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_BOARD_STRUCTURE_AND_POLICIES}"]`,
  getOrganizationalStructure: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_ORGANIZATIONAL_STRUCTURE}"]`,
  getComplianceAndReporting: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_COMPLIANCE_AND_REPORTING}"]`,
  getInstitutionalStructure: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_INSTITUTIONAL_STRUCTURE}"]`,
  getPolicyCredibilityAndEffectiveness: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_POLICY_CREDIBILITY_AND_EFFECTIVENESS}"]`,
  getBudgetManagement: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_BUDGET_MANAGEMENT}"]`,
  getTransparencyAndDisclosure: `[data-testid="column-header-renderer-${ColumnFieldNames.GOV_TRANSPARENCY_AND_DISCLOSURE}"]`,
  getDrawerButtonForGovernance: `[data-testid="info-icon-${replaceSpaceWithDash(
    ESGGroupNames.GOVERNANCE_SCORES_MIS
  )}"]`,
  getGovernanceIssuerProfileScoreCellValues: `[col-id="${ColumnFieldNames.GOV_IPS_SCORE}"] > div > span > div > a`,
  getGovExpandArrow:
    '[col-id="governance-issuer-profile-score_0"] [class="ag-icon ag-icon-contracted"]',
  getGovCollapsedArrow:
    '[col-id="governance-issuer-profile-score_0"] [class="ag-icon ag-icon-expanded"]',
};

export const carbonTransitionAssessment = {
  getCarbonTransitionAssessment: `[col-id="carbon-transition-assessment_0"]`,
  getCTA: `[data-testid="column-header-renderer-${ColumnFieldNames.CTA_SCORE}"]`,
  getCtaDate: `[data-testid="column-header-renderer-${ColumnFieldNames.CTA_DATE}"]`,
};

export const login = {
  signInButton: `button[data-testid="sign-in"]`,
  userInput: `input[data-testid="emailInput"]`,
  passwordInput: `input[data-testid="password"]`,
  continueButton: `button[data-testid="emailContinueButton"]`,
  submittButon: `button[data-testid="loadingButton"]`,
};

export const screener = {
  getErrorPage: `[data-testid="error-page-container"]`,
  getErrorMessage: `[data-testid="error-page-message"]`,
  getAgGridTable: `[data-testid="ui-table-ag-grid"]`,
  getAgGridFilterToolPanel: ".ag-filter-toolpanel",
  getAgGridColumnPanel: ".ag-column-panel",
  getExportIcon: ".exportIcon",
  getEsgCreditAnalystColumn: `[aria-label="Credit Analyst Column"] [type="checkbox"]`,
  getEsgCreditScoreColumn: `[aria-label="ESG Credit Sector Column"] > div > div :nth-child(2)`,
  getLeiColumn: `[aria-label="LEI Column"] [type="checkbox"]`,
  getSkeletonLoader: '[data-testid="table-loader"]',
  getShareLinkSnackBar: '[data-testid="top-bar-share-link-snackbar"]',
  getShareLinkSnackBarCloseIcon:
    '[data-testid="top-bar-share-link-snackbar"] [data-testid="CloseIcon"]',
  getAllColumns: `[data-testid*="column-header-renderer-"]`,
};

export const agGridTable = {
  getTableBody: `[data-testid="ui-table"] .ag-body-viewport`,
  getOrgs: `[class="ag-pinned-left-cols-container"] [col-id="orgName"]`,
  getVerticalIcon: `[data-testid="MoreVertIcon"]`,
  getColumnMenuFilter: `[aria-label="Column Menu"]`,
  getSearchField: `[data-testid="tree-select-search-box-input"]`,
  getSelectAllFilter: `[data-testid="base-filter-select-all"]`,
  getColumnFilterListViewport: `[data-testid="base-filter-list-items-container"]`,
  getResetFilterButton: `[data-testid="base-filter-reset-button"]`,
  getFilteredItem: (pos: number) =>
    `[data-testid="base-filter-checkbox-${pos}"]`,
  getFilteredItemName: (pos: number) =>
    `[data-testid="base-filter-name-${pos}"] > span`,
  getFilterList: `[data-testid="base-filter-loaded-render-filter-options-container"] > li`,
  getFilterNameLabels:
    '[data-testid="base-filter-loaded-render-filter-options-container"] > li > div > label',
  getCellValue: ".ag-cell-value",
  getRightClickMenu: ".ag-menu-option-part",
  getRowCountTotal: `[data-testid="header-row-count-orgName"]`,
  getRow: (index: number) => `[data-testid="row-value-link-${index}"]`,
  getRowCloseIcon: (index: number) =>
    `[data-testid="first-column-close-icon-${index}"]`,
};

export const listMedian = {
  getListMedianRow: "span > [data-testid='list-median-cell']",
  getListMedianPopUpLink: "div > [data-testid='list-median-popover-link']",
  getListMedianText: "div > [data-testid='list-median-text']",
  getListMedianPopUpCloseIcon:
    "div > [data-testid='list-median-popover-close']",
};

export const topFilter = {
  getAppTopFilter: `[data-testid="app-top-filter-bar"]`,
  getLeftOptions: `[data-testid="top-bar-left-options"]`,
  getRightOptions: `[data-testid="top-bar-right-options"]`,
  getFilterIcon: `[data-testid="FilterListIcon"]`,
  getSearchBox: `[data-testid="tree-select-search-box-input"]`,
  getSectorFilter: `[data-testid="${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select"]`,
  getSectorFilterDropdown: `[data-testid="${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select-dropdown"]`,
  getSectorDropdownList: `[data-testid="${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select-dropdown"] > div > ul > li`,
  getSectorLabelCancelIcon: `[data-testid="${ColumnFieldNames.ORG_MARKET_SEGMENT}-tree-select"] [data-testid="CancelIcon"]`,
  getCountryFilter: `[data-testid="${ColumnFieldNames.ORG_COUNTRY}-tree-select"]`,
  getCountryFilterDropdown: `[data-testid="${ColumnFieldNames.ORG_COUNTRY}-tree-select-dropdown"]`,
  getCountryDropdownList: `[data-testid="${ColumnFieldNames.ORG_COUNTRY}-tree-select-dropdown"] > div > ul > li`,
  getCountryLabelCancelIcon: `[data-testid="${ColumnFieldNames.ORG_COUNTRY}-tree-select"] [data-testid="CancelIcon"]`,
  getLTRatingFilter: `[data-testid="${ColumnFieldNames.LT_RATING}-tree-select"]`,
  getLTRatingSelectDropdown: `[data-testid="${ColumnFieldNames.LT_RATING}-tree-select-dropdown"]`,
  getLTRatingSelectDropdownList: `[data-testid="${ColumnFieldNames.LT_RATING}-tree-select-dropdown"] > div > ul > li`,
  getLtRatingLabelCancelIcon: `[data-testid="${ColumnFieldNames.LT_RATING}-tree-select"] [data-testid="CancelIcon"]`,
  getInvestmentGradeList: `[data-testid="tree-item-investment_grade"] > ul > div > div > li`,
  getSpeculativeGradeList: `[data-testid="tree-item-speculative_grade"] > ul > div > div > li`,
  getCheckbox: (value: string) =>
    `[data-testid="tree-item-checkbox-${value}"] [type="checkbox"]`,
  getTopFilterApplied: `[data-testid="top-bar-applied-filters"] > span`,
  getRemoveFilterAppliedButton: `[data-testid="top-bar-applied-filters"] > svg`,
  getResetButton: `[data-testid="top-bar-left-options"] > div > button:nth-child(1)`,
  getMoreFilterButton: `[data-testid="more-filters"]`,
  getTabs: `[data-testid="view-tabs"] [role="tablist"] > button`,
  getOverviewTab: `[data-testid="view-tabs"] [role="tablist"] > button:nth-child(1)`,
  getESGTab: `[data-testid="view-tabs"] [role="tablist"] > button:nth-child(2)`,

  getEditColumnButton: `[data-testid="top-bar-edit-columns-button"]`,
  getExportXlsButton: `[data-testid="top-bar-export-xls-button"]`,
  getFilterColumns: `[class="ag-column-select-header"] [aria-label="Filter Columns Input"]`,
  getButton: `button[type="button"]`,
  getExpandAllButton: `[data-testid="lt-rating-tree-select-dropdown"] > div:nth-child(1)`,
  getExpandArrow: (value: string) =>
    `[data-testid="tree-item-${value}"] > div > div > svg`,
  getSectorCheckBox: '[aria-label="Sector Column"] [type="checkbox"]',
  getChartViewLabel: `[data-testid="top-bar-chart-label"]`,
  getChartViewButton: `[data-testid="top-bar-chart-toggle"] [type="checkbox"]`,
  getSharedLinkedButton: 'div > [data-testid="top-bar-share-link-button"]',
};

export const chart = {
  getTopChartView: `[data-testid="app-top-chart-view"]`,
  getAppTabs: `[data-testid="app-tabs"]`,
  getCreditRatingChartsTab: `[data-testid="app-tabs-slider-item-0"]`,
  getESGChartsTab: `[data-testid="app-tabs-slider-item-1"]`,
  getCreditRatingChart: `[data-testid="ratings-chart"]`,
  getCreditRatingsChartSeries: `[class="highcharts-series-group"]`,
  getRatingsChartStat: `[data-testid="ratings-chart"] > div:nth-child(1) > div:nth-child(2)`,
  getXaxisLabels: `[class="highcharts-axis-labels highcharts-xaxis-labels"] > text`,
  getYaxisLabels: `[class="highcharts-axis-labels highcharts-yaxis-labels"] > text`,
  getCreditRatingChartsLegend: `[class="highcharts-legend highcharts-no-tooltip"]`,
  getCreditRatingChartsLegendItems: `[class*="highcharts-legend-item highcharts-column-series highcharts-color-undefined highcharts-series-"]`,
  getScoreCharts: `[data-testid="scores-charts"]`,
  getESGChartsTitle: `[data-testid="scores-charts"] h5`,
  getESGChartsStat: `[data-testid="scores-charts"] > div:nth-child(1) > div:nth-child(1) > div > span`,
  getESGChartsLegend: `[data-testid="scores-charts"] > div:nth-child(2)`,
  getESGChartsLegendItems: `[data-testid="scores-charts"]  > div:nth-child(2) > div > div`,
  getCISChart: `[data-testid="scores-charts"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)`,
  getIPSEnvironmentalChart: `[data-testid="scores-charts"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)`,
  getIPSSocialChart: `[data-testid="scores-charts"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(3)`,
  getIPSGovernanceChart: `[data-testid="scores-charts"] > div:nth-child(1) > div:nth-child(2) > div:nth-child(4)`,
  getBar: (value: string) => `[aria-label*="${value}"]`,
  getCISBarPercentage: (index: number) =>
    `[data-highcharts-chart="1"] [class="highcharts-label highcharts-data-label highcharts-data-label-color-${index}"]`,
  getCISDistributionChartSeries: `[data-highcharts-chart="1"] [class="highcharts-series-group"]`,
};

export const dates = {
  getResetButtonContainer: '[data-testid="reset-button-container"]',
  getResetButton: '[data-testid="reset-button"]',
  getDateContainer: ".MuiCalendarPicker-root",
  getDateRangeLabel: '[data-testid="date-range-label"]',
  getDateRangeContainer: '[data-testid="date-range-container"]',
  getDateFilterContainer: '[data-testid="date-filter-container"]',
  getFilterButtonLastMonth: '[data-testid="group-filter-button-Last Month"]',
  getFilterNameLastMonth: '[data-testid="group-filter-name-Last Month"]',
  getFilterButtonLastQuarter:
    '[data-testid="group-filter-button-Last Quarter"]',
  getFilterNameLastQuarter: '[data-testid="group-filter-name-Last Quarter"]',
  getFilterButtonLastYear: '[data-testid="group-filter-button-Last Year"]',
  getFilterNameLastYear: '[data-testid="group-filter-name-Last Year"]',
  getFilterButtonLastThreeYears:
    '[data-testid="group-filter-button-Last 3 Years"]',
  getFilterNameLastThreeYears: '[data-testid="group-filter-name-Last 3 Years"]',
  getFilterButtonLastFiveYears:
    '[data-testid="group-filter-button-Last 5 Years"]',
  getFilterNameLastFiveYears: '[data-testid="group-filter-name-Last 5 Years"]',
  getStartDatePicker: '[data-testid="start-date-picker"]',
  getStartDatePickerBorderColor:
    '[data-testid="start-date-picker"] > div > fieldset',
  getEndDatePicker: '[data-testid="end-date-picker"]',
  getEndDatePickerBorderColor:
    '[data-testid="end-date-picker"] > div > fieldset',
  getArrowLeftIcon: '[data-testid="ArrowLeftIcon"]',
  getArrowRightIcon: '[data-testid="ArrowRightIcon"]',
  getArrowDropIcon: '[data-testid="ArrowDropDownIcon"]',
};

export const tableFooter = {
  getTableFooter: `[data-testid="ui-table-footer"]`,
  getRowCount: `[data-testid="row-count"]`,
  getRowsPerPageDropdownButton: `[aria-haspopup="listbox"]`,
  getRowsPerPage: (pos: number) => `[data-value="${pos}"]`,
  getNextPageIcon: `[title="Go to next page"] > [data-testid="KeyboardArrowRightIcon"]`,
  getPreviousPageIcon: `[title="Go to previous page"] > [data-testid="KeyboardArrowLeftIcon"]`,
  getFirstPageIcon: `[title="Go to first page"] > [data-testid="FirstPageIcon"]`,
  getLastPageIcon: `[title="Go to last page"] > [data-testid="LastPageIcon"]`,
  getTableFooterDisclaimer: `[data-testid="footer-body"]`,
  getTableFooterDisclaimerExpectedText:
    "—1The data is not included in your subscription. Expand your Subscription",
};

export const drawer = {
  getCisDrawer: `[data-testid="drawer-${replaceSpaceWithDash(
    ESGGroupNames.ESG_SCORES_MIS
  )}"]`,
  getEnvIpsDrawer: `[data-testid="drawer-${replaceSpaceWithDash(
    ESGGroupNames.ENVIRONMENTAL_SCORES_MIS
  )}"]`,
  getSocialIpsDrawer: `[data-testid="drawer-${replaceSpaceWithDash(
    ESGGroupNames.SOCIAL_SCORES_MIS
  )}"]`,
  getGovIpsDrawer: `[data-testid="drawer-${replaceSpaceWithDash(
    ESGGroupNames.GOVERNANCE_SCORES_MIS
  )}"]`,
  getDrawerHeader: '[data-testid="drawer-header"]',
  getDrawerCloseButton: '[data-testid="drawer-close-icon"]',
  getDrawerBody: '[data-testid="drawer-body"]',
  getDrawerFooter: '[data-testid="drawer-footer"]',
  getMethodolgyButton: '[data-testid="drawer-footer-button"]',
  getAccordian: (pos: number) => `[data-testid="accordion-${pos}"]`,
  getAccordianColor: (pos: number) => `[data-testid="accordion-color-${pos}"]`,
  getAccordianDescription: (pos: number) =>
    `[data-testid="accordion-description-${pos}"]`,
  getAccordianButton: (pos: number) =>
    `[data-testid="accordion-button-${pos}"]`,
  getAccordianContent: (pos: number) =>
    `[data-testid="accordion-content-${pos}"]`,
  getCommentsDrawer: '[data-testid="drawer-esgScores.comments"]',
  getDrawerScoreName: '[data-testid="drawer-score-name"]',
  getDrawerScoreFormattedScore: '[data-testid="drawer-score-formatted-score"]',
  getDrawerScoreDescription: '[data-testid="drawer-score-description"]',
  getDrawerScoreDate: '[data-testid="drawer-score-date"]',
  getDrawerOverviewTitle:
    '[data-testid="drawer-score-content"] > div:nth-child(3) > h3',
  getDrawerScoreOverviewContent:
    '[data-testid="drawer-score-overview-content"]',
  getDrawerScoreAnalystTitle:
    '[data-testid="drawer-score-content"] > div:nth-child(4) > h3',
  getDrawerScoreAnalystContent: '[data-testid="drawer-score-analyst-content"]',
  getDrawerAttribution: '[data-testid="drawer-attribution"]',
};

export const topFilterSplit = {
  getTopFilterBar: '[data-testid="top-bar-filters-button-container"]',
  getFilterModal: '[aria-labelledby="customized-dialog"]',
  getFilterModelHeader: '[data-testid="base-modal-title"]',
  getFilterModelTitle: '[data-testid="base-modal-title"] > span',
  getFilterModelCloseIcon: '[data-testid="base-modal-close-button"]',
  getFilterModelFooter: '[data-testid="filter-dialog-footer"]',
  getFooterResetButton: '[data-testid="footer-reset-filters-button"]',
  getFooterCancelButton: '[data-testid="footer-cancel-filters-button"]',
  getFooterApplyFilterButton: '[data-testid="footer-apply-filters-button"]',
  getFooterFilterApplied: '[data-testid="top-bar-filters-button-count"]',
  getFooterAppliedFilterSection:
    '[data-testid="footer-applied-filters-section"]',
  getAppliedFilterChip: (value: string) =>
    `[data-testid="filter-dialog-footer-chip-${value}"]`,
  getAppliedFilterChipCloseIcon: (value: string) =>
    `[data-testid="filter-dialog-footer-chip-${value}-btn"]`,
};

export const analystInfo = {
  getAnalystInfoPopup: `[data-testid="base-modal"] [role="dialog"]`,
  getAnalystInfoPopupCloseIcon: `[data-testid="base-modal-close-button"]`,
  getAnalystInfoPopupTitle: `[data-testid="base-modal-title"]`,
  getAnalystInfoPopupDetails: `[data-testid*="company-details-modal"]`,
  getCompanyName: (id: string) => `[data-testid="company-title-box-${id}"] > p`,
  getCompanyPageLink: '[data-testid="company-page-button"]',
  getCompanyDetailsSpec: '[data-testid="company-details-specs"]',
  getCompanyDetailsSpecKey: (key: string) =>
    `[data-testid="company-details-specs-${key}"]`,
  getCompanyDetailsSpecValue: (key: string) =>
    `[data-testid="company-details-specs-${key}-value"]`,
  getCompanyDetailsWebsiteKey: '[data-testid="company-details-specs-website"]',
  getCompanyDetailsWebsite: '[data-testid="company-details-website-link"]',
  getCompanyDetailsDescription: '[data-testid="company-details-description"]',
  getAnalystBox: `[data-testid*="analyst-box"]`,
  getAnalystName: '[data-testid="analyst-name"]',
  getAnalystRole: '[data-testid="analyst-role"]',
  getAnalystPhoneNumber: '[data-testid="analyst-phone"]',
  getAnalystInfoPopupEmailIcon: `[data-testid="EmailOutlinedIcon"]`,
  getAnalystEmail: '[data-testid="analyst-email"]',
};
