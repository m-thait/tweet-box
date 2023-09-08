import { cleanup } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks";
import { useQueryParam } from "./useQueryParam";

describe("useQueryParam", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = (queryKey?: string, query?: Record<string, string>) => {
    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((name: string) => (query ? query[name] : null));

    const { renderHook } = mockReduxStore();
    const { result } = renderHook(() => useQueryParam(queryKey as string));
    return { result };
  };

  describe("Can fetch query param value", () => {
    it("should return undefined if no query key is provided", () => {
      const { result } = init();
      const param = result.current;
      expect(param).toBe(undefined);
    });

    it("should return undefined if wrong query key is provided", () => {
      const { result } = init("country", {
        sector: "BadSector",
      });
      const param = result.current;
      expect(param).toBe(undefined);
    });

    it("should return the correct value when good query key is passed.", () => {
      const { result } = init("sector", {
        sector: "corporates",
      });
      const param = result.current;
      expect(param).toBe("corporates");
    });
  });
});
