import { EsgUserType, UserInfoResponse } from "@models/api.types";

export const userTypeQueryResponsePremium: UserInfoResponse = {
  userInfo: {
    userId: "1f33d8ad-6e9f-4d83-b40c-a6afec777204",
    userType: EsgUserType.ESG_PREMIUM,
  },
};

export const userTypeQueryResponseCore: UserInfoResponse = {
  userInfo: {
    userId: "1f33d8ad-6e9f-4d83-b40c-a6afec777204",
    userType: EsgUserType.ESG_CORE,
  },
};

export const mockUserTypeState = {
  premium: {
    userType: {
      queries: {
        "fetchUserType(undefined)": {
          status: "fulfilled",
          endpointName: "fetchUserType",
          requestId: "LYC2aO3kaJ0GVknn0-5NU",
          startedTimeStamp: 1679936760489,
          data: "ESG_PREMIUM",
          fulfilledTimeStamp: 1679936761938,
        },
      },
      mutations: {},
      provided: {},
      subscriptions: {
        "fetchUserType(undefined)": {
          "LYC2aO3kaJ0GVknn0-5NU": {
            pollingInterval: 0,
          },
        },
      },
      config: {
        online: true,
        focused: true,
        middlewareRegistered: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMountOrArgChange: false,
        keepUnusedDataFor: 60,
        reducerPath: "userType",
      },
    },
  },
  core: {
    userType: {
      queries: {
        "fetchUserType(undefined)": {
          status: "fulfilled",
          endpointName: "fetchUserType",
          requestId: "LYC2aO3kaJ0GVknn0-5NU",
          startedTimeStamp: 1679936760489,
          data: "ESG_CORE",
          fulfilledTimeStamp: 1679936761938,
        },
      },
      mutations: {},
      provided: {},
      subscriptions: {
        "fetchUserType(undefined)": {
          P8QXys_w1cIHg9m7J_0Al: {
            pollingInterval: 0,
          },
        },
      },
      config: {
        online: true,
        focused: true,
        middlewareRegistered: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        refetchOnMountOrArgChange: false,
        keepUnusedDataFor: 60,
        reducerPath: "userType",
      },
    },
  },
};
