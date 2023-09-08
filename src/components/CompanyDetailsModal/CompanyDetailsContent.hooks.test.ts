import { waitFor } from "@testing-library/react";
import { HttpErrorStatusCode } from "@moodys/mdc-toolbox.api.status-codes";
import { mockReduxStore } from "@services/redux/mocks";
import * as HttpClient from "@services/http";
import { useGetOrgInfo } from "./CompanyDetailsContent.hooks";

jest.mock("@services/http");
jest.spyOn(console, "info").mockImplementation(() => undefined);
jest.spyOn(console, "error").mockImplementation(() => undefined);

describe("CompanyDetailsContent.hooks", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call org-info endpoint", async () => {
    const { renderHook } = mockReduxStore();

    const orgId = "234234";
    const analysts = [
      {
        role: "Lead Analyst",
        name: "William V. Fahy",
        phone: "212-553-1687",
        email: "William.Fahy@moodys.com",
      },
      {
        role: "Backup Analyst",
        name: "Peter Trombetta",
        phone: "212-553-1356",
        email: "Peter.Trombetta@moodys.com",
      },
      {
        role: "Rating Analyst",
        name: "Jack Myers",
        phone: "212-553-5116",
        email: "Jack.Myers@moodys.com",
      },
      {
        role: "Rating Analyst",
        name: "Jack Myers",
        phone: "212-553-5116",
        email: "Jack.Myers@moodys.com",
      },
    ];
    const getMock = (HttpClient.axiosClient.get as jest.Mock).mockResolvedValue(
      {
        data: { analysts },
        status: 200,
      }
    );
    const { result, rerender } = renderHook(() => useGetOrgInfo(orgId));
    await waitFor(() => expect(getMock).toHaveBeenCalledTimes(1));
    rerender();
    expect(result.current.orgInfo?.analysts).toStrictEqual(analysts);
  });

  it("should throw error", async () => {
    const getMock = (HttpClient.axiosClient.get as jest.Mock).mockRejectedValue(
      {
        status: HttpErrorStatusCode.FORBIDDEN,
      }
    );

    const { renderHook } = mockReduxStore();
    const orgId = "564564";
    const { result, rerender } = await renderHook(() => useGetOrgInfo(orgId));
    await waitFor(() => expect(getMock).toHaveBeenCalledTimes(1));
    rerender();
    expect(getMock).toHaveBeenCalledWith("/org-info/564564");
    await expect(result.current.errorMessage).toBe(
      "OrgInfo failed to load for orgId: 564564"
    );
  });
});
