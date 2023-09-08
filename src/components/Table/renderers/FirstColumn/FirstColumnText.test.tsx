import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ICellRendererParams } from "ag-grid-enterprise";
import { mockReduxStore } from "@services/redux/mocks";
import { FirstColumnText } from "./FirstColumnText";

describe("FirstColumnText", () => {
  const ChildComponent = () => <p>Some content to render...</p>;
  const mockElement = document.createElement("div");
  const props = {
    params: {
      value: "List Median",
      rowIndex: 1,
      eGridCell: mockElement as HTMLElement,
      data: { orgId: "org", orgName: "orgName" },
    } as ICellRendererParams,
    children: <ChildComponent />,
    showCloseIcon: false,
  };

  const init = (pinned: boolean) => {
    const { store } = mockReduxStore();
    render(
      <Provider store={store}>
        <FirstColumnText {...props} isRowPinned={pinned} />
      </Provider>
    );
  };
  it("should render unpinned row", () => {
    init(false);

    const FirstColumnLink = screen.getByTestId("row-value-link-1");
    const FirstColumnText = screen.queryByTestId("row-value-1");
    expect(FirstColumnLink).toBeInTheDocument();
    expect(FirstColumnText).not.toBeInTheDocument();
  });
  it("should render pinned row", () => {
    init(true);

    const FirstColumnLink = screen.queryByTestId("row-value-link-1");
    const FirstColumnText = screen.queryByTestId("row-value-1");
    expect(FirstColumnLink).not.toBeInTheDocument();
    expect(FirstColumnText).toBeInTheDocument();
  });

  it("should have target set to blank and a href attribute", () => {
    init(false);
    const FirstColumnLink = screen.getByTestId("row-value-link-1");
    expect(FirstColumnLink).toHaveAttribute("target", "_blank");
    expect(FirstColumnLink).toHaveAttribute("href");
    const hrefValue = FirstColumnLink.getAttribute("href");
    expect(hrefValue).toContain(
      "/credit-ratings/orgName-credit-rating-org/summary"
    );
  });
});
