// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react";
import { TextEncoder } from "util";
import { LicenseManager } from "ag-grid-enterprise";
import fetchMock from "jest-fetch-mock";

LicenseManager.setLicenseKey(process.env?.REACT_APP_AG_GRID_LICENSE ?? "");
fetchMock.enableMocks();

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

// since `facets.utils` access the store directly, the function need to be mocked for tests that use `mockReduxStore`
jest.mock("@services/api/rtk/taxonomy/facets.utils", () => ({
  getFacets: jest.fn(),
}));

global.TextEncoder = TextEncoder;
