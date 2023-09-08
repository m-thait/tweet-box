import "index.scss";
import React, { lazy } from "react";
import { MicroFrontendLoader } from "@moodys/mdc-frontend.helpers.micro-frontend-loader";
import { SplitFactoryWithConfig } from "@moodys/mdc-frontend.services.split";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { getUserEmail } from "@moodys/mdc-toolbox.user.utils";
import { SPLIT_TEST_FEATURES } from "@services/splitIO/splitIO.features";

import { App } from "../app/App";
import { SPLIT_API_KEY } from "../app/AppConfig";

const HostLayout = lazy(() =>
  // eslint-disable-next-line import/no-unresolved
  import("MdcShell/Layout").then((module) => ({
    default: module.LayoutWrapper,
  }))
);

export const LocalApp = () => {
  return (
    <BrowserRouter>
      <MicroFrontendLoader renderOnIntersect={false}>
        <HostLayout>
          <SplitFactoryWithConfig
            authorizationKey={SPLIT_API_KEY}
            userKey={getUserEmail()}
            features={SPLIT_TEST_FEATURES}
          >
            <App />
          </SplitFactoryWithConfig>
        </HostLayout>
      </MicroFrontendLoader>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<LocalApp />);
