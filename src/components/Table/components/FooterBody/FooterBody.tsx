import React from "react";
import { Box, Divider, Link } from "@mui/material";
import { UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import { EXPAND_SUBSCRIPTION, OOS_MESSAGE } from "@constants/popover";
import { ACCOUNT_SUBSCRIPTION_PATH } from "@constants/environment";
import { useAppSelector, getHasOOSValues } from "@services/redux";
import { LastUpdated } from "../LastUpdated/LastUpdated";
import styles from "./FooterBody.module.scss";

export const FooterBody = () => {
  const hasOOSValues = useAppSelector(getHasOOSValues);
  return (
    <Box className={styles.container} data-testid="footer-body">
      <LastUpdated />
      {hasOOSValues ? (
        <>
          <Divider
            className={styles.divider}
            orientation="vertical"
            variant="middle"
            data-testid="oos-divider"
          />
          <span className={styles.disclaimer}>{UNAUTHORIZED_BLANKS}</span>
          <Box className={styles.message}>
            {OOS_MESSAGE}
            <Link
              className={styles.messageLink}
              data-testid="footer-body-text-link"
              onClick={() => {
                const url = `${window.location.origin}${ACCOUNT_SUBSCRIPTION_PATH}`;
                window.open(url, "_blank");
              }}
              underline="none"
            >
              {EXPAND_SUBSCRIPTION}
            </Link>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
