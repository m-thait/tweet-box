import React from "react";
import { clsx } from "clsx";
import {
  Box,
  Skeleton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./TableLoader.module.scss";

const header = () => {
  return (
    <TableHead>
      <TableRow className={styles.headerRow}>
        {Array.from(new Array(4).keys()).map((i) => (
          <TableCell colSpan={5} key={`mui-header-table-cell-${i}`}>
            <Skeleton variant="text" className={styles.width100} />
          </TableCell>
        ))}
      </TableRow>
      <TableRow className={styles.headerRow}>
        <TableCell>
          <Skeleton variant="text" className={styles.width150} />
        </TableCell>
        {Array.from(new Array(19).keys()).map((i) => (
          <TableCell key={`mui-header-table-cell-${i}`}>
            <Skeleton variant="text" className={styles.width100} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

/* eslint-disable complexity */
const row = (
  { median, index }: { median?: boolean; index?: number } = {
    median: false,
    index: 0,
  }
) => {
  return (
    <TableRow
      className={clsx({
        [styles.tableRow]: true,
        [styles.medianRow]: median,
      })}
      key={`mui-table-row-${index}`}
    >
      <TableCell>
        <Box className={styles.widthTitleCell}>
          <Skeleton
            variant="text"
            className={median ? styles.width100 : styles.width200}
          />
        </Box>
      </TableCell>
      {Array.from(new Array(19).keys()).map((i) => (
        <TableCell key={`mui-table-cell-${i}`}>
          <Box className={styles.widthCell}>
            <Skeleton
              variant="text"
              className={median ? styles.width20 : styles.width70}
            />
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
};

const sidePanel = () => {
  return (
    <Box className={styles.sidePanel}>
      {Array.from(new Array(3).keys()).map((i) => (
        <Skeleton
          variant="rectangular"
          className={styles.sidePanelIcon}
          key={`mui-side-panel-icon-${i}`}
        />
      ))}
    </Box>
  );
};

const tableFooter = () => {
  return (
    <Box className={styles.tableFooter} data-testid="table-footer-loader">
      <Skeleton variant="text" className={styles.width70} />
      <Box className={styles.rightContent}>
        <Skeleton variant="text" className={styles.width150} />
        <Skeleton variant="text" className={styles.width80} />
        <Skeleton variant="text" className={styles.width110} />
      </Box>
    </Box>
  );
};

const tableRows = (
  { median }: { median?: boolean } = {
    median: false,
  }
) => {
  return (
    <TableBody>
      {median && row({ median: true })}
      {Array.from(new Array(24).keys()).map((i) => row({ index: i }))}
    </TableBody>
  );
};

export const TableLoader = () => {
  return (
    <>
      <Box className={styles.tableContainer} data-testid="table-loader">
        <TableContainer>
          <MuiTable stickyHeader className={styles.loadingTable}>
            {header()}
            {tableRows({ median: true })}
          </MuiTable>
        </TableContainer>
        {sidePanel()}
      </Box>
      {tableFooter()}
    </>
  );
};

export const TableRowsLoader = () => {
  return (
    <Box className={styles.tableRowsContainer} data-testid="table-loader">
      <TableContainer>
        <MuiTable className={styles.overlayTable}>{tableRows()}</MuiTable>
      </TableContainer>
    </Box>
  );
};
