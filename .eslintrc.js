module.exports = {
  root: false,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: false,
    es6: false,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false,
        "invalid-first-character-of-tag-name": false,
      },
    ],
  },
};
