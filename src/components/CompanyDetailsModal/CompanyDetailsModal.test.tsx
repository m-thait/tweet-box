import React from "react";
import { render, screen } from "@testing-library/react";
import { CompanyDetailsModal } from "./CompanyDetailsModal";

describe("CompanyDetailsModal", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Making sure modal is rendered", () => {
    render(
      <CompanyDetailsModal
        handleModalOpen={() => null}
        openModal={true}
        orgId={"1"}
        orgName={"someName"}
      />
    );

    expect(screen.getByTestId("company-details-modal-1")).toBeInTheDocument();
  });
});
