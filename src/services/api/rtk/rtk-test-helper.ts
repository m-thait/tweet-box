import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import fetchMock from "jest-fetch-mock";
import { mockReduxStore } from "@services/redux/mocks";

export const initRTK = (
  action: ThunkAction<unknown, unknown, unknown, AnyAction>,
  mockData?: unknown
) => {
  const { store } = mockReduxStore({
    loadSuccessfulAemCalls: false,
    loadSuccessfulUserTypePremiumCalls: false,
  });

  if (mockData) {
    fetchMock.mockResponse(JSON.stringify(mockData));
  } else {
    fetchMock.mockReject(new Error("Internal Server Error"));
  }
  // eslint-disable-next-line
  return store.dispatch<any>(action);
};
