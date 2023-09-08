import { render, screen } from "@testing-library/react";
import { ESGColumnFields } from "@moodys/mdc-table.schemas.screener";
import { UNAUTHORIZED_BLANKS } from "@moodys/mdc-table.constants";
import { Label } from "@components/Table/Filters/BaseFilter/Label";
import { BaseFilterOption } from "@components/Table/Filters/BaseFilter/BaseFilter.types";

const scoreFilter: BaseFilterOption = {
  score: 5,
  value: "5",
  label: "CIS-5",
  fieldName: ESGColumnFields.CREDIT_IMPACT_SCORE.fieldName,
};
const lockedOrgIdsFilter: BaseFilterOption = {
  value: UNAUTHORIZED_BLANKS,
  fieldName: ESGColumnFields.ENV_PHYSICAL_CLIMATE_RISKS.fieldName,
};
describe("Label Render", () => {
  const init = (filter: BaseFilterOption, lockedOrgIds: number[]) => {
    return render(Label(filter, lockedOrgIds));
  };

  describe("should render Label elements", () => {
    it("should render locked org ids container if filter model contains locked org ids", () => {
      init(lockedOrgIdsFilter, [354353463636]);

      const labelLockedOrgIdsContainer = screen.getByTestId(
        "label-locked-org-ids-container"
      );
      expect(labelLockedOrgIdsContainer).toBeInTheDocument();

      const lockedOrgIdsOOSLabel = screen.getByTestId(
        "label-locked-org-ids-oos-label"
      );
      expect(lockedOrgIdsOOSLabel).toBeInTheDocument();
    });
    it("should render score filter suffix container if field name is a score field", () => {
      init(scoreFilter, []);

      const labelScoreSuffixContainer =
        screen.getByTestId("label-score-suffix");
      expect(labelScoreSuffixContainer).toBeInTheDocument();
    });
  });
});
