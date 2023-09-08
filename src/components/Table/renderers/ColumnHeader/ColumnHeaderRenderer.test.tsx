import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { IHeaderParams } from "ag-grid-enterprise";
import { Column, GridApi } from "ag-grid-community";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { act } from "react-dom/test-utils";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { saveEntityCount } from "@services/redux";
import { ColumnHeaderRenderer } from "./ColumnHeaderRenderer";

let count = 0;
jest.mock("./ColumnHeaderRenderer.hooks", () => ({
  useColumnHeaderRendererEvents: jest.fn().mockImplementation(() => {
    count = count % 3;
    return {
      onSortChanged: jest.fn(),
      isRightAligned: true,
      sortOrderIndex: count++,
      sortOrder: ["desc", "asc", null],
    };
  }),
}));

describe("ColumnHeaderRenderer", () => {
  const mockDisplayName = "mock-display-name";
  const containerTestId = `column-header-renderer-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`;
  const rowCountTestId = `header-row-count-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`;
  const mockColumn = {
    getColId: () => ESGColumnFields.ORG_ISSUER_NAME.fieldName,
    isFilterActive: jest.fn().mockReturnValueOnce(() => false),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    isSortAscending: jest.fn().mockReturnValueOnce(() => true),
  } as unknown as Column;
  const mockSetSort = jest.fn();
  const mockApi = {
    getSortModel: jest.fn(),
  } as unknown as GridApi;
  const mockShowColumnMenu = jest.fn();
  const props = {
    column: mockColumn,
    displayName: mockDisplayName,
    showColumnMenu: mockShowColumnMenu,
    setSort: mockSetSort,
    api: mockApi,
  } as unknown as IHeaderParams;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with down icon", () => {
    const { render } = mockReduxStore();
    render(<ColumnHeaderRenderer {...props} />);
    expect(screen.getByTestId(containerTestId)).toBeInTheDocument();
    const arrowIcon = screen.getByTestId(
      `sort-icon-down-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`
    );
    expect(arrowIcon).toBeInTheDocument();
  });

  it("should render the correct column name and count and up icon", () => {
    const { render } = mockReduxStore();
    render(<ColumnHeaderRenderer {...props} />);
    const rowCountEle = screen.getByTestId(rowCountTestId);
    const arrowIcon = screen.getByTestId(
      `sort-icon-up-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`
    );

    expect(screen.getByText(mockDisplayName)).toBeInTheDocument();
    expect(rowCountEle).toBeInTheDocument();
    expect(arrowIcon).toBeInTheDocument();
    expect(rowCountEle).toHaveTextContent("0");
  });

  it("should render the correct count after updating entity count", async () => {
    const { render, store } = mockReduxStore();
    render(<ColumnHeaderRenderer {...props} />);
    expect(screen.getByText(mockDisplayName)).toBeInTheDocument();
    const rowCountEle = screen.getByTestId(rowCountTestId);
    expect(rowCountEle).toHaveTextContent("0");
    const arrowDownIcon = screen.queryByTestId(
      `sort-icon-down-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`
    );
    const arrowUpIcon = screen.queryByTestId(
      `sort-icon-up-${ESGColumnFields.ORG_ISSUER_NAME.fieldName}`
    );
    expect(arrowDownIcon).not.toBeInTheDocument();
    expect(arrowUpIcon).not.toBeInTheDocument();
    act(() => {
      store.dispatch(saveEntityCount("1000"));
    });

    await waitFor(() => expect(rowCountEle).toHaveTextContent("1,000"));
  });
});
