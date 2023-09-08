import {
  ColumnFieldNames,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
export const commentsData: EsgViewComment[] = [
  {
    [ColumnFieldNames.ORG_ID]: 100000,
    [ColumnFieldNames.CREDIT_IMPACT_SCORE_COMMENTS]:
      "CIS-3. ESG considerations have a moderately negative impact on AAC Technologies' rating. The company's exposure to moderately negative environmental and social risks is in line with the wider manufacturing sector. In terms of governance risk, the company's conservative financial strategy counterbalances the high ownership of voting shares by its controlling shareholder and the very high importance of its controlling shareholder to its operations.",
    [ColumnFieldNames.GOV_IPS_SCORE_COMMENTS]:
      "G-3. AAC Technologies governance risks are moderately negative, reflecting the high ownership of voting shares by the company's controlling shareholder and the very high importance of its controlling shareholder to its operations. Such risks are partially offset by its conservative financial strategy and risk management, as demonstrated by its track record of maintaining a solid capital structure and strong liquidity, and that a majority of its board members are independent.",
    [ColumnFieldNames.ENV_IPS_SCORE_COMMENTS]:
      "E-3. Environmental risks are moderately negative for AAC Technologies. This reflects its exposure to physical climate risks as a manufacturer, its energy- and raw material-intensive production processes with waste as a by-product, and rising environmental regulation. These risks are partially mitigated by the company's measures to boost the recycling of resources and its focus on limiting the creation of waste.",
    [ColumnFieldNames.SOCIAL_IPS_SCORE_COMMENTS]:
      "S-3. AAC Technologies exposure to social risks are moderately negative. This reflects its moderately negative exposure to human capital, health and safety, and responsible production, which is consistent with its manufacturing peers. The competition for attracting and retaining highly skilled workers, such as engineers, is a concern for companies as they seek to keep pace with technological advancements.",
  },
];
