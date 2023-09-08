module.exports = {
  extends: ["@moodys/mdc-config.frontend.stylelint", "stylelint-config-prettier"],
  rules: {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export"]
      }
    ],
    "import-notation": "string"
  }
}
