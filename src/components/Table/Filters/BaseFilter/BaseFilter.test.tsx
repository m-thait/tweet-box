import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks";
import { Table } from "@components/Table";
import { saveUserType } from "@services/redux";
import { EsgUserType } from "@models/api.types";

jest.mock("@moodys/mdc-frontend.services.logger", () => ({
  logger: { error: jest.fn() },
}));
describe("BaseFilter Render", () => {
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

  it("should render base filter elements", async () => {
    await init();

    const baseFilterContainBox = await screen.findByTestId(
      "base-filter-container"
    );
    expect(baseFilterContainBox).toBeInTheDocument();

    const baseFilterContainer = await screen.findByTestId(
      "base-filter-list-items-container"
    );
    expect(baseFilterContainer).toBeInTheDocument();

    const baseMenuDivider = await screen.findByTestId(
      "base-filter-divider-container"
    );
    expect(baseMenuDivider).toBeInTheDocument();
  });
});
