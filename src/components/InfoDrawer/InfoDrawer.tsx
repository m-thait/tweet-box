import React from "react";
import { Drawer } from "@moodys/mdc-frontend.overlays.drawer";
import { replaceSpaceWithDash } from "@moodys/mdc-table.utils.string";
import { ESGGroupNames } from "@moodys/mdc-table.schemas.screener";
import {
  closeDrawer,
  getDrawerState,
  useAppDispatch,
  useAppSelector,
} from "@services/redux";
import {
  CIS_HEADER_TEXT,
  IPS_HEADER_TEXT,
  ANALYST_COMMENTS_DRAWER_TYPE,
  SCORE_COMMENTS_HEADER_TEXT,
} from "@constants/drawer";
import {
  useFetchCISDrawerInfoQuery,
  useFetchIPSDrawerInfoQuery,
} from "@services/api";
import { CISAndIPSBody } from "./DrawerBody/CISAndIPSBody";
import { DrawerFooter } from "./DrawerFooter";
import { ScoreBody } from "./DrawerBody/ScoreBody/ScoreBody";

export const InfoDrawer = () => {
  const { isDrawerOpen, drawerType } = useAppSelector(getDrawerState);
  const dispatch = useAppDispatch();
  const { data: cisDrawerInfo, error: fetchCISDrawerInfoError } =
    useFetchCISDrawerInfoQuery();
  const { data: ipsDrawerInfo, error: fetchIPSDrawerInfoError } =
    useFetchIPSDrawerInfoQuery();

  const getDrawerElements = (
    drawerType?: string
  ): {
    drawerBody: JSX.Element | null;
    drawerFooter: JSX.Element | null;
    drawerHeaderText: string | null;
  } => {
    switch (drawerType) {
      case replaceSpaceWithDash(ESGGroupNames.ESG_SCORES_MIS):
        return {
          drawerHeaderText: CIS_HEADER_TEXT,
          drawerBody: (
            <CISAndIPSBody
              data={cisDrawerInfo}
              error={fetchCISDrawerInfoError}
            />
          ),
          drawerFooter: <DrawerFooter />,
        };
      case replaceSpaceWithDash(ESGGroupNames.ENVIRONMENTAL_SCORES_MIS):
      case replaceSpaceWithDash(ESGGroupNames.SOCIAL_SCORES_MIS):
      case replaceSpaceWithDash(ESGGroupNames.GOVERNANCE_SCORES_MIS):
        return {
          drawerHeaderText: IPS_HEADER_TEXT,
          drawerBody: (
            <CISAndIPSBody
              data={ipsDrawerInfo}
              error={fetchIPSDrawerInfoError}
            />
          ),
          drawerFooter: <DrawerFooter />,
        };
      case ANALYST_COMMENTS_DRAWER_TYPE:
        return {
          drawerHeaderText: SCORE_COMMENTS_HEADER_TEXT,
          drawerBody: <ScoreBody />,
          drawerFooter: <DrawerFooter />,
        };
      default:
        return {
          drawerHeaderText: null,
          drawerBody: null,
          drawerFooter: null,
        };
    }
  };

  const { drawerBody, drawerFooter, drawerHeaderText } =
    getDrawerElements(drawerType);

  return (
    <Drawer
      drawerTitle={drawerHeaderText}
      open={isDrawerOpen}
      onClose={() => dispatch(closeDrawer())}
      attribution={true}
      footer={drawerFooter}
      data-testid={`drawer-${drawerType}`}
      hideBackdrop={false}
      elevation={6}
      BackdropProps={{
        invisible: true,
      }}
    >
      {drawerBody}
    </Drawer>
  );
};
