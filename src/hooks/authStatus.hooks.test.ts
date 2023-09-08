import { EventBusTopic } from "@moodys/mdc-frontend.utils.event-bus";
import { renderHook, cleanup } from "@testing-library/react";
import { useAuthStatus } from "./authStatus.hooks";
import { useEventBus } from "./useEventBus";

jest.mock("./useEventBus");

describe("useAuthState() Hook", () => {
  const env = Object.assign({}, process.env);
  beforeEach(() => {
    process.env = {};
    cleanup();
  });
  afterEach(() => {
    process.env = env;
  });
  it("should return mock values", () => {
    (useEventBus as jest.Mock).mockImplementation((topic) => {
      switch (topic) {
        case EventBusTopic.UserDetails:
          return [{ email: "user@example.com" }];
        case EventBusTopic.IsAuthenticated:
          return [true];
        default:
          return [];
      }
    });

    const { result } = renderHook(() => useAuthStatus());
    expect(result.current.userDetails?.email).toBe("user@example.com");
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAuthenticationComplete).toBe(true);
  });
  it("should trigger open sign in modal", () => {
    const setSignInModalOpen = jest.fn();

    (useEventBus as jest.Mock).mockImplementation((topic) => {
      switch (topic) {
        case EventBusTopic.UserDetails:
          return [{ email: "user@example.com" }];
        case EventBusTopic.IsAuthenticated:
          return [false];
        case EventBusTopic.SignInModalOpen:
          // eslint-disable-next-line no-sparse-arrays
          return [undefined, setSignInModalOpen];
        default:
          return [];
      }
    });

    renderHook(() => useAuthStatus());
    expect(setSignInModalOpen).toHaveBeenCalledWith({ hideCloseButton: true });
  });
  it("should bypass sign in and return bypass values", () => {
    process.env.BYPASS_OKTA = "true";

    const { result } = renderHook(() => useAuthStatus());
    expect(result.current.userDetails?.email).toBe("bypassUser@moodys.com");
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAuthenticationComplete).toBe(true);
  });
});
