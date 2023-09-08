export enum EsgTestUserTypes {
  ESG_PREMIUM = "ESG_USER_PREMIUM_CREDENTIALS",
  ESG_CORE = "ESG_USER_CORE_CREDENTIALS",
  ESG_SR = "ESG_USER_SR_CREDENTIALS",
}

export const getCredentials = (key: EsgTestUserTypes) => {
  const credentials =
    Cypress?.env?.(key) ?? JSON.stringify({ username: "", password: "" });

  const { username: uname, password: pass } = JSON.parse(credentials);

  return {
    username: uname,
    password: pass,
  };
};
