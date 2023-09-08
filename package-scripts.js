module.exports = {
  scripts: {
    default: "webpack serve --open",
    beforeTest: {
      removeTestingFolder: "rimraf ./cypress/reports",
      createTestingFolder: "mkdirp ./cypress/reports/finalReports",
      seriesE2E:
        "nps beforeTest.removeTestingFolder beforeTest.createTestingFolder",
      startServerAndTest:
        'start-server-and-test start http-get://localhost:3001/ "nps executeTest.prTest"',
      seriesLocal:
        "nps beforeTest.removeTestingFolder beforeTest.createTestingFolder beforeTest.startServerAndTest",
    },
    afterTest: {
      mergeJunitReports:
        'jrm ./cypress/reports/finalReports/junit.xml "./cypress/reports/source/junit/*.xml"',
      mergeJsonReports:
        "mochawesome-merge cypress/reports/source/json/*.json > cypress/reports/finalReports/report.json",
      addRetryInJsonReport:
        "node testing/retry.js && cat cypress/reports/finalReports/report.json",
      series:
        "nps afterTest.mergeJunitReports afterTest.mergeJsonReports afterTest.addRetryInJsonReport",
    },
    uploadResultsToS3: {
      default:
        "aws s3 cp cypress/reports/finalReports s3://${s3_bucket}/${application}-testing/ui/cypress/${env}/${CODEBUILD_BUILD_NUMBER}/ --recursive",
      localS3:
        "aws s3 cp cypress/reports/finalReports s3://${s3_bucket}/${APPLICATION}-testing/pr/${CODEBUILD_BUILD_NUMBER}/ --recursive",
      lighthouseHTMLToS3:
        "aws s3 cp testing/ui/accessibility.report.json s3://${s3_bucket}/${application}-testing/ui/accessibility/${CODEBUILD_BUILD_NUMBER}/",
      lighthouseJsonToS3:
        "aws s3 cp testing/ui/accessibility.report.html s3://${s3_bucket}/${application}-testing/ui/accessibility/${CODEBUILD_BUILD_NUMBER}/",
    },
    executeTest: {
      prTest:
        'cypress run --spec "cypress/e2e/**/*.cy.ts" --env grepTags="@pr"',
      devTest:
        'cypress run --record --parallel --ci-build-id ${CODEBUILD_INITIATOR} --spec "cypress/e2e/**/*.cy.ts" --env grepTags="@dev" --config baseUrl=https://${env}.moodys.com/screener/',
      stgTest:
        'cypress run --record --parallel --ci-build-id ${CODEBUILD_INITIATOR} --spec "cypress/e2e/**/*.cy.ts" --env grepTags="@stg" --config baseUrl=https://${env}.moodys.com/screener/',
      prdTest:
        'cypress run --record --parallel --ci-build-id ${CODEBUILD_INITIATOR} --spec "cypress/e2e/**/*.cy.ts" --env grepTags="@prd" --config baseUrl=https://www.moodys.com/screener/',
      lighthouse:
        'lighthouse https://stg.moodys.com/screener/ --quiet --chrome-flags="--no-sandbox --headless --disable-gpu" --screenEmulation.disabled --only-categories=accessibility --output html,json --output-path ./testing/ui/accessibility.html',
    },
    choreCommand: {
      createFakeJunitReport:
        'echo \'<?xml version="1.0"?><testsuites failures="0" errors="0" tests="1"><testsuite name="fake cypress junit" id="58ec0c6f-4151-4dc0-95a3-a44459fc6988" timestamp="2021-12-09T18:08:45.127Z" tests="1" failures="0" errors="0" time="2"><testcase name="fake result" time="2" classname="fakeJunit"/></testsuite></testsuites>\' >cypress/reports/finalReports/junit.xml',
      createFakeJunitJest:
        'echo \'<?xml version="1.0"?><testsuites failures="0" errors="0" tests="1"><testsuite name="fake jest junit" id="58ec0c6f-4151-4dc0-95a3-a44459fc6988" timestamp="2021-12-09T18:08:45.127Z" tests="1" failures="0" errors="0" time="2"><testcase name="fake result" time="2" classname="fakeJunit"/></testsuite></testsuites>\' >cypress/reports/finalReports/junit.xml',
    },
    localhostTest: {
      default: "nps beforeTest.seriesLocal",
    },
    devTest: {
      default: "nps beforeTest.seriesE2E executeTest.devTest",
    },
    stgTest: {
      default: "nps beforeTest.seriesE2E executeTest.stgTest",
    },
    prdTest: {
      default: "nps beforeTest.seriesE2E executeTest.prdTest",
    },
    localReport: {
      default: "nps afterTest.series uploadResultsToS3.localS3",
    },
    devReport: {
      default: "nps afterTest.series uploadResultsToS3",
    },
    stgReport: {
      default: "nps afterTest.series uploadResultsToS3",
    },
    prdReport: {
      default: "nps afterTest.series uploadResultsToS3",
    },
  },
};
