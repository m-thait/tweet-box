import { act } from "react-dom/test-utils";
import { mockReduxStore } from "@services/redux/mocks";
import * as HttpClient from "@services/http";
import { toggleChart } from "@services/redux";
import { useChartEvents } from "./Chart.hooks";

jest.mock("@services/http");

describe("Chart hooks test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const init = () => {
    const { renderHook, store } = mockReduxStore({
      updatedInitialState: {
        ui: { charts: { isChartOpen: false } },
        table: {
          chartData: null,
          filterModel: {
            previous: [],
            current: [],
          },
        },
      },
    });

    const { result } = renderHook(() => {
      const { getNewCharts } = useChartEvents();
      return { getNewCharts };
    });

    return { handlers: result, store };
  };

  it("getNewCharts should make correct fetch and be a function", async () => {
    const { handlers } = init();
    (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue({
      data: { ratings: {}, scores: {} },
      status: 200,
    });
    const { getNewCharts } = handlers.current;
    getNewCharts([]);
    expect(HttpClient.axiosClient.post).toHaveBeenCalledWith("/esg-charts", {
      filters: [],
    });
    expect(typeof getNewCharts).toBe("function");
  });

  it("toggling isChartOpen to true will trigger a fetch", async () => {
    const { store } = init();
    (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue({
      data: { ratings: {}, scores: {} },
      status: 200,
    });

    act(() => {
      store.dispatch(toggleChart());
    });
    expect(HttpClient.axiosClient.post).toHaveBeenCalledWith("/esg-charts", {
      filters: [],
    });
  });

  it("closing and opening Chart will not trigger a new fetch", async () => {
    const { store } = init();
    (HttpClient.axiosClient.post as jest.Mock).mockResolvedValue({
      data: { ratings: {}, scores: {} },
      status: 200,
    });

    act(() => {
      store.dispatch(toggleChart());
    });
    expect(HttpClient.axiosClient.post).toHaveBeenCalledWith("/esg-charts", {
      filters: [],
    });
    act(() => {
      store.dispatch(toggleChart());
    });
    act(() => {
      store.dispatch(toggleChart());
    });
    expect(HttpClient.axiosClient.post).toHaveBeenCalledTimes(1);
  });
});
