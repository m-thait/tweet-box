import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { sanitizeAndTransformHtml } from "@moodys/mdc-frontend.utils.html-sanitizer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import { accordionItems, errorMessage } from "@constants/drawer";
import { AEMDrawerInfo } from "@models/aem.types";
import {
  getCisAccordionData,
  getIpsAccordionData,
  getDrawerType,
  useAppSelector,
} from "@services/redux";
import { DrawerAccordion } from "../DrawerAccordion";
import styles from "../DrawerBody.module.scss";

export interface CISAndIPSBodyProps {
  data?: AEMDrawerInfo[];
  error?: FetchBaseQueryError | SerializedError;
}

export const CISAndIPSBody = ({
  data,
  error,
}: CISAndIPSBodyProps): JSX.Element => {
  const [accordionData, setAccordionData] = useState<
    accordionItems[] | undefined
  >([]);

  const drawerType = useAppSelector(getDrawerType);

  const cisAccordionData = useAppSelector(getCisAccordionData);
  const ipsAccordionData = useAppSelector(getIpsAccordionData);

  useEffect(() => {
    if (drawerType === replaceSpaceWithDash(ESGGroupNames.ESG_SCORES_MIS)) {
      setAccordionData(cisAccordionData);
    } else if (
      drawerType ===
        replaceSpaceWithDash(ESGGroupNames.ENVIRONMENTAL_SCORES_MIS) ||
      drawerType === replaceSpaceWithDash(ESGGroupNames.SOCIAL_SCORES_MIS) ||
      drawerType === replaceSpaceWithDash(ESGGroupNames.GOVERNANCE_SCORES_MIS)
    ) {
      setAccordionData(ipsAccordionData);
    }
  }, [drawerType, cisAccordionData, ipsAccordionData]);

  if (error) {
    return <Box data-testid="drawer-body-error">{errorMessage}</Box>;
  }

  return (
    <Box data-testid="drawer-cis-ips-body">
      {data?.map((section) => {
        return (
          <Box key={section?.title}>
            <Box className={styles.sectionTitle} data-testid="cis-ips-header">
              {sanitizeAndTransformHtml({ htmlString: section?.title })}
            </Box>
            <Box
              className={styles.sectionContainer}
              data-testid="cis-ips-section"
            >
              {sanitizeAndTransformHtml({ htmlString: section?.body })}
            </Box>
          </Box>
        );
      })}
      <DrawerAccordion accordionData={accordionData} />
    </Box>
  );
};
