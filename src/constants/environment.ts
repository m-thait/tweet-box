export enum DOMAIN_HOST {
  PRD = "www.moodys.com",
  STG = "stg.moodys.com",
  DEV = "dev.moodys.com",
  DEVELOPMENT = "dev.moodys.com",
  LOCALHOST = "dev.moodys.com",
}

export const isLocalDevelopment = window.location.host.indexOf(":3001") !== -1;

export const ACCOUNT_SUBSCRIPTION_PATH = "/account/subscription";
