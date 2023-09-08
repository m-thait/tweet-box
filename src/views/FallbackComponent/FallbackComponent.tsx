import React from "react";
import { ErrorPage } from "@moodys/mdc-frontend.widgets.error-page";
import { HttpErrorStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import { logError } from "@utils/error.utils";

export const FallbackComponent = ({ error }: { error?: Error }) => {
  logError(error, "FallbackComponent");
  return <ErrorPage statusCode={HttpErrorStatusCode.INTERNAL_SERVER_ERROR} />;
};
