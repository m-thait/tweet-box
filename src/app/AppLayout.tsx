import React, { FC, useLayoutEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import { useLayoutContext } from "MdcShell/Layout";
import { AppContent } from "./AppContent";

export const AppLayout: FC = () => {
  const { setThemeMode, setHeaderVariant } = useLayoutContext();

  useLayoutEffect(() => {
    setThemeMode("dark");
    setHeaderVariant("semi-sticky");
  }, [setThemeMode, setHeaderVariant]);

  return <AppContent />;
};
