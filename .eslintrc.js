const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: ["standard", "plugin:vue/recommended"],
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  rules: {
    "vue/require-default-prop": OFF,
    "vue/require-prop-types": OFF,
    "vue/no-v-html": OFF,
    "no-unused-vars": OFF,
    "no-undef": OFF,
    "no-extra-boolean-cast": OFF,
    "import/first": OFF,
    "import/no-webpack-loader-syntax": OFF
  }
};
