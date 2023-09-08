import { TreeSelectOption } from "@models/tree-select.types";

export interface TaxonomyItem {
  OwlID: string;
  Name: string;
  Path: string[][];
  EnglishLabel: string;
  SeoLabel: string;
  Parent: string[] | null;
  Children: TaxonomyItem[] | null;
}

export interface SeoLabelMap {
  [key: string]: TaxonomyItem;
}

export interface TaxonomyData {
  marketSegment: TaxonomyInfo;
  region: TaxonomyInfo;
}

export interface TaxonomyInfo {
  labelMap: Record<string, string>;
  seoLabelMap: SeoLabelMap | null;
  mossIdMap?: Record<string, string> | null;
  taxonomy: (TaxonomyItem | TreeSelectOption)[];
}

export enum TaxonomyType {
  MARKET_SEGMENT = "marketSegment",
  REGION = "region",
  COUNTRY = "country",
}

export interface TaxonomyQueryResponse {
  [TaxonomyType.MARKET_SEGMENT]: TaxonomyInfo;
  [TaxonomyType.REGION]: TaxonomyInfo;
  [TaxonomyType.COUNTRY]?: TaxonomyInfo;
}
