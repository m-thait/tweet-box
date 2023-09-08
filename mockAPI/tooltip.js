module.exports = [
  {
    sub_sector: {
      headerName: "Sub-sector",
      tooltip: [
        "A distinct subset of a business. Industry assignment is determined based on the company's source of the largest percentage of revenue.",
      ],
    },
    country: {
      headerName: "Country",
      tooltip: [
        "The country of incorporation for a company and where it has its legal address or registered office as defined on Moodys.com.",
      ],
    },
    esg_credit_sector: {
      headerName: "ESG Credit Sector",
      tooltip: [
        "ESG Credit Sectors are assigned by Moody's Investors Service's analysts, and are created by grouping together MIS methodologies that have similar profiles to assess a sector's exposure and credit materiality of ESG risks.",
      ],
    },
    moodys_organization_id: {
      headerName: "Moody's Organization ID",
      tooltip: ["Moody's Analytics ID (MKMV ID or PID)"],
    },
    lt_rating: {
      headerName: "LT Rating",
      tooltip: [
        "The rating for issuers or obligations with an original maturity of one year or more and reflect both on the likelihood of a default on contractually promised payments and the expected financial loss suffered in the event of default.",
      ],
    },
    lt_rating_description: {
      headerName: "LT Rating Description",
      tooltip: ["The rating class associated with the LT Rating."],
    },
    credit_impact_score: {
      headerName: "Credit Impact Score (CIS)",
      tooltip: [
        "Moody’s Investors Service ESG (Environmental, Social and Governance) credit impact scores (CISs) communicate the impact of ESG considerations on the rating of an issuer or transaction. The CIS is based on MIS’ qualitative assessment of the impact of ESG considerations in the context of the issuer’s or transaction’s other credit drivers that are material to a given rating.",
      ],
    },
    environmental_exposure: {
      headerName: "Issuer Profile Score - Environmental",
      tooltip: [
        "E - Moody's Investors Service E issuer profile score (IPS) is an opinion of an issuer’s or transaction’s exposure to environmental risk. The IPS focuses on credit-relevant considerations and the extent to which they are positive or negative for credit profiles, incorporating meaningful mitigating or strengthening actions related to those specific risk exposures.",
      ],
    },
    physical_climate_risks: {
      headerName: "Physical Climate Risk",
      tooltip: [
        "Current and future effects of climate change",
        "Exposure to heat stress water stress, floods, hurricanes sea level rise and wildfires.",
      ],
    },
    carbon_transition: {
      headerName: "Carbon Transition",
      tooltip: [
        "Current positioning for carbon transition",
        "Technology, market and policy risk",
        "Actions to mitigate risk",
        "Long Term resilience to risk of accelerated carbon transition",
      ],
    },
    water_management: {
      headerName: "Water Management",
      tooltip: [
        "Non-climate-related risks",
        "Impact of economic activity",
        "Availability, access and consumption",
        "Innovations to enhance water use efficiency",
        "Risk of pollution-related regulatory violations",
      ],
    },
    natural_capital: {
      headerName: "Natural Capital",
      tooltip: [
        "Impact on natural systems (soil, biodiversity, forest, land, oceans, etc.)",
        "Dependency on goods and services derived from nature (agriculture, fiber, fish, etc.)",
      ],
    },
    waste_and_pollution: {
      headerName: "Waste and Pollution",
      tooltip: [
        "Non-GHG air pollutants",
        "Land-based accidents, spills and leaks",
        "Hazardous and non-hazardous waste",
        "Circular economy",
      ],
    },
    social_exposure: {
      headerName: "Issuer Profile Score - Social",
      tooltip: [
        "S - Moody's Investors Service S issuer profile score (IPS) is an opinion of an issuer’s or transaction’s exposure to social risk. The IPS focuses on credit-relevant considerations and the extent to which they are positive or negative for credit profiles, incorporating meaningful mitigating or strengthening actions related to those specific risk exposures.",
      ],
    },
    customer_relations_private: {
      headerName: "Customer Relations (Private)",
      tooltip: [
        "Data security & customer privacy",
        "Fair disclosure & labelling",
        "Responsible distribution & marketing (Private sector subfactor)",
      ],
    },
    demographic_and_societal_trends_private: {
      headerName: "Demographic and Societal Trends (Private)",
      tooltip: [
        "Demographic change",
        "Access and affordability",
        "Social responsibility",
        "Consumer activism",
      ],
    },
    health_and_safety_private: {
      headerName: "Health and Safety (Private)",
      tooltip: ["Accident & safety management", "Employee health & well-being"],
    },
    human_capital_private: {
      headerName: "Human Capital (Private)",
      tooltip: ["Labor relations", "Human resources", "Diversity & inclusion"],
    },
    responsible_production_private: {
      headerName: "Responsible Production (Private)",
      tooltip: [
        "Product quality",
        "Supply chain management",
        "Community stakeholder engagement",
        "Bribery & corruption",
        "Waste Management",
      ],
    },
    demographics_public: {
      headerName: "Demographics (Public)",
      tooltip: [
        "Age distribution",
        "Immigration",
        "Birth rates",
        "Racial & ethnic composition/trends",
      ],
    },
    labor_and_income_public: {
      headerName: "Labor and Income (Public)",
      tooltip: ["Labor force participation", "Income inequality"],
    },
    education_public: {
      headerName: "Education (Public)",
      tooltip: [
        "Access to primary/secondary/tertiary",
        "Educated populace",
        "Literacy",
      ],
    },
    housing_public: {
      headerName: "Housing (Public)",
      tooltip: ["Availability and access", "Condition of housing"],
    },
    health_and_safety_public: {
      headerName: "Health and Safety (Public)",
      tooltip: [
        "Healthcare",
        "Food security",
        "Environmental quality",
        "Personal safety & well-being",
      ],
    },
    access_to_basic_services_public: {
      headerName: "Access to Basic Services (Public)",
      tooltip: [
        "Water",
        "Sewer",
        "Electricity",
        "Financial services",
        "Transportation",
        "Telecom/Internet",
      ],
    },
    governance_exposure: {
      headerName: "Issuer Profile Score - Governance",
      tooltip: [
        "G - Moody's Investors Service G issuer profile score (IPS) is an opinion of an issuer’s or transaction’s exposure to governance risk. The IPS focuses on credit-relevant considerations and the extent to which they are positive or negative for credit profiles, incorporating meaningful mitigating or strengthening actions related to those specific risk exposures.",
      ],
    },
    financial_strategy_and_risk_management: {
      headerName: "Financial Strategy and Risk Management",
      tooltip: [
        "Leverage policy",
        "Capital modeling and stress testing",
        "M&A strategy",
        "Dividend and capital allocation policies",
        "Risk management polices and controls",
        "Internal controls",
      ],
    },
    management_credibility_and_track_record_private: {
      headerName: "Management Credibility and Track Record",
      tooltip: [
        "Earnings and guidance accuracy",
        "Regulatory relationships",
        "Succession planning and key person risk",
        "Management quality and experience",
        "Project or subsidiary sponsor support",
        "Loss reserve development",
        "Servicer or manager quality",
      ],
    },
    organizational_structure_private: {
      headerName: "Organizational Structure",
      tooltip: [
        "Organizational complexity",
        "Legal and ownership structure",
        "Insider and related-party transactions",
        "Capital structure and organizational funding linkage",
      ],
    },
    compliance_and_reporting_private: {
      headerName: "Compliance and Reporting",
      tooltip: [
        "Regulatory violations",
        "Civil and criminal Investigations",
        "Securities lawsuits and investigations",
        "Bribery and corruption",
        "Accounting policies and disclosures",
        "Consistency and quality of financial reporting",
      ],
    },
    board_structure_policies_and_procedures_private: {
      headerName: "Board Structure, Policies and Procedures",
      tooltip: [
        "Ownership and control",
        "Management Compensation design and disclosure",
        "Board of director oversight and effectiveness",
        "Financial oversight and capital allocation",
      ],
    },
    institutional_structure_public: {
      headerName: "Institutional Structure (Public)",
      tooltip: [
        "Strength of judiciary and civil society",
        "Institutional arrangements that guide fiscal and macroeconomic policy",
        "Control of corruption",
      ],
    },
    policy_credibility_and_effectiveness_public: {
      headerName: "Policy Credibility & Effectiveness (Public)",
      tooltip: [
        "Fiscal policy track-record and effectiveness",
        "Monetary and macroeconomic policy effectiveness",
        "Regulatory effectiveness",
      ],
    },
    budget_management_public: {
      headerName: "Budget Management (Public)",
      tooltip: [
        "Budgetary and forecast accuracy",
        "Management quality and experience",
        "Effective use of multi year planning for operating and capital spending",
      ],
    },
    transparency_and_disclosure_public: {
      headerName: "Transparency and Disclosure (Public)",
      tooltip: [
        "Comprehensiveness and reliability of economic, fiscal, and financial data",
        "Timely financial disclosure",
      ],
    },
    cta_score: {
      headerName: "CTA",
      tooltip: [
        "The carbon transition assessment (CTA) tool provides a consistent, transparent and verifiable means to analyze carbon transition risk for rated non-financial companies. Carbon transition risk is defined as the implications of the policy, legal, technology and market changes likely to be associated with a transition to a lower-carbon economy. CTA scores express an issuer’s positioning with regard to carbon transition risk.",
      ],
    },
  },
];
