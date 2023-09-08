import { useState, useEffect, useRef } from "react";
import { isEmpty } from "@moodys/mdc-table.utils.object";
import { AgGridFilterModel } from "@models/table.types";
import { PresetFilterHookResponse } from "@models/preset-filter.types";
import { TaxonomyData } from "@models/taxonomy.types";
import {
  getPeerOrgFilterModel,
  getSectorViewsFilterModel,
} from "@utils/documentReferrer.utils";
import { getTaxonomyData, useAppSelector } from "@services/redux";

const applyDocumentReferrerFilterModel = async (
  setDocumentReferrerFilterModel: (filterModel: AgGridFilterModel) => void,
  taxonomyData: TaxonomyData
) => {
  const peerOrgsFilterModel = await getPeerOrgFilterModel();
  const sectorViewFilterModel = await getSectorViewsFilterModel(taxonomyData);
  if (peerOrgsFilterModel) {
    setDocumentReferrerFilterModel(peerOrgsFilterModel as AgGridFilterModel);
  } else if (sectorViewFilterModel) {
    setDocumentReferrerFilterModel(sectorViewFilterModel as AgGridFilterModel);
  } else {
    setDocumentReferrerFilterModel({});
  }
};

export const useReferrerLinkFilterModel = (): PresetFilterHookResponse => {
  const isSuccess = useRef(false);
  const taxonomyData = useAppSelector(getTaxonomyData);
  const [documentReferrerFilterModel, setDocumentReferrerFilterModel] =
    useState<undefined | AgGridFilterModel>(undefined);

  useEffect(() => {
    if (!isSuccess.current) {
      isSuccess.current = true;
      applyDocumentReferrerFilterModel(
        setDocumentReferrerFilterModel,
        taxonomyData as TaxonomyData
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isSuccess: (isSuccess.current &&
      documentReferrerFilterModel !== undefined) as boolean,
    filterModel: isEmpty(documentReferrerFilterModel)
      ? undefined
      : documentReferrerFilterModel,
  };
};
