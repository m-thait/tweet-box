import React, { MutableRefObject } from "react";
import { act, fireEvent, renderHook } from "@testing-library/react";
import { TreeSelectOption } from "@models/index";
import { useTreeSelectEvents } from "./TreeSelect.hooks";

describe("TreeSelect Hooks", () => {
  const mockDivRef = {
    current: {
      contains: jest.fn(),
    },
  } as unknown as MutableRefObject<HTMLDivElement>;
  const defaultOptions = [
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
        { id: "Child-4", name: "Child-4", children: [] },
      ],
    },
    {
      id: "Parent-3",
      name: "Parent-3",
    },
  ];

  const mockOnChange = jest.fn();

  const init = ({
    selected,
    options,
  }: {
    selected?: TreeSelectOption[];
    options?: TreeSelectOption[];
  }) => {
    let selectedOptions = selected;
    const { result, rerender } = renderHook(() => {
      const { treeData, expanded, open, searchTerm, ...handlers } =
        useTreeSelectEvents({
          options: options ?? defaultOptions,
          selected: selectedOptions ?? [],
          onChange: mockOnChange,
          dropdownRef: mockDivRef,
          buttonRef: mockDivRef,
          initialExpandedFields: ["Parent-1"],
        });
      return { treeData, expanded, open, searchTerm, ...handlers };
    });

    const refresh = (newSelected?: TreeSelectOption[]) => {
      selectedOptions = newSelected;
      rerender();
    };

    return { handlers: result, refresh };
  };

  it("should return tree select event handlers", () => {
    const { handlers } = init({});
    const {
      handleSearchTextChange,
      handleDropdownButtonClick,
      handleSearchClear,
      handleExpandClick,
      handleClearFilterClick,
      handleToggle,
      handleSelectAllChange,
      treeData,
      checked,
      indeterminate,
      expanded,
      expandAll,
      open,
    } = handlers.current;

    expect(typeof handleSearchTextChange).toBe("function");
    expect(typeof handleDropdownButtonClick).toBe("function");
    expect(typeof handleSearchClear).toBe("function");
    expect(typeof handleExpandClick).toBe("function");
    expect(typeof handleClearFilterClick).toBe("function");
    expect(typeof handleToggle).toBe("function");
    expect(typeof handleSelectAllChange).toBe("function");
    expect(treeData).toStrictEqual(defaultOptions);
    expect(checked).toStrictEqual([]);
    expect(indeterminate).toStrictEqual([]);
    expect(expanded).toStrictEqual(["Parent-1"]);
    expect(expandAll).toBe(true);
    expect(open).toBe(false);
  });

  describe("handleCheckboxChange", () => {
    it("should mark child node as checked", () => {
      const { handlers } = init({
        selected: [
          {
            id: "Child-1",
            name: "Child-1",
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual(["Child-1"]);
      expect(handlers.current.indeterminate).toStrictEqual(["Parent-1", "0"]);
    });

    it("should mark parent as checked when child nodes are checked", () => {
      const { handlers } = init({
        selected: [
          {
            id: "Child-1",
            name: "Child-1",
          },
          {
            id: "Child-2",
            name: "Child-2",
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual([
        "Child-1",
        "Child-2",
        "Parent-1",
      ]);
      expect(handlers.current.indeterminate).toStrictEqual(["0"]);
    });

    it("should mark all child nodes of parent as checked", () => {
      const { handlers } = init({
        selected: [
          {
            id: "Parent-1",
            name: "Parent-1",
            children: [
              { id: "Child-1", name: "Child-1" },
              { id: "Child-2", name: "Child-2" },
            ],
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual([
        "Parent-1",
        "Child-1",
        "Child-2",
      ]);
      expect(handlers.current.indeterminate).toStrictEqual(["0"]);
    });

    it("should unselect child nodes on checkbox unselect on child node", () => {
      const { handlers, refresh } = init({
        selected: [
          {
            id: "Child-3",
            name: "Child-3",
          },
          {
            id: "Child-4",
            name: "Child-4",
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual([
        "Child-3",
        "Child-4",
        "Parent-2",
      ]);

      refresh([{ id: "Child-3", name: "Child-3" }]);

      expect(handlers.current.checked).toStrictEqual(["Child-3"]);
      expect(handlers.current.indeterminate).toStrictEqual(["0", "Parent-2"]);
    });

    it("should mark the new selected items as checked", () => {
      const { handlers, refresh } = init({
        selected: [
          {
            id: "Child-3",
            name: "Child-3",
          },
          {
            id: "Child-4",
            name: "Child-4",
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual([
        "Child-3",
        "Child-4",
        "Parent-2",
      ]);

      refresh([
        {
          id: "Child-3",
          name: "Child-3",
        },
        {
          id: "Child-4",
          name: "Child-4",
        },
        {
          id: "Child-2",
          name: "Child-2",
        },
      ]);

      expect(handlers.current.checked).toStrictEqual([
        "Child-3",
        "Child-4",
        "Parent-2",
        "Child-2",
      ]);
      expect(handlers.current.indeterminate).toStrictEqual(["0", "Parent-1"]);
    });

    it("should clear all when none is selected", () => {
      const { handlers, refresh } = init({
        selected: [
          {
            id: "Child-3",
            name: "Child-3",
          },
          {
            id: "Child-4",
            name: "Child-4",
          },
        ],
      });

      expect(handlers.current.checked).toStrictEqual([
        "Child-3",
        "Child-4",
        "Parent-2",
      ]);

      refresh([]);

      expect(handlers.current.checked).toStrictEqual([]);
      expect(handlers.current.indeterminate).toStrictEqual([]);
    });
  });

  describe("handleSearchTextChange", () => {
    it("should search for term and update tree data when children is undefined", async () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleSearchTextChange("child-3");
      });

      expect(handlers.current.searchTerm).toBe("child-3");
      expect(handlers.current.treeData).toStrictEqual([
        {
          id: "Parent-2",
          name: "Parent-2",
          children: [{ id: "Child-3", name: "Child-3", children: [] }],
        },
      ]);
      expect(handlers.current.expanded).toStrictEqual(["Parent-1", "Parent-2"]);
    });

    it("should search for term and update tree data when children is empty", async () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleSearchTextChange("child-4");
      });

      expect(handlers.current.searchTerm).toBe("child-4");
      expect(handlers.current.treeData).toStrictEqual([
        {
          id: "Parent-2",
          name: "Parent-2",
          children: [{ id: "Child-4", name: "Child-4", children: [] }],
        },
      ]);
      expect(handlers.current.expanded).toStrictEqual(["Parent-1", "Parent-2"]);
    });
  });

  describe("handleDropdownButtonClick", () => {
    it("should open dropdown on button click", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleDropdownButtonClick();
      });

      expect(handlers.current.open).toBe(true);

      jest.spyOn(mockDivRef.current, "contains").mockReturnValueOnce(false);
      fireEvent.click(document);
      expect(handlers.current.open).toBe(false);
    });
  });

  describe("handleSearchClear", () => {
    it("should clear search by setting original options to the tree data", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleSearchTextChange("child-3");
      });

      expect(handlers.current.treeData).toStrictEqual([
        {
          id: "Parent-2",
          name: "Parent-2",
          children: [{ id: "Child-3", name: "Child-3", children: [] }],
        },
      ]);

      act(() => {
        handlers.current.handleSearchClear();
      });

      expect(handlers.current.treeData).toStrictEqual(defaultOptions);
    });
  });

  describe("handleExpandClick", () => {
    it("should toggle expanded on click", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleExpandClick();
      });

      expect(handlers.current.expanded).toStrictEqual(["Parent-1", "Parent-2"]);

      act(() => {
        handlers.current.handleExpandClick();
      });

      expect(handlers.current.expanded).toStrictEqual([]);
    });
  });

  describe("handleClearFilterClick", () => {
    it("should clear selected filters from dropdown", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleClearFilterClick();
      });

      expect(handlers.current.expanded).toStrictEqual([]);
    });
  });

  describe("handleToggle", () => {
    it("should set node ids as expanded", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleToggle({} as React.SyntheticEvent, ["Parent-2"]);
      });

      expect(handlers.current.expanded).toStrictEqual(["Parent-2"]);
    });
  });

  describe("handleSelectAllChange", () => {
    it("should call onChange callback with null", () => {
      const { handlers } = init({});

      act(() => {
        handlers.current.handleSelectAllChange(
          {} as React.ChangeEvent<HTMLInputElement>,
          false
        );
      });

      expect(mockOnChange).toHaveBeenCalledWith(false, null);
    });
  });
});
