import React from "react";
import { LicenseManager } from "ag-grid-enterprise";
import { logger } from "@moodys/mdc-frontend.services.logger";
import { createRoot } from "react-dom/client";
import { AG_GRID_LICENSE } from "app/AppConfig";
import { App } from "app/App";
import "./index.scss";
import {
  QUALTRICS_LOCALHOST_COOKIE,
  USERTYPE_LOCALHOST_COOKIE,
} from "@constants/qualtrics";

if (AG_GRID_LICENSE) {
  LicenseManager.setLicenseKey(AG_GRID_LICENSE);
} else {
  logger.error({ message: "AgGrid License not found." });
}

if (location.hostname === "localhost") {
  document.cookie = USERTYPE_LOCALHOST_COOKIE;
  document.cookie = QUALTRICS_LOCALHOST_COOKIE;
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
