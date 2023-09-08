import color from "@moodys/mdc-frontend.theming.colors";
import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter/BaseFilter.types";

export const setColorForFields = (): string => {
  return color.globalBlack;
};

export const createBaseFilterObj = (
  filter: (string | null | undefined)[],
  field: string
): BaseFilterOption[] => {
  const result: BaseFilterOption[] = [];
  (filter ?? []).map((value) => {
    const obj: BaseFilterOption = {};
    obj.value = value === null || value ? value : undefined;
    obj.fieldName = field;
    obj.label = value ? value : BLANK_SPACES;
    result.push(obj);
  });
  return result;
};
