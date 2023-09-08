import React from "react";
import { render, screen } from "@testing-library/react";
import { CompanyDetailsInfo } from "./CompanyDetailsInfo";

describe("CompanyDetailsInfo", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Making sure info is rendered", () => {
    const orgInfo = {
      analysts: [
        {
          role: "Lead Analyst",
          name: "Oleg Markin",
          phone: "212-553-1023",
          email: "Oleg.Markin@moodys.com",
        },
        {
          role: "Backup Analyst",
          name: "Farah Zakir",
          email: "Farah.Zakir@moodys.com",
        },
      ],
      overview:
        "The company, also known as SAPE, is engaged in the operation of social housing activities in France. It was incorporated in 1957 and has its registered headquarters located in Courbevoie, France. The company primarily operates as lessor of real estate properties including manufactured home sites, vacant lots, and grazing land. Its activities provide a sustainable response to the demand for social housing, and is committed to developing an office park next generation, adapted to the demands of modern life and promote social mix. It is the parent company of Sa D Hlm Le Logement Alpes Rh (SOLLAR), a developer and constructor of property; and HLM Logis Familial Varois, engaged in construction activities.",
      headquarter: "France",
      website: "www.logementfrancais.fr",
      sector: null,
      ticker: "4565",
      founded: "1957",
      fullTimeEmployees: 456456,
    };
    render(<CompanyDetailsInfo orgId={"1"} orgInfo={orgInfo} loaded={true} />);

    expect(
      screen.getByTestId("company-details-info-box-1")
    ).toBeInTheDocument();
  });
});
