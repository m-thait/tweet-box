export const scoreDefinitionMockResponse = [
  {
    cis_definition: [
      {
        definition:
          "For an issuer scored CIS-1 (Positive), its ESG attributes are overall considered as having a positive impact on the rating. The overall positive influence from its ESG attributes on the rating is material.",
        line_id: 1,
      },
    ],
    description: "Positive",
    identifier: 1,
    ips_definition: [
      {
        definition:
          "Issuers or transactions with a Positive E or S issuer profile score typically have exposures to E or S issues that position them strongly, and the exposures carry potential credit benefits.",
        line_id: 1,
      },
      {
        definition:
          "For G, issuers or transactions typically have exposure to G considerations that, in the context of their sector, positions them strongly, with material credit benefits.",
        line_id: 2,
      },
    ],
    scores: [
      { score_desc: "CIS-1", score_id: 1 },
      { score_desc: "E-1", score_id: 2 },
      { score_desc: "S-1", score_id: 3 },
      { score_desc: "G-1", score_id: 4 },
    ],
  },
  {
    cis_definition: [
      {
        definition:
          "For an issuer scored CIS-2 (Neutral-to-Low), its ESG attributes are overall considered as having a neutral-to-low impact on the current rating; i.e., the overall influence of these attributes on the rating is non-material.",
        line_id: 1,
      },
    ],
    description: "Neutral-to-Low",
    identifier: 2,
    ips_definition: [
      {
        definition:
          "Issuers or transactions with a Neutral-to-Low E or S issuer profile score typically have exposures to E or S issues that are not material in differentiating credit quality. In other words, they could be overall slightly credit-positive, credit-neutral, or slightly credit-negative. An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
        line_id: 1,
      },
      {
        definition:
          "Issuers or transactions with a Neutral-to-Low G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them as average, and the exposure is overall neither credit-positive nor negative.",
        line_id: 2,
      },
    ],
    scores: [
      { score_desc: "CIS-2", score_id: 5 },
      { score_desc: "E-2", score_id: 6 },
      { score_desc: "S-2", score_id: 7 },
      { score_desc: "G-2", score_id: 8 },
    ],
  },
  {
    cis_definition: [
      {
        definition:
          "For an issuer scored CIS-3 (Moderately Negative), its ESG attributes are overall considered as having a limited impact on the current rating, with greater potential for future negative impact over time. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-2.",
        line_id: 1,
      },
    ],
    description: "Moderately Negative",
    identifier: 3,
    ips_definition: [
      {
        definition:
          "Issuers or transactions with a Moderately Negative E or S issuer profile score typically have exposures to E or S issues that carry moderately negative credit risks. These issuers may demonstrate some mitigants specifically related to the identified E or S risks, but they are not sufficiently material to fully offset the risks.An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
        line_id: 1,
      },
      {
        definition:
          "Issuers or transactions with a Moderately Negative G issuer profile score typically have exposure to G considerations that, in the context of the sector, positions them below average and the exposure carries overall moderately negative credit risks.",
        line_id: 2,
      },
    ],
    scores: [
      { score_desc: "CIS-3", score_id: 9 },
      { score_desc: "E-3", score_id: 10 },
      { score_desc: "S-3", score_id: 11 },
      { score_desc: "G-3", score_id: 12 },
    ],
  },
  {
    cis_definition: [
      {
        definition:
          "For an issuer scored CIS-4 (Highly Negative), its ESG attributes are overall considered as having a discernible negative impact on the current rating. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-3.",
        line_id: 1,
      },
    ],
    description: "Highly Negative",
    identifier: 4,
    ips_definition: [
      {
        definition:
          "Issuers or transactions with a Highly Negative E or S issuer profile score typically have exposures to E or S issues that position them weakly, and the exposure carries high credit risks. These issuers may demonstrate some mitigants specifically tied to the E or S risks identified, but they generally have limited effect on the risks.",
        line_id: 1,
      },
      {
        definition:
          "Issuers or transactions with a Highly Negative G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them weakly and the exposure carries overall highly negative credit risks.",
        line_id: 2,
      },
    ],
    scores: [
      { score_desc: "CIS-4", score_id: 13 },
      { score_desc: "E-4", score_id: 14 },
      { score_desc: "S-4", score_id: 15 },
      { score_desc: "G-4", score_id: 16 },
    ],
  },
  {
    cis_definition: [
      {
        definition:
          "For an issuer scored CIS-5 (Very Highly Negative), its ESG attributes are overall considered as having a very high negative impact on the current rating. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-4.",
        line_id: 1,
      },
    ],
    description: "Very Highly Negative",
    identifier: 5,
    ips_definition: [
      {
        definition:
          "Issuers or transactions with a Very Highly Negative E or S issuer profile score typically have exposures to E or S issues that position them very poorly, and the exposure carries very high credit risks.While these issuers or transactions may demonstrate some mitigants specifically related to the identified E or S risks, they are not meaningful relative to the magnitude of the risks. An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
        line_id: 1,
      },
      {
        definition:
          "Issuers or transactions with a Very Highly Negative G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them very poorly and the exposure carries overall very high credit risks.",
        line_id: 2,
      },
    ],
    scores: [
      { score_desc: "CIS-5", score_id: 17 },
      { score_desc: "E-5", score_id: 18 },
      { score_desc: "S-5", score_id: 19 },
      { score_desc: "G-5", score_id: 20 },
    ],
  },
];

export const mockCisAccordionDataStoreState = [
  {
    titles: ["CIS-1"],
    content: "TEST CONTENT CIS-1",
    score: 1,
    description: "Positive",
  },
  {
    titles: ["CIS-2"],
    content: "TEST CONTENT CIS-2",
    score: 2,
    description: "Neutral-to-low",
  },
  {
    titles: ["CIS-3"],
    content: "TEST CONTENT CIS-3",
    score: 3,
    description: "Moderately Negative",
  },
  {
    titles: ["CIS-4"],
    content: "TEST CONTENT CIS-4",
    score: 4,
    description: "Highly Negative",
  },
  {
    titles: ["CIS-5"],
    content: "TEST CONTENT CIS-5",
    score: 5,
    description: "Very Highly Negative",
  },
];

export const mockIpsAccordionDataStoreState = [
  {
    titles: ["E-1", "S-1", "G-1"],
    content: "TEST CONTENT IPS-1",
    score: 1,
    description: "Positive",
  },
  {
    titles: ["E-2", "S-2", "G-2"],
    content: "TEST CONTENT IPS-2",
    score: 2,
    description: "Neutral-to-low",
  },
  {
    titles: ["E-3", "S-3", "G-3"],
    content: "TEST CONTENT IPS-3",
    score: 3,
    description: "Moderately Negative",
  },
  {
    titles: ["E-4", "S-4", "G-4"],
    content: "TEST CONTENT IPS-4",
    score: 4,
    description: "Highly Negative",
  },
  {
    titles: ["E-5", "S-5", "G-5"],
    content: "TEST CONTENT IPS-5",
    score: 5,
    description: "Very Highly Negative",
  },
];

export const mockScoreDefinitionStoreState = {
  scoreDefinition: {
    queries: {
      "fetchScoreDefinition(undefined)": {
        status: "fulfilled",
        endpointName: "fetchScoreDefinition",
        requestId: "iz8EMIStf9QRNlccxmKVs",
        startedTimeStamp: 1668732038406,
        data: scoreDefinitionMockResponse,
        fulfilledTimeStamp: 1668732039013,
      },
    },
    mutations: {},
    provided: {},
    subscriptions: {
      "fetchScoreDefinition(undefined)": {
        iz8EMIStf9QRNlccxmKVs: {
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
      reducerPath: "scoreDefinition",
    },
  },
  ui: {
    drawer: {
      cisAccordionData: mockCisAccordionDataStoreState,
      ipsAccordionData: mockIpsAccordionDataStoreState,
    },
  },
};

export const scoreDefinitionQueryResponse = {
  Count: 5,
  Items: [
    {
      scores: {
        L: [
          { M: { score_id: { N: "1" }, score_desc: { S: "CIS-1" } } },
          { M: { score_id: { N: "2" }, score_desc: { S: "E-1" } } },
          { M: { score_id: { N: "3" }, score_desc: { S: "S-1" } } },
          { M: { score_id: { N: "4" }, score_desc: { S: "G-1" } } },
        ],
      },
      cis_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "For an issuer scored CIS-1 (Positive), its ESG attributes are overall considered as having a positive impact on the rating. The overall positive influence from its ESG attributes on the rating is material.",
              },
            },
          },
        ],
      },
      description: { S: "Positive" },
      ips_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "Issuers or transactions with a Positive E or S issuer profile score typically have exposures to E or S issues that position them strongly, and the exposures carry potential credit benefits.",
              },
            },
          },
          {
            M: {
              line_id: { N: "2" },
              definition: {
                S: "For G, issuers or transactions typically have exposure to G considerations that, in the context of their sector, positions them strongly, with material credit benefits.",
              },
            },
          },
        ],
      },
      identifier: { N: "1" },
    },
    {
      scores: {
        L: [
          { M: { score_id: { N: "5" }, score_desc: { S: "CIS-2" } } },
          { M: { score_id: { N: "6" }, score_desc: { S: "E-2" } } },
          { M: { score_id: { N: "7" }, score_desc: { S: "S-2" } } },
          { M: { score_id: { N: "8" }, score_desc: { S: "G-2" } } },
        ],
      },
      cis_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "For an issuer scored CIS-2 (Neutral-to-Low), its ESG attributes are overall considered as having a neutral-to-low impact on the current rating; i.e., the overall influence of these attributes on the rating is non-material.",
              },
            },
          },
        ],
      },
      description: { S: "Neutral-to-Low" },
      ips_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "Issuers or transactions with a Neutral-to-Low E or S issuer profile score typically have exposures to E or S issues that are not material in differentiating credit quality. In other words, they could be overall slightly credit-positive, credit-neutral, or slightly credit-negative. An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
              },
            },
          },
          {
            M: {
              line_id: { N: "2" },
              definition: {
                S: "Issuers or transactions with a Neutral-to-Low G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them as average, and the exposure is overall neither credit-positive nor negative.",
              },
            },
          },
        ],
      },
      identifier: { N: "2" },
    },
    {
      scores: {
        L: [
          { M: { score_id: { N: "9" }, score_desc: { S: "CIS-3" } } },
          { M: { score_id: { N: "10" }, score_desc: { S: "E-3" } } },
          { M: { score_id: { N: "11" }, score_desc: { S: "S-3" } } },
          { M: { score_id: { N: "12" }, score_desc: { S: "G-3" } } },
        ],
      },
      cis_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "For an issuer scored CIS-3 (Moderately Negative), its ESG attributes are overall considered as having a limited impact on the current rating, with greater potential for future negative impact over time. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-2.",
              },
            },
          },
        ],
      },
      description: { S: "Moderately Negative" },
      ips_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "Issuers or transactions with a Moderately Negative E or S issuer profile score typically have exposures to E or S issues that carry moderately negative credit risks. These issuers may demonstrate some mitigants specifically related to the identified E or S risks, but they are not sufficiently material to fully offset the risks.An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
              },
            },
          },
          {
            M: {
              line_id: { N: "2" },
              definition: {
                S: "Issuers or transactions with a Moderately Negative G issuer profile score typically have exposure to G considerations that, in the context of the sector, positions them below average and the exposure carries overall moderately negative credit risks.",
              },
            },
          },
        ],
      },
      identifier: { N: "3" },
    },
    {
      scores: {
        L: [
          { M: { score_id: { N: "13" }, score_desc: { S: "CIS-4" } } },
          { M: { score_id: { N: "14" }, score_desc: { S: "E-4" } } },
          { M: { score_id: { N: "15" }, score_desc: { S: "S-4" } } },
          { M: { score_id: { N: "16" }, score_desc: { S: "G-4" } } },
        ],
      },
      cis_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "For an issuer scored CIS-4 (Highly Negative), its ESG attributes are overall considered as having a discernible negative impact on the current rating. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-3.",
              },
            },
          },
        ],
      },
      description: { S: "Highly Negative" },
      ips_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "Issuers or transactions with a Highly Negative E or S issuer profile score typically have exposures to E or S issues that position them weakly, and the exposure carries high credit risks. These issuers may demonstrate some mitigants specifically tied to the E or S risks identified, but they generally have limited effect on the risks.",
              },
            },
          },
          {
            M: {
              line_id: { N: "2" },
              definition: {
                S: "Issuers or transactions with a Highly Negative G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them weakly and the exposure carries overall highly negative credit risks.",
              },
            },
          },
        ],
      },
      identifier: { N: "4" },
    },
    {
      scores: {
        L: [
          { M: { score_id: { N: "17" }, score_desc: { S: "CIS-5" } } },
          { M: { score_id: { N: "18" }, score_desc: { S: "E-5" } } },
          { M: { score_id: { N: "19" }, score_desc: { S: "S-5" } } },
          { M: { score_id: { N: "20" }, score_desc: { S: "G-5" } } },
        ],
      },
      cis_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "For an issuer scored CIS-5 (Very Highly Negative), its ESG attributes are overall considered as having a very high negative impact on the current rating. The negative influence of the overall ESG attributes on the rating is more pronounced compared to an issuer scored CIS-4.",
              },
            },
          },
        ],
      },
      description: { S: "Very Highly Negative" },
      ips_definition: {
        L: [
          {
            M: {
              line_id: { N: "1" },
              definition: {
                S: "Issuers or transactions with a Very Highly Negative E or S issuer profile score typically have exposures to E or S issues that position them very poorly, and the exposure carries very high credit risks.While these issuers or transactions may demonstrate some mitigants specifically related to the identified E or S risks, they are not meaningful relative to the magnitude of the risks. An issuer or transaction may have a Neutral-to-Low score because the exposure is not material or because there are mitigants specifically related to any E or S risks that are sufficient to offset those risks.",
              },
            },
          },
          {
            M: {
              line_id: { N: "2" },
              definition: {
                S: "Issuers or transactions with a Very Highly Negative G issuer profile score typically have exposure to G considerations that, in the context of their sector, positions them very poorly and the exposure carries overall very high credit risks.",
              },
            },
          },
        ],
      },
      identifier: { N: "5" },
    },
  ],
  ScannedCount: 5,
};
