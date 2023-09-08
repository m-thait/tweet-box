import React, { lazy, Suspense, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ErrorPage } from "@moodys/mdc-frontend.widgets.error-page";
import { HttpErrorStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import {
  useAnalyticsForApps,
  useAnalyticsPageLoading,
} from "@moodys/mdc-frontend.services.analytics";
import { Loader } from "@components/SkeletonLoader";
import { logError } from "@utils/error.utils";
import {
  globalPageLoaded,
  initAvo,
  avoInspectorApiKey,
} from "@services/analytics/Avo";
import { screenerPageAttributes } from "@services/analytics/avoConstants";
import { TableViewType } from "@models/chart.types";
const HomePage = lazy(() => import("@views/Home"));

export const AppRoutes: React.FC = () => {
  const { pathname } = useLocation();
  const returnErrorPage = useCallback(() => {
    if (
      ![
        "/",
        "/screener",
        "/screener/",
        `/screener/${TableViewType.ESG}`,
        `/${TableViewType.ESG}`,
      ].includes(pathname)
    ) {
      const error = new Error(`Path (${location.pathname}) not found.`);
      logError(error, "AppRoutes");
    }
    return <ErrorPage statusCode={HttpErrorStatusCode.NOT_FOUND} />;
  }, [pathname]);

  useAnalyticsForApps({
    avoApiKey: avoInspectorApiKey,
    localCopyOfInitAvo: initAvo,
  });

  useAnalyticsPageLoading({
    fn: globalPageLoaded,
    pageDetails: screenerPageAttributes,
  });

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<HomePage view={TableViewType.OVERVIEW} />} />
        <Route
          path={TableViewType.ESG}
          element={<HomePage view={TableViewType.ESG} />}
        />
        <Route path="*" element={returnErrorPage()} />
      </Routes>
    </Suspense>
  );
};
