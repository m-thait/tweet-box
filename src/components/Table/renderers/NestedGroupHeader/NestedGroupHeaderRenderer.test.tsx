import React from "react";
import { screen } from "@testing-library/react";
import { ColumnGroup } from "ag-grid-community";
import { IHeaderGroupParams } from "ag-grid-enterprise";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { NestedGroupHeader } from "./NestedGroupHeaderRenderer";

describe("NestedGroupHeader", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const getOneChild = () => ["child"];
  const getMultipleChildren = () => ["child", "child"];
  const mockColumnGroupSingle = {
    getGroupId: () => "groupId",
    getProvidedColumnGroup: () => {
      return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        isExpanded: jest.fn().mockReturnValueOnce(() => false),
      };
    },
    getLeafColumns: getOneChild,
  } as unknown as ColumnGroup;

  const mockColumnGroupMultiple = {
    ...mockColumnGroupSingle,
    getLeafColumns: getMultipleChildren,
  } as unknown as ColumnGroup;

  const params = {
    columnGroup: mockColumnGroupSingle,
    displayName: "title",
    setExpanded: jest.fn(),
    api: null,
    columnApi: null,
    context: null,
  } as unknown as IHeaderGroupParams;

  it("should not render icons with one column", () => {
    const { render } = mockReduxStore();
    render(<NestedGroupHeader params={params} />);
    const expandIcon = screen.queryByTestId(`group-header-groupId-expanded`);
    const collapsedIcon = screen.queryByTestId(
      `group-header-groupId-collapsed`
    );
    expect(expandIcon).not.toBeInTheDocument();
    expect(collapsedIcon).not.toBeInTheDocument();
  });

  it("should render collapsed icon with multiple columns", () => {
    const { render } = mockReduxStore();
    render(
      <NestedGroupHeader
        params={{ ...params, columnGroup: mockColumnGroupMultiple }}
      />
    );
    const collapsedIcon = screen.queryByTestId(
      `group-header-groupId-collapsed`
    );
    expect(collapsedIcon).toBeInTheDocument();
  });
});
