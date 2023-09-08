import {
  ColumnFieldNames,
  SortOrder,
} from "@moodys/mdc-table.schemas.screener";

const DEV_HOST = "https://dev.moodys.com";

enum UrlPath {
  ESG_INFO = "/esg-info",
  CIS_DRAWER_INFO = "en/us/esg_cis_education.headless.json",
  IPS_DRAWER_INFO = "en/us/esg_ips_education.headless.json",
  ESG_TOOLTIP = "en/us/esg_tooltip.headless.json",
  TAXONOMY = "/reference?include_seo_label=true&include_moss_ids=true",
  OWL_IDS = "/owlId-info",
  FACETS = "/esg-facets",
  SCORE_DEFINITION = "/score-definition",
  COMMENTS = "/esg-comments",
  EXPORT = "/export",
  USERINFO = "user-info",
  CHARTS = "/esg-charts",
  PEER_ORGS = "/esg-peer-orgs",
  SHARE_LINK = "/share-link",
  ORG_INFO = "/org-info",
}

enum UrlGateway {
  BASE_API = "/screener/api",
  SHARED_API = "/shared/api",
  ESG_VIEWS = "/esg-views/api",
  ESG_AEM = "/web/esg-api",
  TAXONOMY = "/taxonomy/api",
}

const DEFAULT_SORT_PARAMS = {
  keyword: "org_name",
  order: SortOrder.ASCENDING,
};

const DEFAULT_COMMENT_COLUMNS = [
  ColumnFieldNames.CREDIT_IMPACT_SCORE_COMMENTS,
  ColumnFieldNames.ENV_IPS_SCORE_COMMENTS,
  ColumnFieldNames.SOCIAL_IPS_SCORE_COMMENTS,
  ColumnFieldNames.GOV_IPS_SCORE_COMMENTS,
];

enum RequestHeaders {
  X_MOODYS_ORG_ID = "x-moodys-org-id",
  X_CORRELATION_ID = "x-correlation-id",
}

const FacetsPayload = {
  country: {
    facet: ColumnFieldNames.ORG_COUNTRY,
    filters: [],
  },
  subSector: {
    facet: ColumnFieldNames.ORG_INDUSTRY,
    filters: [],
  },
  ltRating: {
    facet: ColumnFieldNames.LT_RATING,
    filters: [],
  },
};

const methodologyHeaders = {
  [RequestHeaders.X_MOODYS_ORG_ID]: 21600,
};

export {
  UrlGateway,
  UrlPath,
  FacetsPayload,
  methodologyHeaders,
  RequestHeaders,
  DEV_HOST,
  DEFAULT_SORT_PARAMS,
  DEFAULT_COMMENT_COLUMNS,
};
