const jsonServer = require("json-server");

// mock data imports
const esgFacetsIssuerName = require("./esg-facets-issuer-name");
const esgFacetsCountry = require("./esg-facets-country");
const esgFacetsSubSector = require("./esg-facets-sub-sector");
const esgFacetsLTRating = require("./esg-facets-lt-rating");
const esgInfo100 = require("./esg-info-100");
const esgInfo200 = require("./esg-info-200");
const taxonomy = require("./taxonomy");
const esgListMedian = require("./esg-list-median");
const esgComments = require("./esg-comments");
const scoreDefinition = require("./score-definition");
const cisEducation = require("./cis-education.js");
const ipsEducation = require("./ips-education.js");
const tooltip = require("./tooltip");
const aemDisclaimer = require("./aem-disclaimer.json");
const server = jsonServer.create();
const router = jsonServer.router("./mockAPI/db.json");
const middlewares = jsonServer.defaults();
const MOCK_API_PORT = 3001;
const SCREENER_BASE_URL = "/screener/api";

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.post(`${SCREENER_BASE_URL}/esg-facets`, (req, res) => {
  const { facet } = req.body;
  switch (facet) {
    case "orgName":
      res.jsonp(esgFacetsIssuerName);
      break;
    case "country":
      res.jsonp(esgFacetsCountry);
      break;
    case "subSector":
      res.jsonp(esgFacetsSubSector);
      break;
    case "ltRating":
      res.jsonp(esgFacetsLTRating);
      break;
  }
});

server.post(`${SCREENER_BASE_URL}/esg-info`, (req, res) => {
  const { offset } = req.body;
  if (offset === 0) {
    res.jsonp(esgInfo100);
  } else {
    res.jsonp(esgInfo200);
  }
});

server.post(`${SCREENER_BASE_URL}/esg-list-median`, (req, res) => {
  res.jsonp(esgListMedian);
});

server.post(`${SCREENER_BASE_URL}/esg-comments`, (req, res) => {
  res.jsonp(esgComments);
});

server.get("/taxonomy/api/reference", (req, res) => {
  res.jsonp(taxonomy);
});

server.get("/web/esg-api/en/us/esg_ips_education.headless.json", (req, res) => {
  res.jsonp(ipsEducation);
});

server.get("/web/esg-api/en/us/esg_cis_education.headless.json", (req, res) => {
  res.jsonp(cisEducation);
});

server.get("/web/esg-api/en/us/esg_tooltip.headless.json", (req, res) => {
  res.jsonp(tooltip);
});

server.get(`${SCREENER_BASE_URL}/score-definition`, (req, res) => {
  res.jsonp(scoreDefinition);
});

server.get("/web/rv-api/en/us/disclaimer.modal.json", (req, res) => {
  res.jsonp(aemDisclaimer);
});

// Use default router
server.use(router);
server.listen(MOCK_API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running on port ${MOCK_API_PORT}`);
});
