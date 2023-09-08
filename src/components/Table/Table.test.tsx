/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { match } from "css-mediaquery";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { saveUserType } from "@services/redux";
import { EsgUserType } from "@models/api.types";
import { ESG_TOP_BAR_FLAG } from "@services/splitIO/splitIO.flags";
import { Table } from "./Table";

describe("Table", () => {
  const { render, store, RESET_ACTION } = mockReduxStore({
    features: {
      [ESG_TOP_BAR_FLAG]: "on",
    },
  });

  afterEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should render UiTable without TopBar on mobile", async () => {
    store.dispatch(saveUserType(EsgUserType.ESG_PREMIUM));
    function createMatchMedia(width: number) {
      return (query: string): MediaQueryList => ({
        matches: match(query, { width }) as boolean,
        media: "",
        addListener: () => {},
        removeListener: () => {},
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      });
    }
    // mock matchMedia for useMediaQuery to work properly
    window.matchMedia = createMatchMedia(599);
    render(<Table />);
    await waitFor(() => {
      const TopBarComponent = screen.queryByTestId("app-top-filter-bar");
      expect(TopBarComponent).not.toBeInTheDocument();
    });
    await waitFor(() => {
      const TableComponent = screen.queryByTestId("ui-table");
      expect(TableComponent).toBeInTheDocument();
    });
  });

  it("should render UiTable with TopBar when not on mobile", async () => {
    store.dispatch(saveUserType(EsgUserType.ESG_PREMIUM));
    function createMatchMedia(width: number) {
      return (query: string): MediaQueryList => ({
        matches: match(query, { width }) as boolean,
        media: "",
        addListener: () => {},
        removeListener: () => {},
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      });
    }
    // mock matchMedia for useMediaQuery to work properly
    window.matchMedia = createMatchMedia(601);
    render(<Table />);
    await waitFor(() => {
      const TopBarComponent = screen.queryByTestId("app-top-filter-bar");
      expect(TopBarComponent).toBeInTheDocument();
    });
    await waitFor(() => {
      const TableComponent = screen.queryByTestId("ui-table");
      expect(TableComponent).toBeInTheDocument();
    });
  });
});
