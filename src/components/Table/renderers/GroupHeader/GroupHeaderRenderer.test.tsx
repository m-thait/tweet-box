import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { ColumnGroup } from "ag-grid-community";
import { IHeaderGroupParams } from "ag-grid-enterprise";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import { screenerIIcon } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { GroupHeader } from "./GroupHeaderRenderer";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );

  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("GroupHeader", () => {
  const getOneChild = () => ["child"];
  const getMultipleChildren = () => ["child", "child"];
  const mockColumnGroupSingle = {
    getGroupId: () => "id",
    getProvidedColumnGroup: () => {
      return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        isExpanded: jest.fn().mockReturnValueOnce(() => true),
      };
    },
    getLeafColumns: getOneChild,
    getPinned: jest.fn().mockReturnValueOnce(() => true),
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

  it("should not render expand icon with one column", () => {
    const { render } = mockReduxStore();
    render(<GroupHeader params={params} />);
    const expandIcon = screen.queryByTestId(`group-header-icon`);
    expect(expandIcon).not.toBeInTheDocument();
  });

  it("should render expand icon with one column and isFirstGroup", () => {
    const { render } = mockReduxStore();
    render(<GroupHeader params={params} isFirstGroup />);
    const expandIcon = screen.queryByTestId(`group-header-icon`);
    expect(expandIcon).toBeInTheDocument();
  });

  it("should render expand icon with multiple columns", () => {
    const { render } = mockReduxStore();
    render(
      <GroupHeader
        params={{ ...params, columnGroup: mockColumnGroupMultiple }}
      />
    );
    const expandIcon = screen.queryByTestId(`group-header-icon`);
    expect(expandIcon).toBeInTheDocument();
  });

  it("should render info icon", () => {
    const { render } = mockReduxStore();
    params.displayName = ESGGroupNames.ESG_SCORES_MIS;
    render(<GroupHeader params={params} />);
    const infoButton = screen.queryByTestId(`info-icon-id`);
    expect(infoButton).toBeInTheDocument();
  });

  it("should emit avo analytics when info button is clicked", () => {
    const { render } = mockReduxStore();
    params.displayName = ESGGroupNames.ESG_SCORES_MIS;
    render(<GroupHeader params={params} />);
    const infoIcon = screen.getByTestId(`info-icon-id`);
    fireEvent.click(infoIcon);
    expect(jest.isMockFunction(emitAnalyticsEvent)).toBeTruthy();
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: { ...defaultEventDetails, name: "id" },
      fn: screenerIIcon,
    });
  });
});
