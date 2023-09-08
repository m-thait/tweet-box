import { useEffect } from "react";
import { EventBusTopic } from "@moodys/mdc-frontend.utils.event-bus";
import { useEventBus } from "./useEventBus";

export const useAuthStatus = () => {
  const [, setSignInModalOpen] = useEventBus(EventBusTopic.SignInModalOpen);
  const [userDetails] = useEventBus(EventBusTopic.UserDetails);
  const [isAuthenticated] = useEventBus(EventBusTopic.IsAuthenticated);

  const isLoading = typeof isAuthenticated === "undefined";
  const isAuthenticatedUser = !!isAuthenticated;
  const bypassSignInEnabled = process.env?.BYPASS_OKTA === "true";
  const isAuthenticationComplete = isAuthenticated && userDetails !== undefined;

  useEffect(() => {
    if (!bypassSignInEnabled && !isLoading && isAuthenticated === false) {
      setSignInModalOpen({ hideCloseButton: true });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, bypassSignInEnabled]);

  if (bypassSignInEnabled) {
    return {
      userDetails: { email: "bypassUser@moodys.com" },
      isAuthenticated: true,
      isAuthenticationComplete: true,
    };
  }

  return {
    userDetails,
    isAuthenticated: isAuthenticatedUser,
    isAuthenticationComplete,
  };
};
