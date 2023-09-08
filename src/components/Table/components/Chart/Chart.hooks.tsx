/* eslint-disable complexity */
import { useCallback, useEffect, useState } from "react";
import {
  AgGridFilterModel,
  getValuesFromFilterModel,
} from "@moodys/mdc-table.table";
import {
  useAppSelector,
  useAppDispatch,
  getCurrentFilterModel,
  getIsChartOpenState,
  saveChartData,
} from "@services/redux";
import { fetchCharts } from "@services/api";

export const useChartEvents = () => {
  const [localFilterModel, setLocalFilterModel] =
    useState<AgGridFilterModel | null>(null);
  const filterModel = useAppSelector(getCurrentFilterModel);
  const isChartOpen = useAppSelector(getIsChartOpenState);
  const dispatch = useAppDispatch();

  const getNewCharts = useCallback(
    async (filters: Record<string, unknown>[]) => {
      const newChartData = await fetchCharts(filters);
      if (newChartData) {
        dispatch(saveChartData(newChartData));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (isChartOpen && localFilterModel !== filterModel) {
      const filters = getValuesFromFilterModel(filterModel);
      setLocalFilterModel(filterModel);
      getNewCharts(filters);
    }
  }, [isChartOpen, filterModel, getNewCharts, localFilterModel]);

  return {
    getNewCharts,
  };
};
