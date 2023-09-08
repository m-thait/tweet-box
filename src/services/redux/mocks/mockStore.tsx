import React, { ReactElement, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  AnyAction,
  CombinedState,
  configureStore,
  createListenerMiddleware,
  Reducer,
  Store,
  Unsubscribe,
} from "@reduxjs/toolkit";
import {
  render,
  renderHook,
  RenderResult,
  RenderHookResult,
} from "@testing-library/react";
import deepmerge from "deepmerge";
import { SplitFactoryWithConfig } from "@moodys/mdc-frontend.services.split";
import {
  AppStartListening,
  RootState,
  setupTableEventsListeners,
  tableInitialState,
  testingReducer,
  uiInitialState,
} from "@services/redux";
import { logError } from "@utils/error.utils";
import {
  aemDrawerInfoApi,
  rtkQueryErrorMiddleware,
  taxonomyApi,
  scoreDefinitionApi,
  userTypeApi,
} from "@services/api";
import { mockAemStoreState } from "./aemStoreState";
import { mockTaxonomyStoreState } from "./taxonomyStoreState";
import { mockUserTypeState } from "./userTypeStoreState";

export const allInitialStates = {
  ui: uiInitialState,
  table: tableInitialState,
} as RootState;

const getPreloadedState = (
  updatedInitialState: Record<string, unknown>,
  loadSuccessfulTaxonomyCalls: boolean,
  loadSuccessfulAemCalls: boolean,
  loadSuccessfulUserTypePremiumCalls: boolean,
  loadSuccessfulUserTypeCoreCalls: boolean
): Partial<RootState> => {
  let initialState = { ...allInitialStates };
  if (loadSuccessfulTaxonomyCalls) {
    initialState = deepmerge(initialState, mockTaxonomyStoreState.goodResponse);
  }
  if (loadSuccessfulAemCalls) {
    initialState = deepmerge(initialState, mockAemStoreState);
  }
  if (loadSuccessfulUserTypePremiumCalls) {
    initialState = deepmerge(initialState, mockUserTypeState.premium);
  }
  if (loadSuccessfulUserTypeCoreCalls) {
    initialState = deepmerge(initialState, mockUserTypeState.core);
  }
  return updatedInitialState
    ? deepmerge(initialState, updatedInitialState)
    : initialState;
};

const RESET_ACTION = {
  type: "RESET",
};

const defaultFeaturesMap: SplitIO.MockedFeaturesMap = {};

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === "RESET") {
    state = allInitialStates;
  }
  return testingReducer(state, action);
};

export const mockReduxStore = ({
  updatedInitialState,
  features = defaultFeaturesMap,
  loadSuccessfulTaxonomyCalls = true,
  loadSuccessfulAemCalls = true,
  loadSuccessfulUserTypePremiumCalls = true,
  loadSuccessfulUserTypeCoreCalls = false,
}: {
  updatedInitialState?: Record<string, unknown>;
  features?: SplitIO.MockedFeaturesMap;
  loadSuccessfulTaxonomyCalls?: boolean;
  loadSuccessfulAemCalls?: boolean;
  loadSuccessfulUserTypePremiumCalls?: boolean;
  loadSuccessfulUserTypeCoreCalls?: boolean;
} = {}): {
  render: (component?: ReactElement) => RenderResult;
  renderHook: <T>(
    callbackHook: (props: { children: ReactElement }) => T
  ) => RenderHookResult<T, { children: ReactElement }>;
  store: Store;
  RESET_ACTION: AnyAction;
} => {
  const listenerMiddlewareInstance = createListenerMiddleware({
    onError: (error) => {
      logError(error as Error, "Mock Store");
    },
  });

  const store = configureStore({
    reducer: rootReducer as Reducer<CombinedState<RootState>>,
    preloadedState: getPreloadedState(
      updatedInitialState ?? {},
      loadSuccessfulTaxonomyCalls,
      loadSuccessfulAemCalls,
      loadSuccessfulUserTypePremiumCalls,
      loadSuccessfulUserTypeCoreCalls
    ),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .prepend(listenerMiddlewareInstance.middleware)
        .concat(rtkQueryErrorMiddleware)
        .concat(taxonomyApi.middleware)
        .concat(aemDrawerInfoApi.middleware)
        .concat(scoreDefinitionApi.middleware)
        .concat(userTypeApi.middleware),
  });

  const startAppListening =
    listenerMiddlewareInstance.startListening as AppStartListening;

  const ReduxWrapper = ({ children }: { children: ReactElement }) => {
    useEffect(() => {
      const subscriptions: Unsubscribe[] = [
        setupTableEventsListeners(startAppListening),
      ];

      return () => subscriptions.forEach((unsubscribe) => unsubscribe());
    }, []);

    return (
      <SplitFactoryWithConfig features={features} userKey={"test@user.com"}>
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </SplitFactoryWithConfig>
    );
  };

  return {
    render: (component?: ReactElement) =>
      render(component ?? <div>Hello World</div>, { wrapper: ReduxWrapper }),
    renderHook: <T,>(callbackHook: (props: { children: ReactElement }) => T) =>
      renderHook(callbackHook, { wrapper: ReduxWrapper }),
    store,
    RESET_ACTION,
  };
};
