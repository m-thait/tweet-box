import { logger } from "@moodys/mdc-frontend.services.logger";
import { logError } from "./error.utils";

jest.mock("@moodys/mdc-frontend.services.logger", () => {
  return {
    logger: {
      error: jest.fn(),
    },
  };
});

describe("Error Utils", () => {
  it("should log error with location as message", () => {
    const logHandler = jest.spyOn(logger, "error");
    const err = new Error("Sample Error");
    logError(err, "test");
    expect(logHandler).toHaveBeenCalledWith({
      error: err,
      message: "SCREENER ERROR at test",
    });
  });
  it("should log error without a location", () => {
    const logHandler = jest.spyOn(logger, "error");
    const err = new Error("Sample Error");
    logError(err);
    expect(logHandler).toHaveBeenCalledWith({
      error: err,
      message: "SCREENER ERROR",
    });
  });
});
