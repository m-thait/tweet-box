import React from "react";
import { OpenInNew } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { MethodologyDocument } from "@models/table.types";
import { openMethodologyDocument } from "@utils/methodology.helper";
import styles from "./DrawerFooter.module.scss";

export const DrawerFooter = () => {
  return (
    <Button
      variant="contained"
      endIcon={<OpenInNew />}
      data-testid="drawer-footer-button"
      className={styles.methodologyButton}
      onClick={() => {
        openMethodologyDocument(MethodologyDocument.CIS_IPS);
      }}
    >
      <Typography className={styles.footerText}>Methodology</Typography>
    </Button>
  );
};
