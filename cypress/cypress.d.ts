declare module "@cypress/grep";
declare module "mochawesome/addContext";
declare module "cypress-mochawesome-reporter/register";
declare module "cypress-mochawesome-reporter/plugin";
declare module "@cypress/grep/src/plugin";
declare module "del";

declare namespace Cypress {
  interface Chainable<> {
    visitScreener(): Chainable<null>;
    preVisit(
      esgInfoFixture?: Record<string, unknown>,
      esgListMedianFixture?: Record<string, unknown>
    ): Chainable<null>;
    authVisit(userType?: EsgTestUserTypes): Chainable<null>;
    interceptCommentsDrawer(
      commentsDrawerFixture?: Record<string, unknown>
    ): Chainable<null>;
    verifyDownload(fileType: string, state: State): Chainable<null>;
  }
  interface cy {
    state: State;
  }
}
