import React from "react";
import { render, screen } from "@testing-library/react";
import { CompanyDetailsTitle } from "./CompanyDetailsTitle";

describe("CompanyDetailsTitle", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Making sure title is rendered", () => {
    render(<CompanyDetailsTitle orgId={"1"} orgName={"someName"} />);

    expect(screen.getByTestId("company-title-box-1")).toBeInTheDocument();
    const title = screen.getAllByText("someName");
    expect(title.length).toBe(1);
    expect(screen.getByTestId("company-page-button")).toBeInTheDocument();
  });
});
