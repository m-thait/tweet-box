import React from "react";
import { render, screen } from "@testing-library/react";
import {
  mockCisAccordionDataStoreState,
  mockIpsAccordionDataStoreState,
} from "@services/redux/mocks";
import { getAccordionBarColor, DrawerAccordion } from "./DrawerAccordion";

const cisAccordionData = mockCisAccordionDataStoreState;
const ipsAccordionData = mockIpsAccordionDataStoreState;
const incorrectScoreAccordionData = [
  {
    titles: ["CIS-0"],
    content: "TEST CONTENT CIS-0",
    score: 0,
    description: "Positive",
  },
  {
    titles: ["CIS-6"],
    content: "TEST CONTENT CIS-6",
    score: 6,
    description: "Positive",
  },
];
const hexToRgb = (hex: string) => {
  return `rgb(${parseInt(hex.substring(1, 3), 16)}, ${parseInt(
    hex.substring(3, 5),
    16
  )}, ${parseInt(hex.substring(5, 7), 16)})`;
};

describe("DrawerAccordion", () => {
  it("should render cis accordion", () => {
    render(<DrawerAccordion accordionData={cisAccordionData} />);

    const scoreOne = screen.getByTestId("accordion-1");
    const scoreOneDescription = screen.getByTestId("accordion-description-1");
    const scoreOneContent = screen.getByTestId("accordion-content-1");
    const scoreTwo = screen.getByTestId("accordion-2");
    const scoreThree = screen.getByTestId("accordion-3");
    const scoreFour = screen.getByTestId("accordion-4");
    const scoreFive = screen.getByTestId("accordion-5");

    expect(scoreOne).toBeInTheDocument();
    expect(scoreOneDescription).toBeInTheDocument();
    expect(scoreOneContent).toBeInTheDocument();
    expect(scoreOne).toHaveTextContent("CIS-1");
    expect(scoreTwo).toBeInTheDocument();
    expect(scoreThree).toBeInTheDocument();
    expect(scoreFour).toBeInTheDocument();
    expect(scoreFive).toBeInTheDocument();
  });
  it("should render ips accordion", () => {
    render(<DrawerAccordion accordionData={ipsAccordionData} />);

    const scoreOne = screen.getByTestId("accordion-1");
    const scoreOneDescription = screen.getByTestId("accordion-description-1");
    const scoreOneContent = screen.getByTestId("accordion-content-1");
    const scoreTwo = screen.getByTestId("accordion-2");
    const scoreThree = screen.getByTestId("accordion-3");
    const scoreFour = screen.getByTestId("accordion-4");
    const scoreFive = screen.getByTestId("accordion-5");

    expect(scoreOne).toBeInTheDocument();
    expect(scoreOneDescription).toBeInTheDocument();
    expect(scoreOneContent).toBeInTheDocument();
    expect(scoreOne).toHaveTextContent("E-1");
    expect(scoreTwo).toBeInTheDocument();
    expect(scoreThree).toBeInTheDocument();
    expect(scoreFour).toBeInTheDocument();
    expect(scoreFive).toBeInTheDocument();
  });
  it.each([1, 2, 3, 4, 5])(
    "renders correct background color for score %i",
    (i) => {
      render(<DrawerAccordion accordionData={ipsAccordionData} />);
      const score = screen.getByTestId(`accordion-color-${i}`);
      const style = getComputedStyle(score);

      expect(style.backgroundColor).toBe(hexToRgb(getAccordionBarColor(i)));
    }
  );
  it("should render incorrect scores with no background color", () => {
    render(<DrawerAccordion accordionData={incorrectScoreAccordionData} />);
    const scoreZero = screen.getByTestId("accordion-color-0");
    const scoreSix = screen.getByTestId("accordion-color-6");
    const stylesZero = getComputedStyle(scoreZero);
    const stylesSix = getComputedStyle(scoreSix);
    expect(scoreZero).toBeInTheDocument();
    expect(scoreSix).toBeInTheDocument();
    expect(stylesZero.backgroundColor).toBe("");
    expect(stylesSix.backgroundColor).toBe("");
  });
});
