import { useState, useEffect, useRef } from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { AgGridFilterModel } from "@models/table.types";
import { PresetFilterHookResponse } from "@models/preset-filter.types";
import { checkOrgIdsFromStorage } from "@utils/localStorage.utils";

const applyLocalStorageFilterModel = async (
  setLocalStorageFilterModel: (filterModel: AgGridFilterModel) => void
) => {
  const { isRedirect, redirectFilterModel } = await checkOrgIdsFromStorage();
  if (isRedirect && redirectFilterModel) {
    setLocalStorageFilterModel(redirectFilterModel as AgGridFilterModel);
  } else {
    setLocalStorageFilterModel({});
  }
};

export const useLocalStorageFilterModel = (): PresetFilterHookResponse => {
  const isSuccess = useRef(false);
  const [localStorageFilterModel, setLocalStorageFilterModel] = useState<
    undefined | AgGridFilterModel
  >(undefined);

  useEffect(() => {
    if (!isSuccess.current) {
      isSuccess.current = true;
      applyLocalStorageFilterModel(setLocalStorageFilterModel);
    }
  }, []);

  return {
    isSuccess: (isSuccess.current &&
      localStorageFilterModel !== undefined) as boolean,
    filterModel: isEmpty(localStorageFilterModel)
      ? undefined
      : localStorageFilterModel,
  };
};
