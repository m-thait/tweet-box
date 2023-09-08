import {
  emitAnalyticsEvent,
  AnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { differenceInSeconds } from "date-fns";
import { screenerExport } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { logError } from "./error.utils";

export const extractExportFileName = (url: string) => {
  try {
    const isURl = new URL(url);
    return isURl.pathname.split("/").pop();
  } catch (error) {
    logError(error, "extractExportFileName");
  }
  return false;
};

export const downloadExport = async (
  url: string,
  startTime: Date,
  entityCount: string
) => {
  try {
    const filename = extractExportFileName(url);
    if (!filename) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerExport,
      eventDetails: {
        ...defaultEventDetails,
        depth: `${differenceInSeconds(new Date(), startTime)}`,
        id: "success",
        name: entityCount,
      },
    });
  } catch (error) {
    logError(error, "downloadExport");
    emitAnalyticsEvent(AnalyticsEvent.AvoEvent, {
      fn: screenerExport,
      eventDetails: {
        ...defaultEventDetails,
        id: "fail",
        name: entityCount,
      },
    });
  }
};
