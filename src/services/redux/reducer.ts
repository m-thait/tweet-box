import { combineReducers } from "@reduxjs/toolkit";
import {
  aemDrawerInfoApi,
  taxonomyApi,
  scoreDefinitionApi,
  userTypeApi,
} from "@services/api";
import { tableSlice, uiSlice } from "./slices";

export const rootReducer = {
  ui: uiSlice.reducer,
  table: tableSlice.reducer,
  [taxonomyApi.reducerPath]: taxonomyApi.reducer,
  [aemDrawerInfoApi.reducerPath]: aemDrawerInfoApi.reducer,
  [scoreDefinitionApi.reducerPath]: scoreDefinitionApi.reducer,
  [userTypeApi.reducerPath]: userTypeApi.reducer,
};

export const testingReducer = combineReducers(rootReducer);
