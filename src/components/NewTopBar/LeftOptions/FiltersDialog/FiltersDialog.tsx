import React, { useState, useEffect } from "react";
import { GridApi } from "ag-grid-community";
import { Box } from "@mui/material";
import { AgGridFilterModel } from "@moodys/mdc-table.table";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { BaseModal } from "@components/BaseModal";
import {
  getColumnMapping,
  useAppSelector,
  getFilterModel,
  getTaxonomy,
  getLTRatingFacets,
  getSubSectorFacets,
  getCountryFacets,
} from "@services/redux";
import { TreeSelectOption } from "@models/tree-select.types";
import { filterTreeSelectOptions } from "@services/api/rtk/taxonomy/tree-select.utils";
import { RATING_TREE } from "@constants/rating";
import { DialogFilter } from "./components/DialogFilter";
import { Footer } from "./components/Footer";
import styles from "./FiltersDialog.module.scss";

interface FiltersDialogProps {
  open: boolean;
  onClose: () => void;
  gridApi: GridApi;
}

export const FiltersDialog = ({
  open,
  onClose,
  gridApi,
}: FiltersDialogProps) => {
  const columnMapping = useAppSelector(getColumnMapping);
  const filterModel = useAppSelector(getFilterModel);
  const [dialogFilterModel, setDialogFilterModel] = useState(
    filterModel.current
  );
  const appliedFilters = Object.keys(dialogFilterModel).reduce(
    (appliedFiltersMap, key) => {
      return { ...appliedFiltersMap, [columnMapping[key]]: key };
    },
    {}
  );

  const { data: taxonomyInfo } = useAppSelector(getTaxonomy);
  const { data: subsectorFacets } = useAppSelector(getSubSectorFacets);
  const { data: countryFacets } = useAppSelector(getCountryFacets);
  const { data: ltRatingFacets } = useAppSelector(getLTRatingFacets);

  let ltOptions = [] as TreeSelectOption[];
  if (ltRatingFacets) {
    ltOptions = filterTreeSelectOptions(RATING_TREE, ltRatingFacets);
  }

  useEffect(() => {
    setDialogFilterModel(filterModel.current);
  }, [filterModel, open]);
  return (
    <BaseModal
      open={open}
      handleShowModal={onClose}
      title="Filters"
      className={styles.filterDialog}
    >
      <Box
        className={styles.content}
        data-testid="top-bar-filters-modal-content"
      >
        <Box className={styles.selectGroups}>
          <DialogFilter
            title="Sector"
            dialogFilterModel={dialogFilterModel}
            setDialogFilterModel={
              setDialogFilterModel as (filterModel: AgGridFilterModel) => void
            }
            fieldName={ColumnFieldNames.ORG_INDUSTRY}
            options={
              taxonomyInfo?.marketSegment?.taxonomy as TreeSelectOption[]
            }
            facets={subsectorFacets ?? []}
          />
          <DialogFilter
            title="Country"
            dialogFilterModel={dialogFilterModel}
            setDialogFilterModel={
              setDialogFilterModel as (filterModel: AgGridFilterModel) => void
            }
            fieldName={ColumnFieldNames.ORG_COUNTRY}
            options={taxonomyInfo?.region?.taxonomy as TreeSelectOption[]}
            facets={countryFacets ?? []}
          />
          <DialogFilter
            title="LT Rating"
            dialogFilterModel={dialogFilterModel}
            setDialogFilterModel={
              setDialogFilterModel as (filterModel: AgGridFilterModel) => void
            }
            fieldName={ColumnFieldNames.LT_RATING}
            options={ltOptions}
            facets={ltRatingFacets ?? []}
          />
        </Box>
        <Footer
          appliedFilters={appliedFilters}
          gridApi={gridApi}
          onClose={onClose}
          dialogFilterModel={dialogFilterModel}
          setDialogFilterModel={
            setDialogFilterModel as (filterModel: AgGridFilterModel) => void
          }
        />
      </Box>
    </BaseModal>
  );
};
