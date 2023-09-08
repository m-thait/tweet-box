export interface CISDistributionLocalStorage {
  anchorOrg: string;
  filters: {
    cis: string[];
  };
  sector: string;
}

export enum RedirectFrom {
  PEER_COMPARISON = "Peer Comparison Widget",
  CIS_DISTRIBUTION = "CIS Distribution Widget",
  CV2_ISSUER_PAGE = "CV2 Issuer Page",
}
