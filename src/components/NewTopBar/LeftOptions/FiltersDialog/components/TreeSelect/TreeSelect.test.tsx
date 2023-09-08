import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { TreeSelect } from "./TreeSelect";

describe("TreeSelect", () => {
  const options = [
    {
      id: "Parent-1",
      name: "Parent-1",
      children: [
        { id: "Child-1", name: "Child-1" },
        { id: "Child-2", name: "Child-2" },
      ],
    },
    {
      id: "Parent-2",
      name: "Parent-2",
      children: [
        { id: "Child-3", name: "Child-3" },
        { id: "Child-4", name: "Child-4" },
      ],
    },
    {
      id: "Parent-3",
      name: "Parent-3",
    },
  ];
  const treeSelectId = "hello-tree-select";

  it("should render tree select", () => {
    render(
      <TreeSelect
        label="Hello"
        options={options}
        selected={[]}
        data-testid={treeSelectId}
        selectAll={false}
      />
    );

    const treeSelect = screen.getByTestId(treeSelectId);
    expect(treeSelect).toBeInTheDocument();
  });

  it("should open dropdown on click", () => {
    render(<TreeSelect label="Hello" options={options} selected={[]} />);

    const treeSelect = screen.getByTestId("tree-select");
    expect(treeSelect).toBeInTheDocument();

    const dropdownToggle = screen.getByTestId("dropdown-toggle");
    expect(dropdownToggle).toBeInTheDocument();
    fireEvent.click(dropdownToggle);

    const treeSelectDropdown = screen.getByTestId("tree-select-dropdown");
    expect(treeSelectDropdown).toBeInTheDocument();
  });

  it("should open child options by clicking parent option", () => {
    render(<TreeSelect label="Hello" options={options} selected={[]} />);

    const treeSelect = screen.getByTestId("tree-select");
    expect(treeSelect).toBeInTheDocument();

    const dropdownToggle = screen.getByTestId("dropdown-toggle");
    expect(dropdownToggle).toBeInTheDocument();
    fireEvent.click(dropdownToggle);

    const parent1 = screen.getByText("Parent-1");
    expect(parent1).toBeInTheDocument();
    fireEvent.click(parent1);

    const child1 = screen.getByTestId("tree-item-Child-1");
    expect(child1).toBeInTheDocument();
    const child2 = screen.getByTestId("tree-item-Child-2");
    expect(child2).toBeInTheDocument();
  });

  it("should display no options if data is empty", () => {
    render(
      <TreeSelect
        label="Hello"
        options={[]}
        data-testid={treeSelectId}
        selected={[]}
        selectAll={false}
      />
    );

    const treeSelect = screen.getByTestId(treeSelectId);
    expect(treeSelect).toBeInTheDocument();
    const dropdownToggle = screen.getByTestId("dropdown-toggle");
    expect(dropdownToggle).toBeInTheDocument();
    fireEvent.click(dropdownToggle);

    const treeSelectDropdown = screen.getByTestId("hello-tree-select-dropdown");
    expect(treeSelectDropdown).toBeInTheDocument();

    const noOptions = screen.getByText("No Options");
    expect(noOptions).toBeInTheDocument();
  });

  it("should mark selected item as checked", () => {
    render(
      <TreeSelect
        label="Hello"
        options={options}
        selected={[{ id: "Child-3", name: "Child-3" }]}
        selectAll={false}
      />
    );

    const treeSelect = screen.getByTestId("tree-select");
    expect(treeSelect).toBeInTheDocument();
    const dropdownToggle = screen.getByTestId("dropdown-toggle");
    expect(dropdownToggle).toBeInTheDocument();
    fireEvent.click(dropdownToggle);

    const parent2 = screen.getByText("Parent-2");
    expect(parent2).toBeInTheDocument();
    fireEvent.click(parent2);

    const child3Checkbox = screen.getByTestId("tree-item-checkbox-Child-3");
    expect(child3Checkbox).toHaveClass("Mui-checked");
    const input3Element = within(child3Checkbox).getByRole("checkbox");
    expect(input3Element).toBeChecked();

    const child4Checkbox = screen.getByTestId("tree-item-checkbox-Child-4");
    expect(child4Checkbox).not.toHaveClass("Mui-checked");
    const input4Element = within(child4Checkbox).getByRole("checkbox");
    expect(input4Element).not.toBeChecked();
  });

  it("should trigger on change when clicked on checkbox of child node", () => {
    const mockOnChange = jest.fn();
    render(
      <TreeSelect
        label="Hello"
        options={options}
        selected={[{ id: "Child-3", name: "Child-3" }]}
        onChange={mockOnChange}
        selectAll={false}
      />
    );

    const treeSelect = screen.getByTestId("tree-select");
    expect(treeSelect).toBeInTheDocument();
    const dropdownToggle = screen.getByTestId("dropdown-toggle");
    expect(dropdownToggle).toBeInTheDocument();
    fireEvent.click(dropdownToggle);

    const parent2 = screen.getByText("Parent-2");
    expect(parent2).toBeInTheDocument();
    fireEvent.click(parent2);

    const child4Checkbox = screen.getByTestId("tree-item-checkbox-Child-4");
    expect(child4Checkbox).not.toHaveClass("Mui-checked");
    fireEvent.click(child4Checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(true, {
      id: "Child-4",
      name: "Child-4",
    });
  });
});
