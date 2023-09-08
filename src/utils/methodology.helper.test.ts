import * as api from "@services/api/api";
import { openMethodologyDocument } from "@utils/methodology.helper";

describe("openMethodologyDocument", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("should select correct methodology document", () => {
    it.each(["social", "environmental"])(
      "should open the correct methodology url",
      async (type) => {
        const getMethodologyDocumentLinkSpy = jest
          .spyOn(api, "getMethodologyDocumentLink")
          .mockResolvedValue({ url: "mysignedurl.com/pdf" });
        const windowSpy = jest
          .spyOn(window, "open")
          .mockImplementation(jest.fn());

        await openMethodologyDocument(type);
        expect(windowSpy).toHaveBeenCalledTimes(1);
        expect(getMethodologyDocumentLinkSpy).toHaveBeenCalled();
      }
    );
  });
});
