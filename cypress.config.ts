import { defineConfig } from "cypress";
require("dotenv").config();
import mochaReport from "cypress-mochawesome-reporter/plugin";
import grepCypress from "@cypress/grep/src/plugin";
const del = require("del");
const { verifyDownloadTasks } = require("cy-verify-downloads");

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results.stats.failures === 0 && results.video) {
          return del(results.video, { force: true });
        }
      });
      on("task", verifyDownloadTasks);
      config.env.ESG_USER_CORE_CREDENTIALS =
        process.env.ESG_USER_CORE_CREDENTIALS;
      config.env.ESG_USER_PREMIUM_CREDENTIALS =
        process.env.ESG_USER_PREMIUM_CREDENTIALS;
      config.env.ESG_USER_SR_CREDENTIALS = process.env.ESG_USER_SR_CREDENTIALS;
      config.env.ESG_USER_SECTOR_CREDENTIALS =
        process.env.ESG_USER_SECTOR_CREDENTIALS;
      config.env.BYPASS_OKTA = process.env.BYPASS_OKTA;
      mochaReport(on);
      grepCypress(config);
      return config;
    },
    baseUrl: "http://localhost:3001/",
    projectId: "7ved2t",
    blockHosts: [
      "*.qualtrics.com",
      "*.adobedtm.com",
      "*fonts.cdnfonts.com*",
      "*onetrust.com",
      "*cookielaw.org",
    ],
    viewportWidth: 1600,
    viewportHeight: 768,
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.ts",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    video: true,
    defaultCommandTimeout: 60000,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    taskTimeout: 60000,
    videosFolder: "cypress/reports/finalReports/videos",
    screenshotsFolder: "cypress/reports/screensshots",
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled:
        "mochawesome,cypress-mochawesome-reporter,mocha-junit-reporter",
      mochawesomeReporterOptions: {
        reportDir: "cypress/reports/source/json",
        quiet: true,
        overwrite: false,
        html: false,
        json: true,
      },
      cypressMochawesomeReporterReporterOptions: {
        reportDir: "cypress/reports/finalReports",
        reportFilename: "mdc-screener-web_report",
        charts: true,
        reportPageTitle: "MDC SCREENER WEB Tests",
        embeddedScreenshots: true,
        inlineAssets: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: "cypress/reports/source/junit/test_results[hash].xml",
        toConsole: false,
      },
    },
    env: {
      username: "username_to_replace",
      password: "password_to_replace",
      sampleEnv: "sampleValue",
      grepFilterSpecs: true,
    },
  },
});
