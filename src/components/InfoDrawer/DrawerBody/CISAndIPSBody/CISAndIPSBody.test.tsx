import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import * as htmlSanitizer from "@moodys/mdc-frontend.utils.html-sanitizer";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import { AEMDrawerInfo } from "@models/aem.types";
import { mockReduxStore } from "@services/redux/mocks";
import { openDrawer } from "@services/redux";
import { CISAndIPSBody } from "./CISAndIPSBody";

describe("CISBody", () => {
  const transformHTML = jest.spyOn(htmlSanitizer, "sanitizeAndTransformHtml");
  const { render, store } = mockReduxStore();

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render CIS body and accordion for ESG_SCORES_MIS", () => {
    store.dispatch(
      openDrawer({
        isDrawerOpen: true,
        drawerType: replaceSpaceWithDash(ESGGroupNames.ESG_SCORES_MIS),
      })
    );

    const drawerInfo: AEMDrawerInfo[] = [
      {
        body: "<p>The Moody's Investors Service (MIS)</p>\n",
        title: "<p>Overview</p>\n",
      },
    ];

    render(<CISAndIPSBody data={drawerInfo} />);

    const body = screen.getByTestId("drawer-cis-ips-body");
    const header = screen.getByTestId("cis-ips-header");
    const section = screen.getByTestId("cis-ips-section");

    expect(body).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(transformHTML).toHaveBeenCalledTimes(4);
  });

  it("should render IPS body and accordion", () => {
    store.dispatch(
      openDrawer({
        isDrawerOpen: true,
        drawerType: replaceSpaceWithDash(
          ESGGroupNames.ENVIRONMENTAL_SCORES_MIS
        ),
      })
    );

    const drawerInfo: AEMDrawerInfo[] = [
      {
        body: "<p>The Moody's Investors Service (MIS)</p>\n",
        title: "<p>Overview</p>\n",
      },
    ];

    render(<CISAndIPSBody data={drawerInfo} />);

    const body = screen.getByTestId("drawer-cis-ips-body");
    const header = screen.getByTestId("cis-ips-header");
    const section = screen.getByTestId("cis-ips-section");

    expect(body).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(transformHTML).toHaveBeenCalledTimes(4);
  });

  it("should render IPS body and accordion for SOCIAL_SCORES_MIS", () => {
    store.dispatch(
      openDrawer({
        isDrawerOpen: true,
        drawerType: replaceSpaceWithDash(ESGGroupNames.SOCIAL_SCORES_MIS),
      })
    );

    const drawerInfo: AEMDrawerInfo[] = [
      {
        body: "<p>The Moody's Investors Service (MIS)</p>\n",
        title: "<p>Overview</p>\n",
      },
    ];

    render(<CISAndIPSBody data={drawerInfo} />);

    const body = screen.getByTestId("drawer-cis-ips-body");
    const header = screen.getByTestId("cis-ips-header");
    const section = screen.getByTestId("cis-ips-section");

    expect(body).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(transformHTML).toHaveBeenCalledTimes(4);
  });

  it("should render IPS body and accordion for GOVERNANCE_SCORES_MIS", () => {
    store.dispatch(
      openDrawer({
        isDrawerOpen: true,
        drawerType: replaceSpaceWithDash(ESGGroupNames.GOVERNANCE_SCORES_MIS),
      })
    );

    const drawerInfo: AEMDrawerInfo[] = [
      {
        body: "<p>The Moody's Investors Service (MIS)</p>\n",
        title: "<p>Overview</p>\n",
      },
    ];

    render(<CISAndIPSBody data={drawerInfo} />);

    const body = screen.getByTestId("drawer-cis-ips-body");
    const header = screen.getByTestId("cis-ips-header");
    const section = screen.getByTestId("cis-ips-section");

    expect(body).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(section).toBeInTheDocument();
    expect(transformHTML).toHaveBeenCalledTimes(4);
  });

  it("should render error message", () => {
    const drawerInfo: AEMDrawerInfo[] = [];

    render(
      <Provider store={store}>
        <CISAndIPSBody data={drawerInfo} error={new Error("fetch error")} />
      </Provider>
    );

    const errorMessage = screen.getByTestId("drawer-body-error");
    expect(errorMessage).toBeInTheDocument();

    const body = screen.queryByTestId("drawer-cis-ips-body");
    expect(body).not.toBeInTheDocument();
  });
});
