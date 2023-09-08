import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { Provider } from "react-redux";
import { BLANK_SPACES, UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import { mockReduxStore } from "@services/redux/mocks";
import { LIST_MEDIAN_LABEL } from "@constants/table";
import { screenerScoreCommentOpened } from "@services/analytics/Avo";
import { defaultEventDetails } from "@services/analytics/avoConstants";
import { ScoreCellRenderer, ScoreCellRendererProps } from "./ScoreCellRenderer";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );

  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});
const scoreCellNodeData = {
  orgId: "702550",
  orgNam: "AT&T",
  cisDate: "2022-05-27 23:49:15",
  field: "cisScore",
  cisScoreComments: 1,
  value: 3,
};

const subFactorScoreCellNodeData = {
  orgId: "702550",
  orgNam: "AT&T",
  cisDate: "2022-05-27 23:49:15",
  field: "environmentalWaterManagement",
  environmentalWaterManagementComments: 1,
  value: 3,
};

let spyOnDispatch: jest.SpyInstance;
describe("ScoreCellRenderer", () => {
  const init = (
    props:
      | ScoreCellRendererProps
      | (JSX.IntrinsicAttributes & ScoreCellRendererProps)
  ) => {
    const {
      node: { data = {} },
    } = props;
    const { render, store } = mockReduxStore({
      updatedInitialState: {
        ui: {
          drawer: {
            isDrawerOpen: true,
            nodeData: data,
          },
        },
      },
    });
    spyOnDispatch = jest.spyOn(store, "dispatch");
    render(
      <Provider store={store}>
        <ScoreCellRenderer {...props} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it("RegularCell: should render formatted score value", () => {
    const props = {
      value: 2,
      valueFormatted: "CIS-2",
      rowIndex: 2,
      column: {
        getColId: () => ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      },
      node: {
        data: scoreCellNodeData,
      },
    } as ScoreCellRendererProps;
    init(props);
    const ctaScoreCell = screen.getByTestId("score-cell-row-2");
    expect(ctaScoreCell).toHaveTextContent("CIS-2");
  });

  it("RegularCell: should render value if valueFormatted is null", () => {
    const props = {
      value: "5",
      valueFormatted: null,
      rowIndex: 6,
      column: {
        getColId: () => ESGColumnFields.CTA_SCORE.fieldName,
      },
      node: {
        data: scoreCellNodeData,
      },
    } as ScoreCellRendererProps;
    init(props);
    const ctaScoreCell = screen.getByTestId("score-cell-row-6");
    expect(ctaScoreCell).toHaveTextContent("5");
  });

  it("RegularCell: should render blanks from '0' value", () => {
    const props = {
      value: 0,
      valueFormatted: BLANK_SPACES,
      rowIndex: 3,
      column: {
        getColId: () => ESGColumnFields.CTA_SCORE.fieldName,
      },
      node: {
        data: {
          ...scoreCellNodeData,
          value: 0,
        },
      },
    } as ScoreCellRendererProps;
    init(props);
    const ctaScoreCell = screen.getByTestId("score-cell-row-3");
    expect(ctaScoreCell).toHaveTextContent(BLANK_SPACES);
  });

  it("RegularCell: calls onClick handler when comment is available", () => {
    const props = {
      value: 2,
      valueFormatted: "CIS-2",
      rowIndex: 2,
      column: {
        getColId: () => ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      },
      node: {
        data: scoreCellNodeData,
      },
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(`score-cell-row-${props.rowIndex}`);
    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
    expect(jest.isMockFunction(emitAnalyticsEvent)).toBeTruthy();
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: {
        ...defaultEventDetails,
        name: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      },
      fn: screenerScoreCommentOpened,
    });
  });

  it("RegularCell: calls onClick handler when comment is not available", () => {
    const props = {
      value: 2,
      valueFormatted: "CIS-2",
      rowIndex: 2,
      column: {
        getColId: () => ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      },
      node: {
        data: {
          ...scoreCellNodeData,
          cisScoreComments: 0,
        },
      },
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(`score-cell-row-${props.rowIndex}`);
    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
  });

  it("RegularCell: does not call onClick hanlder on list median row", () => {
    const props = {
      value: 2,
      valueFormatted: "CIS-2",
      rowIndex: 0,
      column: {
        getColId: () => ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      },
      node: {
        data: {
          ...scoreCellNodeData,
          orgName: LIST_MEDIAN_LABEL,
          cisScoreComments: 0,
        },
      },
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(`score-cell-row-${props.rowIndex}`);
    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(0);
  });

  it("SubFactorCells: should display oos formatted text if value is 'oos'", () => {
    const params = {
      value: UNAUTHORIZED_BLANKS,
      valueFormatted: undefined,
      rowIndex: 1,
      column: {
        getColId: () => ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      node: {
        data: subFactorScoreCellNodeData,
      },
      isSubFactorCell: true,
    } as ScoreCellRendererProps;
    init(params);
    const formatted = screen.getByTestId("oos-1");
    expect(formatted).toBeInTheDocument();
  });

  it("SubFactorCells: should not display oos formatted text if value is not 'oos'", () => {
    const params = {
      value: 4,
      valueFormatted: "4",
      rowIndex: 1,
      column: {
        getColId: () => ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      node: {
        data: subFactorScoreCellNodeData,
      },
      isSubFactorCell: true,
    } as ScoreCellRendererProps;
    init(params);
    const formatted = screen.queryByTestId("oos-1");
    expect(formatted).not.toBeInTheDocument();
  });

  it("SubFactorCells: calls onClick handler when field has a comment", () => {
    const props = {
      value: 2,
      valueFormatted: "2",
      rowIndex: 2,
      column: {
        getColId: () => ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      node: {
        data: subFactorScoreCellNodeData,
      },
      isSubFactorCell: true,
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(
      `sub-factor-score-cell-row-${props.rowIndex}`
    );

    const commentIcon = screen.getByTestId(
      `sub-factor-score-cell-row-${props.rowIndex}-icon`
    );
    expect(commentIcon).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(1);
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: {
        ...defaultEventDetails,
        name: ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      fn: screenerScoreCommentOpened,
    });
  });

  it("SubFactorCells: does not call onClick handler when field does not have a comment", () => {
    const props = {
      value: 2,
      valueFormatted: "2",
      rowIndex: 2,
      column: {
        getColId: () => ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      node: {
        data: {
          ...subFactorScoreCellNodeData,
          environmentalWaterManagementComments: 0,
        },
      },
      isSubFactorCell: true,
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(
      `sub-factor-score-cell-row-${props.rowIndex}`
    );
    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(0);
  });

  it("SubFactorCells: does not call onClick hanlder on list median row", () => {
    const props = {
      value: 2,
      valueFormatted: "2",
      rowIndex: 0,
      column: {
        getColId: () => ESGColumnFields.ENV_WATER_MANAGEMENT.fieldName,
      },
      node: {
        data: {
          ...subFactorScoreCellNodeData,
          orgName: LIST_MEDIAN_LABEL,
        },
      },
      isSubFactorCell: true,
    } as ScoreCellRendererProps;
    init(props);
    const trigger = screen.getByTestId(
      `sub-factor-score-cell-row-${props.rowIndex}`
    );
    fireEvent.click(trigger);
    expect(spyOnDispatch).toHaveBeenCalledTimes(0);
  });
});
