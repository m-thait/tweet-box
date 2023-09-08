const fs = require("fs");
let result;
let regrexPattern;
let retryNum;
let loopSearch = 0;
let matchString;

const path = "cypress/reports/finalReports/report.json";

function retryHandler(regrexPattern) {
  while (result.search(regrexPattern) >= 0 && loopSearch < 1000) {
    let startPosition = 0;
    matchString = result.match(regrexPattern);
    matchString = matchString[0].match(/retryNum: [0-9]/);
    startPosition = matchString[0].search(/[0-9]/);
    retryNum = matchString[0].substring(startPosition, startPosition + 1);
    result = result.replace(regrexPattern, '"retryTotal": ' + retryNum);
    loopSearch = loopSearch + 1;
  }
}

if (fs.existsSync(path)) {
  try {
    const jsonString = fs.readFileSync(
      "cypress/reports/finalReports/report.json"
    );
    result = JSON.parse(jsonString);
    result = JSON.stringify(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return;
  }

  regrexPattern = /"context":"\\"retryNum: [0-9]\\""/;
  retryHandler(regrexPattern);
  regrexPattern = /"context":"\[.*? {2}\\"retryNum: [0-9]\\".*?\]"/;
  retryHandler(regrexPattern);

  fs.writeFile("cypress/reports/finalReports/report.json", result, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log("Error writing file", err);
    } else {
      // eslint-disable-next-line no-console
      console.log("Successfully wrote file");
    }
  });
} else {
  // eslint-disable-next-line no-console
  console.log("File does not exist:", path);
}
