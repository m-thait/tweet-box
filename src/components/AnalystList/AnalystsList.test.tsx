import React from "react";
import { render, screen } from "@testing-library/react";
import { AnalystsList } from "./AnalystsList";

describe("AnalystsList", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Making sure data is rendered with data test", () => {
    const analysts = [
      {
        role: "Lead Analyst",
        name: "William V. Fahy",
        phone: "212-553-1687",
        email: "William.Fahy@moodys.com",
      },
      {
        role: "Backup Analyst",
        name: "Peter Trombetta",
        phone: "212-553-1356",
        email: "Peter.Trombetta@moodys.com",
      },
      {
        role: "Rating Analyst",
        name: "Jack Myers",
        phone: "212-553-5116",
        email: "Jack.Myers@moodys.com",
      },
      {
        role: "Rating Analyst",
        name: "Jack Myers",
        phone: "212-553-5116",
        email: "Jack.Myers@moodys.com",
      },
    ];

    render(<AnalystsList orgId={"1"} analysts={analysts} loaded={true} />);

    expect(screen.getByTestId("analyst-box-1")).toBeInTheDocument();
  });
});
