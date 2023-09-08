import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { logError } from "@utils/error.utils";

export const rtkQueryErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const {
      error: { message },
      meta,
      type,
      payload: { status, error },
    } = action;
    logError(error, "RTKQueryMiddleware", {
      meta,
      message,
      type,
      status,
    });
  }
  return next(action);
};
