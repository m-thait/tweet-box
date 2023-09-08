import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TreeSelectOption } from "@models/index";
import { treeNodeWrapper } from "@components/Table/components/TreeSelect";

export const useTreeSelectEvents = ({
  options,
  selected,
  onChange,
  dropdownRef,
  chipRef,
  initialExpandedFields,
}: {
  options: TreeSelectOption[];
  selected?: TreeSelectOption[];
  onChange?: (checked: boolean, node: TreeSelectOption | null) => void;
  dropdownRef: MutableRefObject<HTMLDivElement | null>;
  chipRef: MutableRefObject<HTMLDivElement | null>;
  initialExpandedFields?: string[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<(string | null)[]>([]);
  const [indeterminate, setIndeterminate] = useState<(string | null)[]>([]);
  const [expanded, setExpanded] = useState<(string | null)[] | undefined>([]);
  const [expandAll, setExpandAll] = useState<boolean>(true);
  const [parentNodes, setParentNodes] = useState<(string | null)[] | undefined>(
    []
  );
  const [childNodes, setChildNodes] = useState<TreeSelectOption[] | undefined>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [treeData, setTreeData] = useState<TreeSelectOption[]>([]);
  const [childChecked, setChildChecked] = useState<TreeSelectOption[]>([]);

  useEffect(() => {
    if (options?.length > 0) {
      const parent: (string | null)[] = [];
      const children: TreeSelectOption[] = [];
      const getAllNodes = (
        nodes: TreeSelectOption[]
      ): [(string | null)[], TreeSelectOption[]] | [] => {
        if (!nodes) return [];
        for (const node of nodes) {
          if ((node?.children?.length ?? 0) > 0) {
            parent.push(node.id);
            node.children?.forEach((n) => {
              getAllNodes([n]);
            });
          } else {
            children.push({ id: node.id, name: node.name });
          }
        }
        return [parent, children];
      };
      const [pNodes, cNodes] = getAllNodes(options);
      setParentNodes(pNodes);
      setChildNodes(cNodes);
      setTreeData(options);
    }
  }, [options]);

  useEffect(() => {
    if (searchTerm) {
      // eslint-disable-next-line complexity
      const dfs = (
        node: TreeSelectOption,
        term: string,
        foundIDS: string[]
      ) => {
        let isMatching =
          node.name &&
          node.name.toLowerCase().indexOf(term) > -1 &&
          (!node.children || node.children.length === 0);

        if (Array.isArray(node.children)) {
          node.children.forEach((child) => {
            const hasMatchingChild = dfs(child, term, foundIDS);
            isMatching = isMatching || hasMatchingChild;
          });
        }

        if (isMatching && node.id) {
          foundIDS.push(node.id);
        }

        return isMatching;
      };

      const filter = (
        data: TreeSelectOption[],
        matchedIDS: (string | null)[]
      ): TreeSelectOption[] => {
        return data
          .filter((item) => matchedIDS.indexOf(item.id) > -1)
          .map((item) => ({
            ...item,
            children: item.children ? filter(item.children, matchedIDS) : [],
          }));
      };

      const matchedIDS: string[] = [];
      dfs(treeNodeWrapper(options), searchTerm.toLowerCase(), matchedIDS);
      setTreeData(filter(options, matchedIDS));
      setExpanded(parentNodes);
    } else {
      setTreeData(options);
      setExpanded(initialExpandedFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, parentNodes, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const isDropDownClicked =
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node);
      const isChipClicked =
        chipRef.current && chipRef.current.contains(event.target as Node);

      if (!isDropDownClicked && !isChipClicked) {
        setOpen(false);
        setExpandAll(true);
        setSearchTerm("");
        setExpanded(initialExpandedFields);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chipRef, dropdownRef]);

  const clearAll = useCallback(() => {
    if (checked.length > 0) {
      setChecked([]);
    }
    if (indeterminate.length > 0) {
      setIndeterminate([]);
    }
    if (childChecked.length > 0) {
      setChildChecked([]);
    }
  }, [checked.length, childChecked.length, indeterminate.length]);

  useEffect(() => {
    const handleCheckboxChange = (
      isChecked: boolean,
      nodes: TreeSelectOption
    ) => {
      const getChildById = (node: TreeSelectOption[], id: string | null) => {
        let children: (string | null)[] = [];

        const getAllChild = (nodes: TreeSelectOption | null) => {
          if (!nodes) return [];
          children.push(nodes.id);
          if (Array.isArray(nodes.children)) {
            nodes.children.forEach((node) => {
              children = [...children, ...getAllChild(node)];
              children = children.filter((v, i) => children.indexOf(v) === i);
            });
          }
          return children;
        };

        const parents: (string | null)[] = [];
        let parentChildMapping: Record<string, TreeSelectOption[]> = {};
        const getNodeById = (nodes: TreeSelectOption, id: string | null) => {
          if (nodes.id === id) {
            return nodes;
          } else if (Array.isArray(nodes.children)) {
            let result = null;
            nodes.children.forEach((node) => {
              if (getNodeById(node, id)) {
                result = getNodeById(node, id);
              }
            });
            if (result) {
              parents.push(nodes.id);
              if (nodes.id) {
                parentChildMapping = {
                  ...parentChildMapping,
                  [nodes.id]: nodes.children,
                };
              }
            }
            return result;
          }
          return null;
        };

        return {
          children: getAllChild(getNodeById(treeNodeWrapper(node), id)),
          parents: parents.filter((e, i) => parents.indexOf(e) === i),
          parentChildMapping,
        };
      };

      const { children, parents, parentChildMapping } = getChildById(
        options,
        nodes.id
      );

      let selectedNodes: (string | null)[] = [];
      setChecked((prevChecked) => {
        selectedNodes = isChecked
          ? [...prevChecked, ...children]
          : prevChecked.filter((value) => !children.includes(value));

        // remove duplicates
        selectedNodes = selectedNodes.filter(
          (v, i) => selectedNodes.indexOf(v) === i
        );

        // check if all the children are selected add parent to the selected nodes
        // else remove the parent from the selected nodes
        Object.entries(parentChildMapping).forEach(([p, c]) => {
          const allSelected = c.every((e) => selectedNodes.includes(e.id));
          selectedNodes = allSelected
            ? [...selectedNodes, p]
            : selectedNodes.filter((e) => e !== p);
        });

        return selectedNodes;
      });

      setIndeterminate((prevIndeterminate) => {
        let indeterminateNodes = prevIndeterminate;
        if (isChecked) {
          indeterminateNodes = [...indeterminateNodes, ...parents];
        } else {
          // check if any children is marked as checked or indeterminate before
          // removing them from the indeterminate nodes
          parents.forEach((parent) => {
            if (parent && parent !== "0") {
              const isSelected = parentChildMapping[parent].some(
                (e) =>
                  selectedNodes.includes(e.id) ||
                  indeterminateNodes.includes(e.id)
              );
              indeterminateNodes = isSelected
                ? [...indeterminateNodes, parent]
                : indeterminateNodes.filter((value) => value !== parent);
            }
          });
        }

        // remove duplicates
        indeterminateNodes = indeterminateNodes.filter(
          (v, i) =>
            indeterminateNodes.indexOf(v) === i && !selectedNodes.includes(v)
        );
        return indeterminateNodes;
      });
    };

    if (selected && treeData.length > 0) {
      if (selected.length === 0) {
        clearAll();
      } else {
        setChildChecked((prevSelected) => {
          let difference;
          let isChecked: boolean;
          if (selected.length > prevSelected.length) {
            isChecked = true;
            difference = selected.filter(
              (s) => !prevSelected.some((c) => c.id === s.id)
            );
          } else {
            isChecked = false;
            difference = prevSelected.filter(
              (c) => !selected.some((s) => s.id === c.id)
            );
          }

          difference = difference.filter((e) => e.id !== null);
          difference.forEach((nodes) => handleCheckboxChange(isChecked, nodes));
          return selected;
        });
      }
    }
  }, [childNodes, clearAll, options, selected, treeData]);

  const handleSearchTextChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleChipClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleSearchClear = useCallback(() => {
    setTreeData(options);
    setExpanded([]);
  }, [options]);

  const handleExpandClick = useCallback(() => {
    setExpandAll((prevState) => !prevState);
    setExpanded(expandAll ? parentNodes : []);
  }, [expandAll, parentNodes]);

  const handleClearFilterClick = useCallback(() => {
    setExpanded([]);
    if (onChange) {
      onChange(false, null);
    }
  }, [onChange]);

  const handleToggle = useCallback(
    (_event: React.SyntheticEvent, nodeIds: string[]) => {
      setExpanded(nodeIds);
    },
    []
  );

  const handleSelectAllChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
      if (onChange) {
        onChange(isChecked, null);
      }
    },
    [onChange]
  );

  const handleBlanksChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
      if (onChange) {
        onChange(isChecked, { id: null, name: null });
      }
    },
    [onChange]
  );

  return {
    handleSearchTextChange,
    handleChipClick,
    handleSearchClear,
    handleExpandClick,
    handleClearFilterClick,
    handleToggle,
    handleSelectAllChange,
    handleBlanksChange,
    treeData,
    checked,
    searchTerm,
    indeterminate,
    expanded,
    expandAll,
    open,
  };
};
