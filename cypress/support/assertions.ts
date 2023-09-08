chai.use((_chai) => {
  function isInViewport(this: Chai.AssertionStatic) {
    const bottom = Cypress.$(cy.state("window")).innerHeight() ?? 0;
    const side = Cypress.$(cy.state("window")).innerWidth() ?? 0;
    const rect = this._obj[0].getBoundingClientRect();

    this.assert(
      viewCalculation({ rect, bottom, side }),
      "expected #{this} to be in viewport",
      "expected #{this} to not be in viewport",
      this._obj
    );
  }
  _chai.Assertion.addMethod("inViewport", isInViewport);
});

interface CalculationParameters {
  rect: { [key: string]: number };
  bottom: number;
  side: number;
}

const viewCalculation = ({ rect, bottom, side }: CalculationParameters) => {
  return (
    rect.top < bottom &&
    rect.bottom < bottom &&
    rect.left < side &&
    rect.left >= 0 &&
    rect.bottom > 0
  );
};
