import "../index.scss";
import React, { StrictMode, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { Unsubscribe } from "@reduxjs/toolkit";
import { LicenseManager } from "ag-grid-enterprise";
import { logger } from "@moodys/mdc-frontend.services.logger";
import { startAppListening, store } from "@services/redux";
import FallbackComponent from "@views/FallbackComponent";
import { setupTableEventsListeners } from "@services/redux/listeners";
import { AG_GRID_LICENSE } from "app/AppConfig";
import {
  QUALTRICS_LOCALHOST_COOKIE,
  USERTYPE_LOCALHOST_COOKIE,
} from "@constants/qualtrics";
import { AppLayout } from "./AppLayout";

if (AG_GRID_LICENSE) {
  LicenseManager.setLicenseKey(AG_GRID_LICENSE);
} else {
  logger.error({ message: "AgGrid License not found." });
}

if (location.hostname === "localhost") {
  document.cookie = USERTYPE_LOCALHOST_COOKIE;
  document.cookie = QUALTRICS_LOCALHOST_COOKIE;
}

export const App = () => {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupTableEventsListeners(startAppListening),
    ];
    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <StrictMode>
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <CssBaseline />
          <AppLayout />
        </ErrorBoundary>
      </Provider>
    </StrictMode>
  );
};

export default App;
