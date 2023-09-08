import fetchMock from "jest-fetch-mock";
import { UrlGateway, UrlPath } from "@constants/api";
import {
  scoreDefinitionQueryResponse,
  scoreDefinitionMockResponse,
} from "@services/redux/mocks/scoreDefinitionStoreState";
import { initRTK } from "@services/api/rtk/rtk-test-helper";
import { scoreDefinitionApi } from "./scoreDefinitionApi";

jest.spyOn(console, "error").mockImplementation(() => undefined);

describe("ScoreDefinitionApi", () => {
  const fetchScoreDefinitionAction =
    scoreDefinitionApi.endpoints.fetchScoreDefinition.initiate(undefined);

  beforeEach((): void => {
    fetchMock.resetMocks();
  });

  describe("fetchScoreDefinition", () => {
    it("should initiate request with correct url and headers", async () => {
      await initRTK(fetchScoreDefinitionAction, {});

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const { method, url } = fetchMock.mock.calls[0][0] as Request;

      expect(method).toBe("GET");
      expect(url).toBe(`${UrlGateway.BASE_API}${UrlPath.SCORE_DEFINITION}`);
    });

    it("should mark status fullfilled on successful response", async () => {
      const action = await initRTK(
        fetchScoreDefinitionAction,
        scoreDefinitionQueryResponse
      );
      const { status, data, isSuccess } = action;

      expect(status).toBe("fulfilled");
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual(scoreDefinitionMockResponse);
    });

    it("should mark status rejected on failed response", async () => {
      const action = await initRTK(fetchScoreDefinitionAction);
      const {
        status,
        error: { error },
        isError,
      } = action;
      expect(status).toBe("rejected");
      expect(isError).toBe(true);
      expect(error).toBe("Error: Internal Server Error");
    });
  });
});
