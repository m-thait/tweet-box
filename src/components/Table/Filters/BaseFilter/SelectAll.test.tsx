import { render, screen } from "@testing-library/react";
import React from "react";
import { SelectAll } from "@components/Table/Filters/BaseFilter/SelectAll";

const selectedIndices = [""];
const handleSelectAllChange = jest.fn();
const selectAll = false;

describe("Select all render", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const init = (
    filteredValues: (string | null | undefined)[],
    selectedIndices: (string | null | undefined)[],
    handleSelectAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    selectAll: boolean
  ) => {
    return render(
      <SelectAll
        filteredValues={filteredValues}
        selectedIndices={selectedIndices}
        handleSelectAllChange={handleSelectAllChange}
        selectAll={selectAll}
      />
    );
  };
  it("should render all select all elements if list of filtered values is greater than 0", () => {
    const filteredValues = ["65"];

    init(filteredValues, selectedIndices, handleSelectAllChange, selectAll);

    const renderSelectAllContainer = screen.getByTestId(
      `base-filter-checkbox-select-all-container`
    );
    expect(renderSelectAllContainer).toBeInTheDocument();

    const renderSelectAllCheckbox = screen.getByTestId(
      `base-filter-checkbox-select-all`
    );
    expect(renderSelectAllCheckbox).toBeInTheDocument();

    const renderSelectAll = screen.getByTestId(`base-filter-select-all`);
    expect(renderSelectAll).toBeInTheDocument();
  });
  it("should render 'No Matches' if list of filtered values is less than 0", () => {
    const filteredValues: (string | null | undefined)[] = [];

    init(filteredValues, selectedIndices, handleSelectAllChange, selectAll);

    const renderSelectAllNoMatches = screen.getByTestId(`no-matches-text`);
    expect(renderSelectAllNoMatches).toBeInTheDocument();
  });
});
