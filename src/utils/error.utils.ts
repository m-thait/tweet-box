import { logger } from "@moodys/mdc-frontend.services.logger";

export const logError = (
  error: Error | unknown,
  location?: string,
  additionalInfo: Record<string, unknown> = {}
) => {
  logger.error({
    message: location ? `SCREENER ERROR at ${location}` : `SCREENER ERROR`,
    error,
    ...additionalInfo,
  });
};
