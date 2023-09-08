import { logger } from "@moodys/mdc-frontend.services.logger";
import { downloadExport } from "./downloadExport";
jest.mock("@moodys/mdc-frontend.services.logger", () => {
  return {
    logger: {
      error: jest.fn(),
    },
  };
});

describe("Download Export", () => {
  it("should log an error if a bad url is used", async () => {
    const logHandler = jest.spyOn(logger, "error");
    const documentHandler = jest.spyOn(document, "createElement");
    const bodyHandler = jest.spyOn(document.body, "appendChild");
    const url = "s3-bad-url";
    await downloadExport(url, new Date(), "20");
    expect(logHandler).toHaveBeenCalledTimes(1);
    expect(documentHandler).toHaveBeenCalledTimes(0);
    expect(bodyHandler).toHaveBeenCalledTimes(0);
  });
});
