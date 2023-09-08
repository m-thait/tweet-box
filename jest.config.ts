import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,js,tsx,jsx}",
    "!**/config/**",
    "!**/index.{tsx,ts}",
    "!src/**/*.d.ts",
    "!src/**/*.types.ts",
    "!src/app/*.{ts,tsx}",
    "!src/views/**/*.{ts,tsx}",
    "!src/services/splitIO/*.{ts,tsx}",
    "!src/services/analytics/avo-events.ts",
    "!src/services/analytics/avo-setup.tsx",
    "!src/services/analytics/Avo.ts",
    "!src/styles/**/*.ts",
    "!src/service-worker.ts",
    "!src/bootstrap.tsx",
  ],
  testPathIgnorePatterns: ["<rootDir>/cypress/", "/node_modules/", "Avo.ts"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./build/",
        outputName: "junit.xml",
      },
    ],
  ],
  transform: { ".(ts|tsx)": "ts-jest" },
  testResultsProcessor: "jest-junit",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@views/(.*)$": "<rootDir>/src/views/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@root/(.*)$": "<rootDir>/$1",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleDirectories: ["node_modules", "src"],
};
export default config;
