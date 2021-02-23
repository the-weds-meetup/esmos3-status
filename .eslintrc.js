// Based on https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

module.exports = {
  parser: "@babel/eslint-parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    requireConfigFile: false,
  },
  plugins: ["simple-import-sort"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "simple-import-sort/imports": "error",
  },
};
