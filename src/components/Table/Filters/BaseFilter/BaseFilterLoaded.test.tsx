import { render, screen } from "@testing-library/react";
import React from "react";
import {
  ESGColumnFields,
  FilterSortOrder,
} from "@moodys/mdc-table.schemas.screener";
import { BaseFilterLoaded } from "@components/Table/Filters/BaseFilter/BaseFilterLoaded";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter/BaseFilter.types";

const filteredValues = ["65"];
const selectedIndices = [""];
const createBaseFilterObj = undefined;
const handleChange = jest.fn();
const lockedOrgIds = undefined;
describe("BaseFilterLoaded render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const init = (
    fieldName: string | undefined,
    filteredValues: (string | null | undefined)[],
    selectedIndices: (string | null | undefined)[],
    createBaseFilterObjProp: BaseFilterOption[] | undefined,
    handleChange: (checked: boolean, id: string) => void,
    lockedOrgIds: number[] | undefined,
    filterSortOrder?: FilterSortOrder | string,
    setColorForFieldsProp?: (
      filter: BaseFilterOption,
      filterSortOrder: FilterSortOrder | string
    ) => string
  ) => {
    return render(
      <BaseFilterLoaded
        fieldName={fieldName}
        filteredValues={filteredValues}
        selectedIndices={selectedIndices}
        createBaseFilterObjProp={createBaseFilterObjProp}
        handleChange={handleChange}
        lockedOrgIds={lockedOrgIds}
        filterSortOrder={filterSortOrder}
        setColorForFieldsProp={setColorForFieldsProp}
        setInfiniteScroll={true}
        infiniteScrollFields={[ESGColumnFields.ORG_ISSUER_NAME.fieldName]}
      />
    );
  };
  it("should render the base filter loaded container", () => {
    const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
    init(
      fieldName,
      filteredValues,
      selectedIndices,
      createBaseFilterObj,
      handleChange,
      lockedOrgIds
    );

    const renderBaseFilterLoadedContainer = screen.getByTestId(
      `base-filter-loaded-container`
    );
    expect(renderBaseFilterLoadedContainer).toBeInTheDocument();
  });
  it("should render infinite scroll if field name is in InfiniteScrollFields", () => {
    const fieldName = ESGColumnFields.ORG_ISSUER_NAME.fieldName;
    init(
      fieldName,
      filteredValues,
      selectedIndices,
      createBaseFilterObj,
      handleChange,
      lockedOrgIds
    );

    const renderBaseFilterInfiniteScrollContainer = screen.getByTestId(
      `base-filter-loaded-infinite-scroll-container`
    );
    expect(renderBaseFilterInfiniteScrollContainer).toBeInTheDocument();
  });
  it("should render filter options container if field name is not in InfiniteScrollFields", () => {
    const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
    init(
      fieldName,
      filteredValues,
      selectedIndices,
      createBaseFilterObj,
      handleChange,
      lockedOrgIds
    );

    const renderBaseFilterOptionsContainer = screen.getByTestId(
      `base-filter-loaded-render-filter-options-container`
    );
    expect(renderBaseFilterOptionsContainer).toBeInTheDocument();
  });
});
