import { useState, useEffect } from "react";
import { ColumnFieldNames } from "@moodys/mdc-table.schemas.screener";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { AgGridFilterModel } from "@models/table.types";
import { PresetFilterHookResponse } from "@models/preset-filter.types";
import {
  useAppDispatch,
  saveSubSectorFilterModel,
  saveCountryFilterModel,
  saveFilterModel,
} from "@services/redux";
import { useQueryParameterFilterModel } from "./queryParamFilterModel.hooks";
import { useReferrerLinkFilterModel } from "./referrerLinkFilterModel.hooks";
import { useLocalStorageFilterModel } from "./localStorageFilterModel.hooks";
import { useShareLinkFilterModel } from "./shareLinkFilterModel.hooks";

export const usePresetFilterModel = (): PresetFilterHookResponse => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [presetFilterModel, setPresetFilterModel] = useState<
    AgGridFilterModel | undefined
  >(undefined);
  const dispatch = useAppDispatch();
  const {
    isSuccess: queryParamFilterModelCompleted,
    filterModel: queryParamFilterModel,
  } = useQueryParameterFilterModel();
  const {
    isSuccess: referrerFilterModelCompleted,
    filterModel: documentReferrerFilterModel,
  } = useReferrerLinkFilterModel();
  const {
    isSuccess: localStorageModelCompleted,
    filterModel: localStorageFilterModel,
  } = useLocalStorageFilterModel();
  const {
    isSuccess: shareLinkFilterModelCompleted,
    filterModel: shareLinkFilterModel,
  } = useShareLinkFilterModel();

  const potentialFilterModelsFetched =
    queryParamFilterModelCompleted &&
    referrerFilterModelCompleted &&
    localStorageModelCompleted &&
    shareLinkFilterModelCompleted &&
    !isSuccess;

  useEffect(() => {
    if (potentialFilterModelsFetched) {
      if (queryParamFilterModel) {
        setPresetFilterModel(queryParamFilterModel);
        return;
      }
      if (documentReferrerFilterModel) {
        setPresetFilterModel(documentReferrerFilterModel);
        return;
      }
      if (localStorageFilterModel) {
        setPresetFilterModel(localStorageFilterModel);
        return;
      }
      if (shareLinkFilterModel) {
        setPresetFilterModel(shareLinkFilterModel);
        return;
      }
      setPresetFilterModel({});
    }
  }, [
    documentReferrerFilterModel,
    isSuccess,
    queryParamFilterModel,
    potentialFilterModelsFetched,
    localStorageFilterModel,
    shareLinkFilterModel,
  ]);

  useEffect(() => {
    if (potentialFilterModelsFetched && presetFilterModel) {
      if (!isEmpty(presetFilterModel)) {
        dispatch(saveFilterModel(presetFilterModel));
        dispatch(
          saveSubSectorFilterModel(
            presetFilterModel[ColumnFieldNames.ORG_INDUSTRY] ?? null
          )
        );
        dispatch(
          saveCountryFilterModel(
            presetFilterModel[ColumnFieldNames.ORG_COUNTRY] ?? null
          )
        );
        history.pushState(
          {},
          "",
          `${window.location.origin}${window.location.pathname}`
        );
      }
      setIsSuccess(true);
    }
  }, [presetFilterModel, isSuccess, dispatch, potentialFilterModelsFetched]);

  return { isSuccess, filterModel: presetFilterModel };
};
