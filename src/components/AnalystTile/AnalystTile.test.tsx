import React from "react";
import { render, screen } from "@testing-library/react";
import { AnalystTile } from "./AnalystTile";

describe("AnalystTile", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Making sure data is rendered in tile", () => {
    const analyst = {
      role: "Lead Analyst",
      name: "William V. Fahy",
      phone: "212-553-1687",
      email: "William.Fahy@moodys.com",
    };

    render(<AnalystTile id={"1"} analyst={analyst} />);

    expect(screen.getByTestId("analyst-box-1")).toBeInTheDocument();
  });
});
