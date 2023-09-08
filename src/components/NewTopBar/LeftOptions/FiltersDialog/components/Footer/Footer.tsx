import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  FilterParams,
  FilterType,
  ColumnFieldNames,
} from "@moodys/mdc-table.schemas.screener";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { LoadingSpinner } from "@moodys/gravity-base-ui.ui.loading-spinner";
import { GridApi } from "ag-grid-community";
import { valueWithCommas } from "@moodys/mdc-table.utils.string";
import {
  useAppDispatch,
  saveSubSectorFilterModel,
  saveCountryFilterModel,
  saveFilterModel,
} from "@services/redux";
import { fetchEsgInfo } from "@services/api";
import { AgGridFilterType } from "@models/table.types";
import styles from "./Footer.module.scss";

interface FooterProps {
  appliedFilters: Record<string, string>;
  gridApi: GridApi;
  onClose: () => void;
  dialogFilterModel: AgGridFilterModel;
  setDialogFilterModel: (filterModel: AgGridFilterModel) => void;
}
export const Footer = ({
  appliedFilters,
  gridApi,
  onClose,
  dialogFilterModel,
  setDialogFilterModel,
}: FooterProps) => {
  const appliedFiltersCount = Object.keys(appliedFilters).length;
  const dispatch = useAppDispatch();
  const [isUpdatingEntityCount, setIsUpdatingEntityCount] = useState(false);
  const [totalEntities, setTotalEntities] = useState(0);

  const removeFilterChipHandler = async (key: string) => {
    const filterKeyToRemove = appliedFilters[key];
    const filterModel = {
      ...dialogFilterModel,
    };
    delete filterModel[filterKeyToRemove];
    setDialogFilterModel(filterModel);
  };

  const updateTotalEntities = async (filterModel: AgGridFilterModel) => {
    setIsUpdatingEntityCount(true);
    const filterParams = Object.entries(filterModel).map((entry) => {
      const [key, filter] = entry;
      const isTextFilter = filter.filterType === AgGridFilterType.SET;
      return {
        name: key,
        type: isTextFilter ? FilterType.TEXT : FilterType.DATE,
        values: isTextFilter
          ? (filter.values as string[]).map((val) => `${val}`)
          : Object.values(filter.values),
      };
    }) as FilterParams[];
    const { rowCount } = await fetchEsgInfo(filterParams, true);
    setTotalEntities(rowCount);
    setIsUpdatingEntityCount(false);
  };

  const applyNewFilterModel = (filterModel: AgGridFilterModel) => {
    gridApi.setFilterModel(filterModel);
    dispatch(saveFilterModel(filterModel));
    if (!filterModel[ColumnFieldNames.ORG_COUNTRY]) {
      dispatch(saveCountryFilterModel(null));
    }
    if (!filterModel[ColumnFieldNames.ORG_INDUSTRY]) {
      dispatch(saveSubSectorFilterModel(null));
    }
    onClose();
  };

  useEffect(() => {
    updateTotalEntities(dialogFilterModel);
  }, [dialogFilterModel]);

  return (
    <Box className={styles.container} data-testid="filter-dialog-footer">
      {appliedFiltersCount > 0 ? (
        <Box
          className={styles.appliedFiltersSection}
          data-testid="footer-applied-filters-section"
        >
          <Box className={styles.content}>
            <Typography className={styles.label}>Applied Filters</Typography>
            <Box className={styles.filterChips}>
              {Object.keys(appliedFilters).map((key: string, index: number) => {
                return (
                  <Chip
                    key={index}
                    label={key}
                    data-testid={`filter-dialog-footer-chip-${appliedFilters[key]}`}
                    onDelete={() => removeFilterChipHandler(key)}
                    deleteIcon={
                      <CloseIcon
                        data-testid={`filter-dialog-footer-chip-${appliedFilters[key]}-btn`}
                      />
                    }
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      ) : null}
      <Box className={styles.inputs}>
        <Box className={styles.left}>
          <Button
            variant="text"
            size="small"
            className={styles.clearButton}
            onClick={() => setDialogFilterModel({})}
            endIcon={<RestartAltIcon />}
            disabled={appliedFiltersCount === 0}
            data-testid="footer-reset-filters-button"
          >
            <Box className={styles.buttonText}>Reset All</Box>
          </Button>
        </Box>
        <Box className={styles.right}>
          <Button
            variant="text"
            size="small"
            className={styles.clearButton}
            onClick={() => onClose()}
          >
            <Box
              className={styles.buttonText}
              data-testid="footer-cancel-filters-button"
            >
              Cancel
            </Box>
          </Button>
          <Button
            className={styles.primaryButton}
            variant="outlined"
            size="small"
            data-testid="footer-apply-filters-button"
            onClick={() => applyNewFilterModel(dialogFilterModel)}
          >
            {isUpdatingEntityCount === true ? (
              <Box data-testid="apply-filters-button-loading-spinner">
                <LoadingSpinner />
              </Box>
            ) : (
              <Box>
                {`Show ${valueWithCommas(totalEntities)} ${
                  totalEntities === 1 ? "Entity" : "Entities"
                }`}
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
