import { useCallback, useEffect, useState } from "react";
import { GridApi } from "ag-grid-enterprise";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import {
  AgGridFilterModel,
  AgGridFilterType,
  TreeSelectOption,
} from "@root/src/models";
import { RATING_FACETS, RATING_FACETS_COUNT } from "@constants/rating";
import { getAllChild } from "@components/Table/components/TreeSelect";
import {
  getLTRatingFilterModel,
  saveLTRatingFilterModel,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";
import { pendingRating } from "@components/Table/components/TopBar/TopFilters/LTRating/LTRating.utils";
import { useSyncFilterModels } from "../TopFilter.hooks";

const LT_RATING_FIELD = ESGColumnFields.LT_RATING.fieldName;

export const useLTRatingTreeSelectEvents = (gridApi: GridApi) => {
  const [ltRatingSelected, setLtRatingSelected] = useState<TreeSelectOption[]>(
    []
  );
  const [ltRatingSelectAll, setLtRatingSelectAll] = useState<boolean>(false);
  const ltRatingFilterModel = useAppSelector(getLTRatingFilterModel);
  const dispatch = useAppDispatch();
  useSyncFilterModels(
    LT_RATING_FIELD,
    ltRatingFilterModel,
    saveLTRatingFilterModel
  );

  useEffect(() => {
    let selected: TreeSelectOption[] = [];
    if (ltRatingFilterModel) {
      selected = ltRatingFilterModel.values.map((e) => ({
        id: e ?? null,
        name: e ?? null,
      }));
      const isSelectAll =
        ltRatingFilterModel.values.length === RATING_FACETS_COUNT;
      setLtRatingSelectAll(isSelectAll);
    } else {
      setLtRatingSelectAll(false);
    }

    setLtRatingSelected(selected);
  }, [ltRatingFilterModel]);

  const getValuesForLTRatingFilter = useCallback(
    (
      checked: boolean,
      parent: TreeSelectOption,
      filterModel: AgGridFilterModel,
      fieldName: string,
      agGridFilters: (string | null)[]
    ) => {
      const { children, parents } = getAllChild(parent);
      const pendingChildren = pendingRating(children);
      const pendingParents = pendingRating(parents);
      if (checked) {
        if (isEmpty(filterModel?.[fieldName])) {
          return [
            ...children,
            ...pendingChildren,
            ...parents,
            ...pendingParents,
          ];
        } else {
          return [
            ...filterModel[fieldName].values,
            ...children,
            ...pendingChildren,
            ...parents,
            ...pendingParents,
          ];
        }
      } else {
        if (isEmpty(filterModel?.[fieldName])) {
          return agGridFilters.filter(
            (e) =>
              !(
                children.includes(e) ||
                parents.includes(e) ||
                pendingChildren.includes(e as string) ||
                pendingParents.includes(e as string)
              )
          );
        } else {
          return filterModel[fieldName].values.filter(
            (e) =>
              !(
                children.includes(e) ||
                parents.includes(e) ||
                pendingChildren.includes(e) ||
                pendingParents.includes(e)
              )
          );
        }
      }
    },
    []
  );

  const ltRatingTreeSelectOnChange = useCallback(
    // eslint-disable-next-line complexity
    (checked: boolean, node: TreeSelectOption | null) => {
      if (
        gridApi.getFilterModel &&
        gridApi.setFilterModel &&
        gridApi.paginationGoToFirstPage
      ) {
        gridApi.paginationGoToFirstPage();
        const currentFilterModel = gridApi.getFilterModel();

        const newFilterModel = { ...currentFilterModel };
        if (!node) {
          // triggered when node is null (i.e.) selectAll is checked
          if (checked) {
            const pendingRatingFacets = pendingRating(RATING_FACETS);
            setLtRatingSelectAll(true);
            newFilterModel[LT_RATING_FIELD] = {
              filterType: AgGridFilterType.SET,
              values: [...RATING_FACETS, ...pendingRatingFacets],
            };
          }
          // triggered when node is null (i.e.) selectAll is unchecked
          else {
            delete newFilterModel?.[LT_RATING_FIELD];
            setLtRatingSelectAll(false);
          }
        }
        // triggered when node has values (i.e.) an option other than
        // selectAll is checked or unchecked
        else {
          const values = getValuesForLTRatingFilter(
            checked,
            node,
            currentFilterModel,
            LT_RATING_FIELD,
            RATING_FACETS
          );
          setLtRatingSelectAll(false);
          newFilterModel[LT_RATING_FIELD] = {
            filterType: AgGridFilterType.SET,
            values,
          };
        }

        dispatch(saveLTRatingFilterModel(newFilterModel[LT_RATING_FIELD]));
        gridApi.setFilterModel(newFilterModel);
      }
    },
    [gridApi, dispatch, getValuesForLTRatingFilter]
  );

  return {
    ltRatingSelected,
    ltRatingSelectAll,
    ltRatingTreeSelectOnChange,
  };
};
