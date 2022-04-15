module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "newline-per-chained-call": [2, {"ignoreChainWithDepth": 2}],
    "max-nested-callbacks": [2, 2],
    "no-lonely-if": 2,
    "no-nested-ternary": 2,
    "max-len": [2, 100],
    "no-multi-spaces": 2,
    "require-await": 2,
    "no-return-await": 2,
    "curly": [2, "all"],
    "padding-line-between-statements": [
      "error",
      {"blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
      {"blankLine": "any",    "prev": ["const", "let", "var"], "next": ["const", "let", "var"]},
      {"blankLine": "always", "prev": "*", "next": "return" }
    ],
  },
};