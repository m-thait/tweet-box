import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { SearchBox } from "./SearchBox";

describe("SearchBox", () => {
  it("should render search box", () => {
    render(<SearchBox onChange={() => undefined} />);

    const searchBox = screen.getByTestId("tree-select-search-box");
    expect(searchBox).toBeInTheDocument();
  });

  it("should return search text on change event", () => {
    let searchText = "";
    const onChangeEvent = (text: string) => {
      searchText = text;
    };
    render(<SearchBox onChange={onChangeEvent} />);

    const searchBoxInput = screen.getByTestId("tree-select-search-box-input");
    expect(searchBoxInput).toBeInTheDocument();

    fireEvent.change(searchBoxInput, { target: { value: "hello world" } });
    expect(searchText).toBe("hello world");
  });

  it("should not return search text on change event if less than 2 characters", () => {
    let searchText = "";
    const onChangeEvent = (text: string) => {
      searchText = text;
    };
    render(<SearchBox onChange={onChangeEvent} />);

    const searchBoxInput = screen.getByTestId("tree-select-search-box-input");
    expect(searchBoxInput).toBeInTheDocument();

    fireEvent.change(searchBoxInput, { target: { value: "h" } });
    expect(searchText).toBe("");
  });

  it("should clear text on clear icon click", () => {
    const onClearEvent = jest.fn();
    render(<SearchBox onChange={() => undefined} onClear={onClearEvent} />);

    const searchBoxInput = screen.getByTestId(
      "tree-select-search-box-input"
    ) as HTMLInputElement;
    expect(searchBoxInput).toBeInTheDocument();

    fireEvent.change(searchBoxInput, { target: { value: "hello world" } });
    expect(searchBoxInput.value).toBe("hello world");

    const clearIconButton = screen.getByTestId("tree-select-search-box-clear");
    fireEvent.click(clearIconButton);
    expect(searchBoxInput.value).toBe("");
    expect(onClearEvent).toHaveBeenCalled();
  });

  it("should trigger on clear when characters length is 1 as the search text is deleted", () => {
    const onClearEvent = jest.fn();
    render(<SearchBox onChange={() => undefined} onClear={onClearEvent} />);

    const searchBoxInput = screen.getByTestId(
      "tree-select-search-box-input"
    ) as HTMLInputElement;
    expect(searchBoxInput).toBeInTheDocument();

    fireEvent.change(searchBoxInput, { target: { value: "hello world" } });
    expect(searchBoxInput.value).toBe("hello world");
    expect(onClearEvent).not.toHaveBeenCalled();

    fireEvent.change(searchBoxInput, { target: { value: "h" } });
    expect(searchBoxInput.value).toBe("h");
    expect(onClearEvent).toHaveBeenCalled();
  });
});
