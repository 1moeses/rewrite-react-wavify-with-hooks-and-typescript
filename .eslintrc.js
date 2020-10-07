module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "prettier", "import"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "import/extensions": 0,
    "import/namespace": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "prettier/prettier": "error",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": ["error", { custom: "ignore" }],
    "react/no-danger": 0,
    "react/prop-types": 0,
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
