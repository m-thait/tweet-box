/* eslint-disable @typescript-eslint/no-var-requires */
import interceptURLs from "../fixtures/interceptURLs";
import esgInfo from "../fixtures/esg-info";
import esgListMedian from "../fixtures/list-median";
import esgComments from "../fixtures/esg-comments";
import esgFacetsCountry from "../fixtures/esg-facets-country";
import esgFacetsSubSector from "../fixtures/esg-facets-sub-sector";
import esgFacetsLtRating from "../fixtures/esg-facets-lt-rating";
import taxonomy from "../fixtures/taxonomy";
import cisEducation from "../fixtures/cis-education";
import ipsEducation from "../fixtures/ips-education";
import scoreDefinition from "../fixtures/score-definition";
import ltRatingSparklines from "../fixtures/lt-rating-sparklines";
import { getCredentials, EsgTestUserTypes } from "../utils/getCredentials";
import { getLogin } from "../utils/login";

require("cy-verify-downloads").addCustomCommand();
Cypress.Commands.add("visitScreener", () => {
  cy.visit("/", { failOnStatusCode: false });
  cy.wait([
    "@esg-info",
    "@esg-list-median",
    "@esg-facet-country",
    "@esg-facet-subSector",
    "@esg-facet-ltRating",
    "@taxonomy",
    "@cis-education",
    "@ips-education",
    "@score-definition",
    "@ltRatingSparklines",
  ]);
});

const interceptWithFixture = (
  esgInfoFixture: Record<string, unknown>,
  esgListMedianFixture: Record<string, unknown>
) => {
  cy.intercept(
    interceptURLs.esgInfo,
    esgInfoFixture ? esgInfoFixture : esgInfo
  ).as("esg-info");
  cy.intercept(
    interceptURLs.esgListMedian,
    esgListMedianFixture ? esgListMedianFixture : esgListMedian
  ).as("esg-list-median");
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "country") {
      req.reply(esgFacetsCountry);
    }
  }).as("esg-facet-country");
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "subSector") {
      req.reply(esgFacetsSubSector);
    }
  }).as("esg-facet-subSector");
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "ltRating") {
      req.reply(esgFacetsLtRating);
    }
  }).as("esg-facet-ltRating");
  cy.intercept(interceptURLs.taxonomy, taxonomy).as("taxonomy");
  cy.intercept(interceptURLs.esgCisEducation, cisEducation).as("cis-education");
  cy.intercept(interceptURLs.esgIpsEducation, ipsEducation).as("ips-education");
  cy.intercept(interceptURLs.scoreDefinition, scoreDefinition).as(
    "score-definition"
  );
  cy.intercept(interceptURLs.ltRatingSparklines, ltRatingSparklines).as(
    "ltRatingSparklines"
  );
};

const interceptWithoutFixture = () => {
  cy.intercept(interceptURLs.esgInfo).as("esg-info");
  cy.intercept(interceptURLs.esgListMedian).as("esg-list-median");
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "country") {
      req.alias = "esg-facet-country";
    }
  });
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "subSector") {
      req.alias = "esg-facet-subSector";
    }
  });
  cy.intercept(interceptURLs.esgFacets, (req) => {
    if (req.body?.facet && req.body.facet === "ltRating") {
      req.alias = "esg-facet-ltRating";
    }
  });
  cy.intercept(interceptURLs.taxonomy, taxonomy).as("taxonomy");
  cy.intercept(interceptURLs.esgCisEducation).as("cis-education");
  cy.intercept(interceptURLs.esgIpsEducation).as("ips-education");
  cy.intercept(interceptURLs.scoreDefinition).as("score-definition");
  cy.intercept(interceptURLs.ltRatingSparklines).as("ltRatingSparklines");
};

Cypress.Commands.add("interceptCommentsDrawer", (commentsDrawerFixture) => {
  cy.intercept(
    interceptURLs.esgComments,
    commentsDrawerFixture ? commentsDrawerFixture : esgComments
  ).as("esg-comments");
});

Cypress.Commands.add("preVisit", (esgInfoFixture, esgListMedianFixture) => {
  if (Cypress.config("baseUrl")?.includes("localhost")) {
    interceptWithFixture(
      esgInfoFixture ?? esgInfo,
      esgListMedianFixture ?? esgListMedian
    );
  } else {
    interceptWithoutFixture();
  }
  Cypress.on("uncaught:exception", () => {
    return false;
  });
});

Cypress.Commands.add(
  "authVisit",
  (userType: EsgTestUserTypes = EsgTestUserTypes.ESG_PREMIUM) => {
    const { username, password } = getCredentials(userType);
    cy.session(
      userType,
      () => {
        getLogin(username, password);
      },
      {
        validate() {
          if (Cypress.config("baseUrl")?.includes("localhost")) {
            expect(true).to.be.eq(true);
          } else {
            cy.window().then((win) => {
              const localStorage = JSON.parse(
                win.localStorage.getItem("okta-token-storage") ||
                  "{'test' : 'testvalue'}"
              );
              const accessToken = JSON.stringify(
                localStorage.accessToken.accessToken
              );
              expect(accessToken).to.be.string;
            });
          }
        },
        cacheAcrossSpecs: true,
      }
    );
  }
);
