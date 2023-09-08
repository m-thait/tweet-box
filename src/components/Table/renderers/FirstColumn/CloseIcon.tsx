import React, { useCallback, useState } from "react";
import { ICellRendererParams } from "ag-grid-enterprise";
import { clsx } from "clsx";
import { IconButton } from "@mui/material";
import MuiCloseIcon from "@mui/icons-material/Close";
import {
  ColumnFieldNames,
  ESGColumnFields,
} from "@moodys/mdc-table.schemas.screener";
import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { AgGridFilterType } from "@root/src/models";
import { fetchFacetValues } from "@components/Table/utils";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { screenerRemoveEntity } from "@services/analytics/Avo";
import styles from "./CloseIcon.module.scss";

interface CloseIconRendererProps {
  params: ICellRendererParams;
}
export const CloseIcon = ({ params }: CloseIconRendererProps) => {
  const [showBackground, setBackground] = useState(false);

  const onCloseIconClick = useCallback(async () => {
    const selectedRows = params.api.getSelectedNodes();
    const filterModel = params.api.getFilterModel();
    const orgNameToRemove = selectedRows[0].data.orgName;

    let orgNames = [];

    if (!filterModel[ESGColumnFields.ORG_ISSUER_NAME.fieldName]) {
      orgNames = await fetchFacetValues(
        ColumnFieldNames.ORG_ISSUER_NAME,
        filterModel
      );
    } else {
      orgNames = filterModel[ESGColumnFields.ORG_ISSUER_NAME.fieldName]
        .values as string[];
    }

    const orgsDictionary = new Map(
      orgNames.map((value, index) => [value, index])
    );
    orgsDictionary.delete(orgNameToRemove);

    const orgNamesFiltered = [...orgsDictionary.keys()];

    const newFilterModel = { ...filterModel };

    newFilterModel[ESGColumnFields.ORG_ISSUER_NAME.fieldName] = {
      filterType: AgGridFilterType.SET,
      values: orgNamesFiltered,
    };

    params.api.setFilterModel(newFilterModel);
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerRemoveEntity,
      eventDetails: {
        ...defaultEventDetails,
        name: orgNameToRemove,
      },
    });
  }, [params.api]);

  return (
    <IconButton
      className={clsx({
        [styles.iconContainer]: true,
        [styles.background]: showBackground,
      })}
      onMouseEnter={() => setBackground(true)}
      onMouseLeave={() => setBackground(false)}
      onClick={onCloseIconClick}
    >
      <MuiCloseIcon
        className={styles.closeIcon}
        data-testid={`first-column-close-icon-${params.rowIndex}`}
      />
    </IconButton>
  );
};
