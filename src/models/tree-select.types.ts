export interface TreeSelectOption {
  id: string | null;
  name: string | null;
  children?: TreeSelectOption[];
}

export interface TreeSelectProps {
  label: string;
  options: TreeSelectOption[];
  selected?: TreeSelectOption[];
  selectAll?: boolean;
  showSearch?: boolean;
  onChange?: (checked: boolean, node: TreeSelectOption | null) => void;
  "data-testid"?: string;
  initialExpandedFields?: string[];
}
