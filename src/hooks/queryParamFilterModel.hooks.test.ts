import { cleanup } from "@testing-library/react";
import { mockReduxStore, mockTaxonomyStoreState } from "@services/redux/mocks";
import { AgGridFilterType } from "@models/table.types";
import { useQueryParameterFilterModel } from "./queryParamFilterModel.hooks";

describe("useQueryParameterFilterModel", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const init = (query?: Record<string, string>) => {
    jest
      .spyOn(URLSearchParams.prototype, "get")
      .mockImplementation((name: string) => (query ? query[name] : null));

    const { renderHook } = mockReduxStore({
      updatedInitialState: mockTaxonomyStoreState.goodResponse,
      loadSuccessfulTaxonomyCalls: true,
    });
    const { result, rerender } = renderHook(() =>
      useQueryParameterFilterModel()
    );
    return { result, rerender };
  };

  describe("Based On Sector Query Param", () => {
    it("should not set a filter model if no query paramter is provided", async () => {
      const { result } = init();
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(presetFilterModel).toBe(undefined);
    });

    it("should not set a filter model if bad query paramter is provided", async () => {
      const { result } = init({
        sector: "BadSector",
      });
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(presetFilterModel).toBe(undefined);
    });

    it("should set Corporates filter model if Corporates query paramter is provided", async () => {
      const { result } = init({
        sector: "corporates",
      });
      expect(result.current.isSuccess).toBe(true);
      const presetFilterModel = result.current.filterModel;
      expect(presetFilterModel?.subSector.values.length).toBe(186);
    });

    it("should set Sovereigns filter model if Sovereigns query paramter is provided", () => {
      const { result } = init({
        sector: "sovereign-and-supranational",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toStrictEqual({
        subSector: {
          filterType: AgGridFilterType.SET,
          values: [
            "Sovereign_and_Supranational",
            "Sovereign_sov",
            "Supranational_Sovereigns",
            "Central_Government_Agency",
          ],
        },
      });
    });
  });

  describe("Based On Country Query Param", () => {
    it("should not set a filter model if no query paramter is provided", () => {
      const { result } = init();
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toBe(undefined);
    });

    it("should not set a filter model if bad query paramter is provided", () => {
      const { result } = init({
        country: "BadCountry",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toBe(undefined);
    });

    it("should set Asia Pacific filter model if asia-pacific query paramter is provided", () => {
      const { result } = init({
        country: "asia-pacific",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toStrictEqual({
        country: {
          filterType: "set",
          values: [
            "Asia_Pacific",
            "Asia_reg",
            "Taiwan",
            "Uzbekistan",
            "Japan",
            "Laos",
            "Timore-Leste",
            "Kazakhstan",
            "Mongolia",
            "Nepal",
            "India",
            "Vietnam",
            "Macao",
            "Malaysia",
            "China",
            "Thailand",
            "Turkmenistan",
            "Christmas_Island",
            "Cocos_Islands",
            "Afghanistan",
            "Pakistan",
            "Hong_Kong",
            "Cambodia",
            "Bhutan",
            "Kyrgyzstan",
            "Maldives",
            "Philippines",
            "Brunei_Darussalam",
            "Bangladesh",
            "Singapore",
            "Sri_Lanka",
            "Myanmar",
            "Armenia",
            "Azerbaijan",
            "Georgia_wa",
            "South_Korea",
            "Indonesia",
            "North_Korea",
            "Tajikistan",
            "BIOT",
            "New_Zealand",
            "Pacific_Islands",
            "Micronesia",
            "New_Caledonia",
            "Norfolk_Island",
            "Cook_Islands",
            "Papua_New_Guinea",
            "Solomon_Islands",
            "Fiji",
            "Vanuatu",
            "Kiribati",
            "Polynesia",
            "Tonga",
            "Palau",
            "Samoa",
            "Guam",
            "Melanesia",
            "Marshall_Islands",
            "Northern_Mariana_Islands",
            "Australia",
          ],
        },
      });
    });

    it("should set United States filter model if united-states query paramter is provided", () => {
      const { result } = init({
        country: "united-states",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toStrictEqual({
        country: {
          filterType: AgGridFilterType.SET,
          values: ["United_States"],
        },
      });
    });
  });

  describe("Based On Region Query Param", () => {
    it("should not set a filter model if no query paramter is provided", () => {
      const { result } = init();
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toBe(undefined);
    });

    it("should not set a filter model if bad query paramter is provided", () => {
      const { result } = init({
        region: "BadRegion",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toBe(undefined);
    });

    it("should set Asia Pacific filter model if asia-pacific query paramter is provided", () => {
      const { result } = init({
        region: "asia-pacific",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toStrictEqual({
        country: {
          filterType: "set",
          values: [
            "Asia_Pacific",
            "Asia_reg",
            "Taiwan",
            "Uzbekistan",
            "Japan",
            "Laos",
            "Timore-Leste",
            "Kazakhstan",
            "Mongolia",
            "Nepal",
            "India",
            "Vietnam",
            "Macao",
            "Malaysia",
            "China",
            "Thailand",
            "Turkmenistan",
            "Christmas_Island",
            "Cocos_Islands",
            "Afghanistan",
            "Pakistan",
            "Hong_Kong",
            "Cambodia",
            "Bhutan",
            "Kyrgyzstan",
            "Maldives",
            "Philippines",
            "Brunei_Darussalam",
            "Bangladesh",
            "Singapore",
            "Sri_Lanka",
            "Myanmar",
            "Armenia",
            "Azerbaijan",
            "Georgia_wa",
            "South_Korea",
            "Indonesia",
            "North_Korea",
            "Tajikistan",
            "BIOT",
            "New_Zealand",
            "Pacific_Islands",
            "Micronesia",
            "New_Caledonia",
            "Norfolk_Island",
            "Cook_Islands",
            "Papua_New_Guinea",
            "Solomon_Islands",
            "Fiji",
            "Vanuatu",
            "Kiribati",
            "Polynesia",
            "Tonga",
            "Palau",
            "Samoa",
            "Guam",
            "Melanesia",
            "Marshall_Islands",
            "Northern_Mariana_Islands",
            "Australia",
          ],
        },
      });
    });

    it("should set United States filter model if united-states query paramter is provided", () => {
      const { result } = init({
        region: "united-states",
      });
      const presetFilterModel = result.current.filterModel;
      expect(result.current.isSuccess).toBe(true);
      expect(presetFilterModel).toStrictEqual({
        country: {
          filterType: AgGridFilterType.SET,
          values: ["United_States"],
        },
      });
    });
  });
});
