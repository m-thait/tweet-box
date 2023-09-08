module.exports = {
  Count: 5,
  Items: [
    {
      scores: {
        L: [
          { M: { ScoreId: { N: "1" }, ScoreDesc: { S: "CIS-1" } } },
          { M: { ScoreId: { N: "2" }, ScoreDesc: { S: "E-1" } } },
          { M: { ScoreId: { N: "3" }, ScoreDesc: { S: "S-1" } } },
          { M: { ScoreId: { N: "4" }, ScoreDesc: { S: "G-1" } } },
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
          { M: { ScoreId: { N: "5" }, ScoreDesc: { S: "CIS-2" } } },
          { M: { ScoreId: { N: "6" }, ScoreDesc: { S: "E-2" } } },
          { M: { ScoreId: { N: "7" }, ScoreDesc: { S: "S-2" } } },
          { M: { ScoreId: { N: "8" }, ScoreDesc: { S: "G-2" } } },
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
          { M: { ScoreId: { N: "9" }, ScoreDesc: { S: "CIS-3" } } },
          { M: { ScoreId: { N: "10" }, ScoreDesc: { S: "E-3" } } },
          { M: { ScoreId: { N: "11" }, ScoreDesc: { S: "S-3" } } },
          { M: { ScoreId: { N: "12" }, ScoreDesc: { S: "G-3" } } },
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
          { M: { ScoreId: { N: "13" }, ScoreDesc: { S: "CIS-4" } } },
          { M: { ScoreId: { N: "14" }, ScoreDesc: { S: "E-4" } } },
          { M: { ScoreId: { N: "15" }, ScoreDesc: { S: "S-4" } } },
          { M: { ScoreId: { N: "16" }, ScoreDesc: { S: "G-4" } } },
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
          { M: {} },
        ],
      },
      identifier: { N: "4" },
    },
    {
      scores: {
        L: [
          { M: { ScoreId: { N: "17" }, ScoreDesc: { S: "CIS-5" } } },
          { M: { ScoreId: { N: "18" }, ScoreDesc: { S: "E-5" } } },
          { M: { ScoreId: { N: "19" }, ScoreDesc: { S: "S-5" } } },
          { M: { ScoreId: { N: "20" }, ScoreDesc: { S: "G-5" } } },
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
