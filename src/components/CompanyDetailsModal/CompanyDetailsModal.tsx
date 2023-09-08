import React, { FC } from "react";
import { Box } from "@mui/material";
import { BaseModal } from "@components/BaseModal";
import { CompanyDetailsTitle } from "@components/CompanyDetailsTitle/CompanyDetailsTitle";
import { CompanyDetailsContent } from "./CompanyDetailsContent";

export interface CompanyDetailsModalProps {
  openModal: boolean;
  handleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orgId: string;
  orgName: string;
}

export const CompanyDetailsModal: FC<CompanyDetailsModalProps> = ({
  openModal,
  handleModalOpen,
  orgId,
  orgName = "",
}) => {
  return (
    <BaseModal
      open={openModal}
      handleShowModal={handleModalOpen}
      title={`Company Details - ${orgName}`}
    >
      <Box mb={2} data-testid={`company-details-modal-${orgId}`}>
        <CompanyDetailsTitle orgId={orgId} orgName={orgName} />
        <CompanyDetailsContent orgId={orgId} />
      </Box>
    </BaseModal>
  );
};
