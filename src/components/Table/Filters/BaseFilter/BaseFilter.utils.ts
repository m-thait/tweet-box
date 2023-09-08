import { BLANK_SPACES } from "@moodys/mdc-table.constants";
import { NO_DATA } from "@constants/table";

export const formatBlanksForFilters = (value: string | null) => {
  return value === BLANK_SPACES ||
    value?.toLowerCase() === "null" ||
    value === null ||
    value === "" ||
    value === "0"
    ? NO_DATA
    : value;
};
