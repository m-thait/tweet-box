import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { GridApi } from "ag-grid-enterprise";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { AgGridSidePanel } from "@models/index";
import {
  getColumnMapping,
  getCurrentFilterModel,
  getSidePanelSource,
  saveCountryFilterModel,
  saveLTRatingFilterModel,
  saveSubSectorFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";

const COUNTRY_FIELD = ESGColumnFields.ORG_COUNTRY.fieldName;
const SECTOR_FIELD = ESGColumnFields.ORG_INDUSTRY.fieldName;
const LT_RATING_FIELD = ESGColumnFields.LT_RATING.fieldName;

export const useLeftOptionsEvents = ({
  gridApi,
  chipsContainer,
}: {
  gridApi: GridApi;
  chipsContainer: MutableRefObject<HTMLDivElement | null>;
}) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(
    {}
  );
  const [isOverflowing, setIsOverflowing] = useState(false);
  const sidePanelSource = useAppSelector(getSidePanelSource);
  const columnMapping = useAppSelector(getColumnMapping);
  const filterModel = useAppSelector(getCurrentFilterModel);
  const [treeFilters, setTreeFilters] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (columnMapping) {
      const TREE_FILTERS = [];
      const countryField = columnMapping[COUNTRY_FIELD];
      if (countryField) {
        TREE_FILTERS.push(countryField);
      }
      const sectorField = columnMapping[SECTOR_FIELD];
      if (sectorField) {
        TREE_FILTERS.push(sectorField);
      }
      const ltRatingField = columnMapping[LT_RATING_FIELD];
      TREE_FILTERS.push(ltRatingField);
      setTreeFilters(TREE_FILTERS);
    }
  }, [columnMapping]);

  useEffect(() => {
    const filters = Object.keys(filterModel).reduce((agg, k) => {
      return { ...agg, [columnMapping[k]]: k };
    }, {});
    setAppliedFilters(filters);
    return () => {
      setAppliedFilters({});
    };
  }, [columnMapping, filterModel]);

  const handleResize = useCallback(() => {
    const el = chipsContainer.current;
    if (el) {
      const containerWidth = el.clientWidth;
      const children = el.children ?? [];
      let childWidth = 0;
      for (const child of children) {
        childWidth += child.clientWidth;
      }
      setIsOverflowing(childWidth > containerWidth);
    }
  }, [chipsContainer]);

  useEffect(() => {
    handleResize();
  }, [appliedFilters, handleResize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize, true);
    };
  }, [chipsContainer, handleResize]);

  const handleMoreFiltersClick = useCallback(() => {
    if (sidePanelSource === AgGridSidePanel.FILTERS) {
      gridApi.closeToolPanel();
    } else {
      gridApi.openToolPanel(AgGridSidePanel.FILTERS);
    }
  }, [gridApi, sidePanelSource]);

  const handleClearAllClick = useCallback(() => {
    gridApi.setFilterModel([]);
    dispatch(saveSubSectorFilterModel(null));
    dispatch(saveCountryFilterModel(null));
    dispatch(saveLTRatingFilterModel(null));
  }, [dispatch, gridApi]);

  const handleDelete = useCallback(
    (key: string) => () => {
      const filterKey = appliedFilters[key];

      // update filter chip labels
      const newAppliedFilters = { ...appliedFilters };
      delete newAppliedFilters[key];
      setAppliedFilters(newAppliedFilters);

      // update ag grid filter model
      const filterModel = gridApi.getFilterModel();
      delete filterModel[filterKey];
      gridApi.setFilterModel(filterModel ?? {});
    },
    [appliedFilters, gridApi, setAppliedFilters]
  );

  const onLeftClick = useCallback(() => {
    const scrollWidth = chipsContainer?.current?.clientWidth ?? 150;
    if (chipsContainer.current) {
      chipsContainer.current.scrollLeft -= scrollWidth;
    }
  }, [chipsContainer]);

  const onRightClick = useCallback(() => {
    const scrollWidth = chipsContainer?.current?.clientWidth ?? 150;
    if (chipsContainer.current) {
      chipsContainer.current.scrollLeft += scrollWidth;
    }
  }, [chipsContainer]);

  return {
    handleMoreFiltersClick,
    handleClearAllClick,
    handleDelete,
    onLeftClick,
    onRightClick,
    appliedFilters,
    isOverflowing,
    treeFilters,
  };
};
