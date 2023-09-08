import {
  removeTrailingSlash,
  addHttp,
} from "@moodys/mdc-toolbox.utils.url-helpers";
import { DOMAIN_HOST } from "@constants/environment";
import { DEV_HOST, UrlGateway } from "@constants/api";

export const isHostMDC = (): boolean =>
  window?.location?.host?.indexOf("moodys.com") > 0;

export const getHostMDCUrl = (): string => {
  return window.location.host;
};

export const AG_GRID_LICENSE = process.env?.REACT_APP_AG_GRID_LICENSE ?? "";

export const isProductionMode = process.env?.ENV === "prd";

export const ESG_VIEWS_API_GATEWAY = removeTrailingSlash(
  isHostMDC()
    ? addHttp(`${getHostMDCUrl()}${UrlGateway.ESG_VIEWS}`, true)
    : `${DEV_HOST}${UrlGateway.ESG_VIEWS}`
);

export const HOST_LINK = removeTrailingSlash(
  isHostMDC() ? addHttp(getHostMDCUrl(), true) : DEV_HOST
);

export const getBaseUrl = (): DOMAIN_HOST => {
  const env = process.env.ENV?.toUpperCase() ?? "PRD";
  return DOMAIN_HOST[env as keyof typeof DOMAIN_HOST];
};

export const getESGPageUrl = (orgId: string): string => {
  return `${HOST_LINK}/esg-views/credit-risk/${orgId}`;
};

export const SPLIT_API_KEY = process.env?.SPLIT_API_KEY ?? "localhost";
