import React from "react";
import { Box } from "@mui/material";
import { render, screen, fireEvent } from "@testing-library/react";
import { BaseModal } from "./BaseModal";

describe("BaseModal", () => {
  const closeModal = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  const init = (
    open: boolean,
    handleClose: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return render(
      <BaseModal open={open} handleShowModal={handleClose}>
        <Box>Test</Box>
      </BaseModal>
    );
  };

  it("should open and close modal", () => {
    init(true, closeModal);
    expect(screen.getByTestId("base-modal")).toBeVisible();
    expect(screen.getByTestId("base-modal-title")).toBeVisible();
    const button = screen.getByTestId("CloseIcon");
    fireEvent.click(button);
    expect(closeModal).toHaveBeenCalledWith(false);
  });
});
