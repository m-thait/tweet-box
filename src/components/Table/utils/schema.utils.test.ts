import { ColumnProps, ColumnGroup } from "@moodys/mdc-table.schemas.screener";
import { generateColumnMapping } from "./schema.utils";

describe("Schema Utils", () => {
  describe("generateColumnMapping", () => {
    it("should generate a mapping for a schema only from columns", () => {
      const schema = [
        {
          fieldName: "field1",
          headerName: "header1",
        },
        {
          templateName: "group1",
          columns: [
            {
              fieldName: "field2",
              headerName: "header2",
            },
            {
              fieldName: "field3",
              headerName: "header3",
            },
            {
              fieldName: "group3",
              columns: [
                {
                  fieldName: "field4",
                  headerName: "header4",
                },
              ],
            },
          ],
        },
      ];
      const expectedMapping = {
        field1: "header1",
        field2: "header2",
        field3: "header3",
        field4: "header4",
      };
      const mapping = generateColumnMapping(
        schema as unknown as (ColumnProps | ColumnGroup)[]
      );
      expect(mapping).toEqual(expectedMapping);
    });
  });
});
