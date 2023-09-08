module.exports = {
  extends: [require.resolve("@moodys/mdc-config.frontend.eslint")],
  rules: {
    "jest/valid-describe": "off",
    "max-params": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "unknown",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
  },
  parserOptions: { warnOnUnsupportedTypeScriptVersion: true, "project": ["./tsconfig.json", "cypress/tsconfig.json"] },
  ignorePatterns: ["Avo.ts", "package-scripts.js"],
};
