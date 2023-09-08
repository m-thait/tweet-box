import { useState, useEffect, useRef } from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { logger } from "@moodys/mdc-frontend.services.logger";
import { AgGridFilterModel } from "@models/table.types";
import { PresetFilterHookResponse } from "@models/preset-filter.types";
import { getShareLinkFilterModel } from "@services/api";
import { useQueryParam } from "./useQueryParam";

const applyShareLinkFilterModel = async (
  setShareLinkFilterModel: (filterModel: AgGridFilterModel) => void,
  shareLinkId: string | undefined
) => {
  try {
    if (shareLinkId) {
      const shareLinkFilterModel = await getShareLinkFilterModel(shareLinkId);
      if (shareLinkFilterModel) {
        setShareLinkFilterModel(shareLinkFilterModel as AgGridFilterModel);
        return;
      }
    }
  } catch (ex) {
    logger.error({
      error: ex,
      message: "useShareLinkFilterModel",
      shareLinkId: shareLinkId,
    });
  }
  setShareLinkFilterModel({});
};

export const useShareLinkFilterModel = (): PresetFilterHookResponse => {
  const isSuccess = useRef(false);
  const shareLinkId = useQueryParam("share-link", true);
  const [shareLinkFilterModel, setShareLinkFilterModel] = useState<
    undefined | AgGridFilterModel
  >(undefined);

  useEffect(() => {
    if (!isSuccess.current) {
      isSuccess.current = true;
      applyShareLinkFilterModel(setShareLinkFilterModel, shareLinkId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSuccess: (isSuccess.current &&
      shareLinkFilterModel !== undefined) as boolean,
    filterModel: isEmpty(shareLinkFilterModel)
      ? undefined
      : shareLinkFilterModel,
  };
};
