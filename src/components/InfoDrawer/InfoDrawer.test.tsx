import React from "react";
import { screen, cleanup, act } from "@testing-library/react";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import { openDrawer } from "@services/redux";
import { mockReduxStore } from "@services/redux/mocks/mockStore";
import {
  CIS_HEADER_TEXT,
  IPS_HEADER_TEXT,
  ANALYST_COMMENTS_DRAWER_TYPE,
  SCORE_COMMENTS_HEADER_TEXT,
} from "@constants/drawer";

import { InfoDrawer } from "./InfoDrawer";

describe("InfoDrawer", () => {
  const { render, store } = mockReduxStore({});

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render component CIS Drawer", () => {
    render(<InfoDrawer />);

    act(() => {
      store.dispatch(
        openDrawer({
          isDrawerOpen: true,
          drawerType: replaceSpaceWithDash(ESGGroupNames.ESG_SCORES_MIS),
        })
      );
    });

    const drawerTitleComponent = screen.getByText(CIS_HEADER_TEXT);
    expect(drawerTitleComponent).toBeInTheDocument();
  });

  it("should render component IPS Drawer", () => {
    render(<InfoDrawer />);

    act(() => {
      store.dispatch(
        openDrawer({
          isDrawerOpen: true,
          drawerType: replaceSpaceWithDash(
            ESGGroupNames.ENVIRONMENTAL_SCORES_MIS
          ),
        })
      );
    });

    const drawerTitleComponent = screen.getByText(IPS_HEADER_TEXT);
    expect(drawerTitleComponent).toBeInTheDocument();
  });

  it("should render component ScoreBody Drawer", () => {
    render(<InfoDrawer />);

    act(() => {
      store.dispatch(
        openDrawer({
          isDrawerOpen: true,
          drawerType: ANALYST_COMMENTS_DRAWER_TYPE,
          nodeData: {
            orgId: 100000,
            orgName: "Becton, Dickinson and Company",
            cisDate: "2021-03-26T12:47:49.000Z",
            field: "cisScore",
            value: 3,
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
        })
      );
    });

    const drawerTitleComponent = screen.getByText(SCORE_COMMENTS_HEADER_TEXT);
    expect(drawerTitleComponent).toBeInTheDocument();
  });
});
