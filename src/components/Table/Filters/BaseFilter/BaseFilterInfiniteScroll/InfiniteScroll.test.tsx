import { render, screen } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import {
  BaseFilterInfiniteScrollProps,
  BaseFilterOption,
} from "@components/Table/Filters/BaseFilter/BaseFilter.types";
import { BaseFilterInfiniteScroll } from "@components/Table/Filters/BaseFilter/BaseFilterInfiniteScroll/InfiniteScroll";

const cisScoreFilter: BaseFilterOption[] = [
  {
    value: undefined,
    label: BLANK_SPACES,
    fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
  },
  {
    value: undefined,
    label: BLANK_SPACES,
    fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
  },
];
const mockSetState = jest.fn();
jest.mock("react", () => {
  const actualReact = jest.requireActual("react");

  return {
    ...actualReact,
    useState: (initial: unknown) => [initial, mockSetState],
  };
});

describe("Base Filter Infinite Scroll render", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const init = (infiniteScrollProps: BaseFilterInfiniteScrollProps) => {
    return render(BaseFilterInfiniteScroll(infiniteScrollProps));
  };

  it("should render the infinite scroll container", () => {
    const handleChange = jest.fn();
    const lockedOrgIds = undefined;
    const filterSortOrder = undefined;
    const setColorForFieldsProp = undefined;
    const fieldName = ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName;
    const filteredValues = ["65"];
    const selectedIndices = [""];

    const infiniteScrollProps: BaseFilterInfiniteScrollProps = {
      fieldName: fieldName,
      filteredValues: filteredValues,
      selectedIndices: selectedIndices,
      handleChange: handleChange,
      lockedOrgIds: lockedOrgIds,
      createBaseFilterObj: cisScoreFilter,
      filterSortOrder: filterSortOrder,
      setColorForFieldsProp: setColorForFieldsProp,
    };

    init(infiniteScrollProps);

    const renderBaseFilterInfiniteScrollContainer = screen.getByTestId(
      `base-filter-infinite-scroll-container`
    );

    expect(renderBaseFilterInfiniteScrollContainer).toBeInTheDocument();
  });
});
