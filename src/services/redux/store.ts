import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  createListenerMiddleware,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { isProductionMode } from "app/AppConfig";
import { logError } from "@utils/error.utils";
import { restoreFromSessionStorage } from "@services/redux/listeners";
import {
  aemDrawerInfoApi,
  taxonomyApi,
  scoreDefinitionApi,
  userTypeApi,
} from "@services/api";
import { rtkQueryErrorMiddleware } from "@services/api/rtk/rtkQueryErrorMiddleware";
import { rootReducer } from "./reducer";

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: (error: unknown) => {
    logError(error, "Listener Api");
  },
});

const store = configureStore({
  reducer: rootReducer,
  devTools: !isProductionMode,
  preloadedState: restoreFromSessionStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddlewareInstance.middleware)
      .concat(rtkQueryErrorMiddleware)
      .concat(taxonomyApi.middleware)
      .concat(aemDrawerInfoApi.middleware)
      .concat(scoreDefinitionApi.middleware)
      .concat(userTypeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export { store };

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
