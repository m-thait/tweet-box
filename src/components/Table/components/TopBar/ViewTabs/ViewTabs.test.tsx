import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as router from "react-router";
import { mockReduxStore } from "@services/redux/mocks";
import { ViewTabs } from "./ViewTabs";

describe("View Tabs", () => {
  const { render, store, RESET_ACTION } = mockReduxStore();

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  const init = () => {
    render(<ViewTabs />);
  };

  it("should render the view tabs", () => {
    init();
    const filterBar = screen.getByTestId("view-tabs");
    expect(filterBar).toBeInTheDocument();
  });

  it("selecting a tab should change the path", async () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    init();
    const tabs = screen.getAllByRole("tab");
    fireEvent.click(tabs[1]);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalled();
    });
  });
});
