import { waitFor } from "@testing-library/react";
import { HttpErrorStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import { mockReduxStore, commentsData } from "@services/redux/mocks";
import * as HttpClient from "@services/http";
import { DEFAULT_COMMENT_COLUMNS } from "@constants/api";
import { useGetEsgComments } from "./ScoreBody.hooks";

jest.mock("@services/http");
jest.spyOn(console, "info").mockImplementation(() => undefined);
jest.spyOn(console, "error").mockImplementation(() => undefined);

describe("ScoreBody.hooks", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call esg-comments endpoint", async () => {
    const { renderHook } = mockReduxStore();

    const orgId = "234234";
    const orgComment = {
      ...commentsData[0],
      orgId,
    };
    const postMock = (
      HttpClient.axiosClient.post as jest.Mock
    ).mockResolvedValue({
      data: [orgComment],
      status: 200,
    });
    const { result, rerender } = renderHook(() =>
      useGetEsgComments(orgId, DEFAULT_COMMENT_COLUMNS)
    );
    await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));
    rerender();
    expect(result.current.esgComments).toStrictEqual(orgComment);
  });

  it("should throw error", async () => {
    const postMock = (
      HttpClient.axiosClient.post as jest.Mock
    ).mockRejectedValue({
      status: HttpErrorStatusCode.FORBIDDEN,
    });

    const { renderHook } = mockReduxStore();
    const orgId = "564564";
    const { result, rerender } = await renderHook(() =>
      useGetEsgComments(orgId, DEFAULT_COMMENT_COLUMNS)
    );
    await waitFor(() => expect(postMock).toHaveBeenCalledTimes(1));
    rerender();
    expect(postMock).toHaveBeenCalledWith("/esg-comments", {
      columns: DEFAULT_COMMENT_COLUMNS,
      orgIds: ["564564"],
    });
    await expect(result.current.errorMessage).toBe(
      "Comments failed to load for orgId: 564564"
    );
  });
});
