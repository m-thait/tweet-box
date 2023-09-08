export const mockAemStoreState = {
  aem: {
    queries: {
      "fetchCISDrawerInfo(undefined)": {
        status: "fulfilled",
        endpointName: "fetchCISDrawerInfo",
        requestId: "6DEm0IuTSK66WXBp2kTDl",
        startedTimeStamp: 1666139197716,
        data: [
          {
            body: "<p>The Moody's Investors Service (MIS) ESG credit impact score (CIS) is an output of the rating process that more transparently communicates the impact of ESG considerations on the rating of an issuer or transaction.</p>\n",
            title: "<p>Overview</p>\n",
          },
          {
            body: "<p>MIS seeks to incorporate all material credit considerations, including ESG considerations, into ratings and to take the most forward-looking perspective that visibility into these risks and mitigants permits. </p>\n",
            title:
              "<p><b>The Influence of ESG Considerations on a Rating</b></p>\n",
          },
          {
            body: "<p>There is some minimum relationship between the IPSs and the CIS: if exposure to ESG risks is limited, then it is likely that ESG has a limited impact on the rating. </p>\n",
            title:
              "<p><b>Relationship between the ESG Credit Impact Score (CIS) and the Issuer Profile Score (IPS)</b></p>\n",
          },
        ],
        fulfilledTimeStamp: 1666139198348,
      },
      "fetchIPSDrawerInfo(undefined)": {
        status: "fulfilled",
        endpointName: "fetchIPSDrawerInfo",
        requestId: "oUgJ63zQXgrpbXaGSgqqG",
        startedTimeStamp: 1666139197720,
        data: [
          {
            body: "<p>Moody's Investors Service (MIS) ESG issuer profile scores (E, S and G IPSs) are opinions of an issuer or transaction's exposure to E, S and G considerations.</p>\n",
            title: "<p><b>Overview</b></p>\n",
          },
          {
            body: "<p>In establishing the E, S or G IPSs, MIS makes a qualitative assessment of the overall E S or G issuer exposure against the scoring scale definitions.</p>\n",
            title:
              "<p><b>Arriving at the E, S and G Issuer Profile Scopes (IPSs)</b></p>\n",
          },
        ],
        fulfilledTimeStamp: 1666139198851,
      },
    },
    mutations: {},
    provided: {},
    subscriptions: {
      "fetchCISDrawerInfo(undefined)": {
        "6DEm0IuTSK66WXBp2kTDl": {
          pollingInterval: 0,
        },
        "42I5CVOjThVBqfeolvU0B": {
          pollingInterval: 0,
        },
      },
      "fetchIPSDrawerInfo(undefined)": {
        oUgJ63zQXgrpbXaGSgqqG: {
          pollingInterval: 0,
        },
        fgZY4l5CvXWdxqzWuBnQW: {
          pollingInterval: 0,
        },
      },
    },
    config: {
      online: true,
      focused: true,
      middlewareRegistered: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: "aem",
    },
  },
};
