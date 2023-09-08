import { ColumnGroup, ColumnProps } from "@moodys/mdc-table.schemas.screener";

export const generateColumnMapping = (
  schema: (ColumnProps | ColumnGroup)[]
) => {
  const transformSchema = (
    arr: (ColumnProps | ColumnGroup)[],
    result: Record<string, string> = {}
  ) => {
    arr.forEach((obj) => {
      if ("columns" in obj) {
        transformSchema(obj.columns, result);
      } else if (obj.fieldName) {
        result[obj.fieldName] = obj.headerName;
      }
    });
    return result;
  };
  const mapping = transformSchema(schema);
  return mapping;
};
