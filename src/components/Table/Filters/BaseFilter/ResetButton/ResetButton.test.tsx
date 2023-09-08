import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ResetButton } from "./ResetButton";

const mockHandler = jest.fn();
const mockDisableButton = false;

describe("Reset Button", () => {
  const init = () =>
    render(
      <ResetButton
        onClickHandler={mockHandler}
        disableButton={mockDisableButton}
      />
    );

  it("should render reset button", () => {
    init();
    const resetButtonContainer = screen.getByTestId(
      "base-filter-reset-button-container"
    );
    expect(resetButtonContainer).toBeInTheDocument();
  });

  it("should call onclick handler on click of the button", () => {
    init();
    const resetButton = screen.getByTestId("base-filter-reset-button");
    fireEvent.click(resetButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
