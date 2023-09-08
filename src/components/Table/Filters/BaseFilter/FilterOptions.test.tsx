import { render, screen } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import {
  BaseFilterOption,
  FilterListOptionsProps,
} from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { renderFilterOptions } from "@components/Table/Filters/BaseFilter/FilterOptions";

const scoreFilter: BaseFilterOption = {
  score: 5,
  value: "5",
  label: "CIS-5",
  fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
};
const handleChange = jest.fn();

const ratingActionFilter: BaseFilterOption = {
  value: "0",
  fieldName: ESGColumnFields.LT_RATING_LAST_ACTION.fieldName,
};

describe("Filter Options Render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const init = (filterListOptionsObj: FilterListOptionsProps) => {
    return render(renderFilterOptions(filterListOptionsObj));
  };
  it("should render filter options elements", () => {
    const filterListOptionsObj: FilterListOptionsProps = {
      filter: scoreFilter,
      index: 5,
      selectedIndices: [null],
      handleChange,
      lockedOrgIds: [645646],
      fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      filterSortOrder: "",
    };
    init(filterListOptionsObj);
    const renderFilterOptionsContainer = screen.getByTestId(
      `base-filter-render-filter-options-container-${filterListOptionsObj.index}`
    );
    expect(renderFilterOptionsContainer).toBeInTheDocument();

    const renderFilterOptionsCheckbox = screen.getByTestId(
      `base-filter-checkbox-${filterListOptionsObj.index}`
    );
    expect(renderFilterOptionsCheckbox).toBeInTheDocument();

    const renderFilterOptionsName = screen.getByTestId(
      `base-filter-name-${filterListOptionsObj.index}`
    );
    expect(renderFilterOptionsName).toBeInTheDocument();

    const renderFilterOptionsListItem = screen.getByTestId(
      `base-filter-render-list-item-${filterListOptionsObj.index}`
    );
    expect(renderFilterOptionsListItem).toBeInTheDocument();
  });
  it("should render null if filter value is 0", () => {
    const filterListOptionsObj: FilterListOptionsProps = {
      filter: ratingActionFilter,
      index: 5,
      selectedIndices: [null],
      handleChange,
      lockedOrgIds: [645646],
      fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
      filterSortOrder: "",
    };
    init(filterListOptionsObj);

    const renderFilterOptionsListItem = screen.queryByTestId(
      `base-filter-render-list-item-${filterListOptionsObj.index}`
    );
    const filterOptionsObjectNull = screen.getByTestId(
      "filter-options-object-null"
    );

    expect(renderFilterOptionsListItem).not.toBeInTheDocument();
    expect(filterOptionsObjectNull).toBeInTheDocument();
  });
});
