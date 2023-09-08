export const ratingOptionsOrder: string[] = [
  "Aaa",
  "Aa1",
  "Aa2",
  "Aa3",
  "A1",
  "A2",
  "A3",
  "Baa1",
  "Baa2",
  "Baa3",
  "Ba1",
  "Ba2",
  "Ba3",
  "B1",
  "B2",
  "B3",
  "Caa1",
  "Caa2",
  "Caa3",
  "Ca",
  "C",
];

export const outlookColumnDefinitions: {
  symbol: string;
  name: string;
  color: string;
}[] = [
  {
    symbol: "POS",
    name: "Positive",
    color: "#008668",
  },
  {
    symbol: "STA",
    name: "Stable",
    color: "#405EB8",
  },
  {
    symbol: "NEG",
    name: "Negative",
    color: "#CD4762",
  },
  {
    symbol: "DEV",
    name: "Developing",
    color: "#40A9B0",
  },
  {
    symbol: "NOO",
    name: "No Outlook",
    color: "#BABCBD",
  },
  {
    symbol: "RUR",
    name: "Ratings Under Review",
    color: "#EA7D44",
  },
];

export const outlookSymbols = outlookColumnDefinitions.map(
  (group) => group.symbol
);

export const scoreLegendValues = [
  { color: "#8C0923", number: "5", text: "Very Highly Negative" },
  { color: "#AA3E04", number: "4", text: "Highly Negative" },
  { color: "#BEA41B", number: "3", text: "Moderately Negative" },
  { color: "#0077A7", number: "2", text: "Neutral-to-low" },
  { color: "#007158", number: "1", text: "Positive" },
];

export const scoreChartDefinitions = [
  { prefix: "CIS", title: "Credit Impact Score" },
  { prefix: "E", title: "Issuer Profile Score - Environmental" },
  { prefix: "S", title: "Issuer Profile Score - Social" },
  { prefix: "G", title: "Issuer Profile Score - Governance" },
];

export const scoreChartTypes = scoreChartDefinitions.map((group) => {
  return group.prefix;
});

export const ScoresPopoverText =
  "CIS scores may not be available for all entities below. CIS and IPS have significant coverage of analytically relevant rated entities, covering 80-95% or more at the family level of rated international governments, corporates and financial institutions with $250M+ of debt outstanding.";

export const RatingsPopoverText =
  "Entities that have a credit ratings value (derived for their analyst-assigned ratings) and are shown in the Summary Rating Columns";
