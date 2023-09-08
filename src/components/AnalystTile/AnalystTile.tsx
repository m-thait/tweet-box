import React, { FC, useState } from "react";
import { Box, Link, Tooltip, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { AnalystInfoOpenApi } from "@models/api.types";
import styles from "./AnalystTile.module.scss";

export interface AnalystsTileProps {
  id: string | number;
  analyst: AnalystInfoOpenApi;
}

export const AnalystTile: FC<AnalystsTileProps> = ({ id, analyst }) => {
  const [tooltipTitle, setTooltipTitle] = useState("");

  return (
    <Box className={styles.analyst} data-testid={`analyst-box-${id}`}>
      <Typography className={styles.analystName} data-testid="analyst-name">
        {analyst.name}
      </Typography>
      <Typography data-testid="analyst-role">{analyst.role}</Typography>
      {analyst.phone ? (
        <Typography data-testid="analyst-phone">{analyst.phone}</Typography>
      ) : null}
      <Tooltip
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -6],
              },
            },
          ],
        }}
        title={tooltipTitle}
        placement="top"
        onOpen={() => setTooltipTitle("Click to copy email")}
        arrow
      >
        <Link
          onClick={() => {
            navigator.clipboard.writeText(analyst.email);
            setTooltipTitle("Copied!");
          }}
        >
          <EmailOutlinedIcon className={styles.emailIcon} />
          <Typography
            component="span"
            className={styles.emailAnalyst}
            data-testid="analyst-email"
          >
            Email Analyst
          </Typography>
        </Link>
      </Tooltip>
    </Box>
  );
};
