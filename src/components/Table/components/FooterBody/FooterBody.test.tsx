import React from "react";
import { screen } from "@testing-library/react";
import { mockReduxStore } from "@services/redux/mocks";
import { saveHasOOSValues } from "@services/redux";
import { FooterBody } from "@components/Table/components/FooterBody/FooterBody";

describe("Footer Body", () => {
  const init = (hasOOSCells = false) => {
    const { render, store } = mockReduxStore();
    store.dispatch(saveHasOOSValues(hasOOSCells));
    render(<FooterBody />);
  };

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render footer body", () => {
    init();
    const footerBody = screen.getByTestId("footer-body");
    expect(footerBody).toBeInTheDocument();
  });

  it("should refresh date and time element", () => {
    init();
    const dateAndTime = screen.queryByTestId(
      "last-updated-date-and-time"
    ) as HTMLElement;
    expect(dateAndTime).toBeInTheDocument();
    expect(dateAndTime.innerHTML).toContain(`Last Updated: `);
  });

  it("should reload page when clicked on the refreshIcon", async () => {
    init();
    const refreshIcon = await screen.findByTestId("last-updated-refresh-icon");
    expect(refreshIcon).toBeInTheDocument();

    refreshIcon.click();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it("should not render oos message when no oos values are present in the table", () => {
    init();

    const oosDivider = screen.queryByTestId("oos-divider");
    expect(oosDivider).not.toBeInTheDocument();

    const footerLink = screen.queryByTestId("footer-body-text-link");
    expect(footerLink).not.toBeInTheDocument();
  });

  it("should render oos message when oos values are present in the table", () => {
    init(true);

    const oosDivider = screen.queryByTestId("oos-divider");
    expect(oosDivider).toBeInTheDocument();

    const footerLink = screen.queryByTestId("footer-body-text-link");
    expect(footerLink).toBeInTheDocument();
  });
});
