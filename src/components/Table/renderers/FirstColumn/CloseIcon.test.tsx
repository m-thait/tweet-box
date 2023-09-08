import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { ICellRendererParams, GridApi } from "ag-grid-enterprise";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { mockReduxStore } from "@services/redux/mocks";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { screenerRemoveEntity } from "@services/analytics/Avo";
import { FirstColumnRenderer } from "./FirstColumnRenderer";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

describe("CloseIcon", () => {
  const { render } = mockReduxStore({});

  const mockElement = document.createElement("div");
  const mock = jest.fn().mockImplementation(() => {
    return [{ data: { orgName: "Mock Organization" } }];
  });
  const mockFilterModel = jest.fn().mockImplementation(() => {
    return {
      orgName: { values: ["LMock Organization"] },
    };
  });
  const mockSetFilterModel = jest.fn().mockImplementation(() => {
    return {
      orgName: { values: [] },
    };
  });
  const props = {
    value: "Mock Organization",
    rowIndex: 1,
    eGridCell: mockElement as HTMLElement,
    data: { orgId: "org", orgName: "orgName" },
    api: {
      getSelectedNodes: mock,
      getFilterModel: mockFilterModel,
      setFilterModel: mockSetFilterModel,
    } as Partial<GridApi>,
  } as ICellRendererParams;

  it("should not display close icon on mouse hover for pinned row", () => {
    render(
      <FirstColumnRenderer
        {...{
          ...props,
          rowIndex: 0,
          value: "List Median",
          eGridCell: {
            parentElement: {
              classList: {
                contains: () => true,
              },
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
        }}
      />
    );
    const renderer = screen.queryByTestId("first-column-renderer-0");

    expect(renderer).toBeInTheDocument();
    fireEvent.mouseOver(screen.getByText("List Median"));

    const closeIcon = screen.queryByTestId("first-column-close-icon-0");
    expect(closeIcon).not.toBeInTheDocument();
  });

  it("should display close icon on mouse hover", () => {
    render(<FirstColumnRenderer {...props} />);
    const renderer = screen.queryByTestId("first-column-renderer-1");

    expect(renderer).toBeInTheDocument();
    fireEvent.mouseOver(screen.getByText("Mock Organization"));

    const closeIcon = screen.getByTestId("first-column-close-icon-1");
    expect(closeIcon).toBeInTheDocument();
  });

  it("should remove entity row on close icon click", async () => {
    render(<FirstColumnRenderer {...props} />);

    fireEvent.mouseOver(screen.getByText("Mock Organization"));

    const row1 = screen.queryByText("Mock Organization");
    expect(row1).toBeInTheDocument();

    const closeIcon = screen.getByTestId("first-column-close-icon-1");
    fireEvent.click(closeIcon);
    setTimeout(() => {
      expect(row1).not.toBeInTheDocument();
    }, 1000);
  });

  it("should fire avo event when entity is removed", async () => {
    render(<FirstColumnRenderer {...props} />);
    fireEvent.mouseOver(screen.getByText("Mock Organization"));
    const closeIcon = screen.getByTestId("first-column-close-icon-1");
    fireEvent.click(closeIcon);
    await waitFor(() => {
      expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
        eventDetails: {
          ...defaultEventDetails,
          name: "Mock Organization",
        },
        fn: screenerRemoveEntity,
      });
    });
  });
});
