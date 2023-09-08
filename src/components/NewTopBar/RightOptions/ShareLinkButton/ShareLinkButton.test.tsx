import React from "react";
import { fireEvent, screen, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  AnalyticsEvent,
  emitAnalyticsEvent,
} from "@moodys/mdc-frontend.services.analytics";
import {
  AVO_FAILED,
  AVO_SUCCESS,
  defaultEventDetails,
} from "@services/analytics/avoConstants";
import { saveFilterModel } from "@services/redux";
import { mockReduxStore } from "@services/redux/mocks";
import * as api from "@services/api";
import { screenerCustomUrl } from "@services/analytics/Avo";
import { ShareLinkButton } from "./ShareLinkButton";

jest.mock("@moodys/mdc-frontend.services.analytics", () => {
  const actualAnalytics = jest.requireActual(
    "@moodys/mdc-frontend.services.analytics"
  );
  return {
    ...actualAnalytics,
    emitAnalyticsEvent: jest.fn(),
  };
});

jest.mock("@services/api", () => {
  const actualApi = jest.requireActual("@services/api");
  return {
    ...actualApi,
    saveShareLinkFilterModel: jest.fn(),
  };
});

jest.mock("copy-to-clipboard", () => {
  return jest.fn();
});

describe("ShareLinkButton", () => {
  const { store, RESET_ACTION, render } = mockReduxStore();
  const init = (enableButton = true) => {
    if (enableButton) {
      store.dispatch(
        saveFilterModel({
          orgId: {
            filterType: "set",
            values: ["1111", "2222"],
          },
        })
      );
    } else {
      store.dispatch(saveFilterModel({}));
    }
    render(
      <Provider store={store}>
        <ShareLinkButton />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch(RESET_ACTION);
  });

  it("should render new button and no popover", () => {
    init();

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-share-link-button-container"
    );
    const popoverEle = screen.queryByTestId("share-link-popover");

    expect(newBtnEleContainer).toBeInTheDocument();
    expect(popoverEle).not.toBeInTheDocument();
  });

  it("should disable the button if no filters are applied", () => {
    init(false);

    const newBtnElement = screen.getByTestId("top-bar-share-link-button");
    const popoverEle = screen.queryByTestId("share-link-popover");

    expect(newBtnElement).toBeInTheDocument();
    expect(newBtnElement).toBeDisabled();
    expect(popoverEle).not.toBeInTheDocument();
  });

  it("hovering on button should open popover, message should indicate you can get a share link", () => {
    init();

    const newBtnEleContainer = screen.getByTestId(
      "top-bar-share-link-button-container"
    );
    expect(newBtnEleContainer).toBeInTheDocument();

    const newBtnEle = screen.getByTestId("top-bar-share-link-button");
    expect(newBtnEle).toBeEnabled();

    fireEvent.mouseOver(newBtnEleContainer);

    const popoverEle = screen.getByTestId("share-link-popover");
    expect(popoverEle).toBeInTheDocument();
    const text = screen.getByTestId("share-link-popover-text");
    expect(text).toHaveTextContent("Share link to the current view");
  });

  it("loader should appear while getting share link is in progress and disappear when complete and snack bar should be present", async () => {
    init();
    const spy = jest
      .spyOn(api, "saveShareLinkFilterModel")
      .mockReturnValue(Promise.resolve("813086b3-3081-4859-9321-2a4996142b6f"));
    const newBtnEle = screen.getByTestId("top-bar-share-link-button");
    expect(newBtnEle).toBeEnabled();
    fireEvent.click(newBtnEle);
    const loaderEle = screen.getByTestId("top-bar-share-link-loading-spinner");
    expect(loaderEle).toBeInTheDocument();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3500));
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(loaderEle).not.toBeInTheDocument();
    const snackbar = screen.getByTestId("top-bar-share-link-snackbar-success");
    expect(snackbar).toBeInTheDocument();
  });

  it("error snackbar opens when share link has an error", async () => {
    init();
    const spy = jest
      .spyOn(api, "saveShareLinkFilterModel")
      .mockRejectedValueOnce(new Error());
    const newBtnEle = screen.getByTestId("top-bar-share-link-button");
    expect(newBtnEle).toBeEnabled();
    fireEvent.click(newBtnEle);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    expect(spy).toHaveBeenCalledTimes(1);
    const snackbar = screen.getByTestId("top-bar-share-link-snackbar-error");
    expect(snackbar).toBeInTheDocument();
  });

  it("should fire sucess avo event when link is created", async () => {
    init();
    const spy = jest
      .spyOn(api, "saveShareLinkFilterModel")
      .mockReturnValue(Promise.resolve("813086b3-3081-4859-9321-2a4996142b6f"));
    const newBtnEle = screen.getByTestId("top-bar-share-link-button");
    fireEvent.click(newBtnEle);
    await waitFor(async () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: {
        ...defaultEventDetails,
        depth: "1.00",
        id: AVO_SUCCESS,
      },
      fn: screenerCustomUrl,
    });
  });

  it("should fire fail avo event when link is created", async () => {
    init();
    const spy = jest
      .spyOn(api, "saveShareLinkFilterModel")
      .mockRejectedValueOnce(new Error());
    const newBtnEle = screen.getByTestId("top-bar-share-link-button");
    expect(newBtnEle).toBeEnabled();
    fireEvent.click(newBtnEle);
    await waitFor(async () => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    expect(emitAnalyticsEvent).toHaveBeenCalledWith(AnalyticsEvent.AvoEvent, {
      eventDetails: {
        ...defaultEventDetails,
        id: AVO_FAILED,
        depth: "1.00",
      },
      fn: screenerCustomUrl,
    });
  });
});
