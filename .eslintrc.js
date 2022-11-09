const config = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  extends: ["next"],
};

module.exports = config;
