import React, { FC, ReactNode } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface BaseModalProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  handleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const BaseModal: FC<BaseModalProps> = ({
  title,
  children,
  open,
  handleShowModal,
  className,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const closeModal = () => handleShowModal(false);

  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="customized-dialog"
      open={open}
      maxWidth="md"
      data-testid="base-modal"
      fullScreen={isSmall ? true : false}
      className={className}
    >
      <DialogTitle data-testid="base-modal-title">
        <Box component="span" fontWeight="fontWeightSemiBold">
          {title}
        </Box>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          data-testid="base-modal-close-button"
        >
          <CloseIcon data-testid="CloseIcon" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};
