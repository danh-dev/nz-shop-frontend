/*eslint-env node*/
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "block-spacing": "warn",
    "camelcase": "error",
    "comma-spacing": ["warn", { "before": false, "after": true }],
    "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
    "curly": "error",
    "eqeqeq": "error",
    "func-call-spacing": ["error", "never"],
    "key-spacing": ["error", { "mode": "strict" }],
    "logical-assignment-operators": ["error", "always"],
    "no-console": "warn",
    "no-else-return": "error",
    "no-eval": "error",
    "no-floating-decimal": "error",
    "no-multi-spaces": "warn",
    "no-trailing-spaces": "warn",
    "no-var": "error",
    "no-whitespace-before-property": "error",
    "prefer-const": ["error", {
      "destructuring": "all",
      "ignoreReadBeforeAssign": true
    }],
    "quotes": ["error", "double"],
    "rest-spread-spacing": ["error", "never"],
    "semi": ["error", "always"],
    "space-infix-ops": "error",
    "space-before-blocks": "error"
  }
};

