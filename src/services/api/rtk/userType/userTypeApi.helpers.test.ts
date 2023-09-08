import {
  userTypeQueryResponseCore,
  userTypeQueryResponsePremium,
} from "@services/redux/mocks/userTypeStoreState";
import { UserInfoResponse } from "@models/api.types";
import { transformUserInfoResponse } from "./userTypeApi.helpers";

describe("UserType API helpers", () => {
  describe("transformUserInfoResponse", () => {
    it("should return response premium", async () => {
      const result = transformUserInfoResponse(userTypeQueryResponsePremium);

      expect(result).toStrictEqual("ESG_PREMIUM");
    });

    it("should return response core", async () => {
      const result = transformUserInfoResponse(userTypeQueryResponseCore);

      expect(result).toStrictEqual("ESG_CORE");
    });

    it("should return response none", async () => {
      const result = transformUserInfoResponse({} as UserInfoResponse);

      expect(result).toStrictEqual("ESG_NONE");
    });
  });
});
