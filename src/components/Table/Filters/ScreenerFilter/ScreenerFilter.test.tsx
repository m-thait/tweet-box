import { fireEvent, screen } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import React from "react";
import { Table } from "@components/Table";
import { mockReduxStore } from "@services/redux/mocks";
import { saveUserType } from "@services/redux";
import { EsgUserType } from "@models/api.types";

jest.mock("@moodys/mdc-frontend.services.logger", () => ({
  logger: { error: jest.fn() },
}));

describe("ScreenerFilter Render", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const CREDIT_IMPACT_SCORE_FIELD =
    ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;

  const init = async () => {
    const { render, store } = mockReduxStore();
    store.dispatch(saveUserType(EsgUserType.ESG_PREMIUM));
    render(<Table />);
    const header = screen.getByTestId(
      `column-header-renderer-${CREDIT_IMPACT_SCORE_FIELD}`
    );

    fireEvent.mouseOver(header);

    const columnButton = screen.getByTestId(
      `menu-icon-${CREDIT_IMPACT_SCORE_FIELD}`
    );

    fireEvent.click(columnButton);
  };

  it("should render screener filter elements", async () => {
    await init();
    jest.setTimeout(3000);

    const screenerContainBox = await screen.findByTestId(
      "base-filter-container"
    );
    expect(screenerContainBox).toBeInTheDocument();

    const screenerFilterContainer = screen.getByTestId(
      "base-filter-list-items-container"
    );
    expect(screenerFilterContainer).toBeInTheDocument();

    const screenerMenuDivider = screen.getByTestId(
      "base-filter-divider-container"
    );
    expect(screenerMenuDivider).toBeInTheDocument();

    const screenerResetButton = screen.getByTestId("base-filter-reset-button");
    expect(screenerResetButton).toBeInTheDocument();
  });
});
