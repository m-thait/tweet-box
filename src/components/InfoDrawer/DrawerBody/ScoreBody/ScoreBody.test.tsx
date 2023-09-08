import { cleanup, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import {
  ESGColumnFields,
  EsgViewComment,
} from "@moodys/mdc-table.schemas.screener";
import { mockReduxStore, commentsData } from "@services/redux/mocks";
import { ANALYST_COMMENTS_DRAWER_TYPE } from "@constants/drawer";
import { ScoreBody } from "./ScoreBody";
import * as scoreHooks from "./ScoreBody.hooks";

describe("ScoreBody", () => {
  const init = () => {
    const { render, store } = mockReduxStore({
      updatedInitialState: {
        ui: {
          drawer: {
            isDrawerOpen: true,
            drawerType: ANALYST_COMMENTS_DRAWER_TYPE,
            nodeData: {
              orgId: "100000",
              orgName: "Becton, Dickinson and Company",
              cisDate: "2021-03-26T12:47:49.000Z",
              field: "cisScore",
              value: 3,
              valueFormatted: "CIS-3",
            },
            cisAccordionData: [
              {
                titles: ["CIS-3"],
                content:
                  "For an issuer scored CIS-3 (Moderately Negative), …re pronounced compared to an issuer scored CIS-2.",
                score: 3,
                description: "Moderately Negative",
              },
            ],
            ipsAccordionData: [
              {
                titles: ["E-3", "S-3", "G-3"],
                content:
                  "Issuers or transactions with a Moderately Negative…carries overall moderately negative credit risks.",
                score: 3,
                description: "Moderately Negative",
              },
            ],
            colDef: {
              field: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
            },
          },
        },
      },
    });
    render(
      <Provider store={store}>
        <ScoreBody />
      </Provider>
    );
    return { store };
  };

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("should render all content", () => {
    const mockComment = commentsData[0];
    jest.spyOn(scoreHooks, "useGetEsgComments").mockImplementation(() => ({
      esgComments: mockComment as EsgViewComment,
      commentsLoaded: true,
      errorMessage: "",
    }));

    init();

    const name = screen.getByTestId("drawer-score-name");
    expect(name).toHaveTextContent("Becton, Dickinson and Company");

    const score = screen.getByTestId("drawer-score-formatted-score");
    expect(score).toHaveTextContent("CIS-3");

    const description = screen.getByTestId("drawer-score-description");
    expect(description).toHaveTextContent("Moderately Negative");

    const date = screen.getByTestId("drawer-score-date");
    expect(date).toHaveTextContent("Mar 26 2021");

    const analystContent = screen.getByTestId("drawer-score-analyst-content");
    expect(analystContent).toHaveTextContent(
      mockComment.cisScoreComments as string
    );
  });
  it("should render error message", () => {
    jest.spyOn(scoreHooks, "useGetEsgComments").mockImplementation(() => ({
      esgComments: null,
      commentsLoaded: true,
      errorMessage: "TEST ERROR",
    }));
    init();

    const analystContent = screen.getByTestId("drawer-score-analyst-content");
    expect(analystContent).toHaveTextContent("TEST ERROR");
  });
});
