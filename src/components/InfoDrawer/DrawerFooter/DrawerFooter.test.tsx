import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as methodologyHelper from "@utils/methodology.helper";
import { MethodologyDocument } from "@models/table.types";
import { DrawerFooter } from "./DrawerFooter";

const mockOpenMethodologyDocument = jest
  .spyOn(methodologyHelper, "openMethodologyDocument")
  .mockImplementation(() => new Promise(() => undefined));

describe("DrawerFooter", () => {
  it("should render component", () => {
    render(<DrawerFooter />);
    const footerComponent = screen.getByText("Methodology");
    expect(footerComponent).toBeInTheDocument();
  });

  it("should call open methodology function when clicked on the methodology button", async () => {
    render(<DrawerFooter />);
    const methodology = screen.getByTestId("drawer-footer-button");
    fireEvent.click(methodology);
    expect(mockOpenMethodologyDocument).toHaveBeenCalled();
    expect(mockOpenMethodologyDocument).toHaveBeenCalledWith(
      MethodologyDocument.CIS_IPS
    );
  });
});
