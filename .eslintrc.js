const { defineConfig } = require('eslint-define-config');
const path = require('path');

module.exports = defineConfig({
  root: true,
  // 将浏览器API、ES API和Node API看做全局变量，不会被特定的规则限制（如 no-undef）
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  // 设置全局自定义变量，不会被特定的规则限制（如 no-undef）
  globals: {

  },
  // 集成Airbnb规则集以及vue相关规则
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
  ],
  // 指定vue解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 配置typescript解析器
    parser: '@typescript-eslint/parser',
    // 通过tsconfig文件确定解析范围，这里需要绝对路径，否则子模块中eslint会出现异常
    project: path.resolve(__dirname, 'tsconfig.eslint.json'),
    // 支持ecmaVersion版本号
    ecmaVersion: 13,
    // 因为主要使用sem，设置为module
    sourceType: 'module',
    // typescript解析器也要负责vue文件的<script>
    extraFileExtensions: ['.vue'],
  },
  // 在已有规则上修改
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    // vue允许单单词组件
    'vue/multi-word-component-names': 'off',
    'operator-linebreak': ['error', 'after'],
    'class-methods-use-this': 'off',
    // 允许使用++
    'no-plusplus': 'off',
    'no-spaced-func': 'off',
    // 不约束换行符
    'linebreak-style': 'off',
  },
  // 文件级别重写
  overrides: [
    // 对于vite和vue配置文件，不对console进行错误提示
    {
      files: [
        '**/vite.config.*',
        '**/vitest.config.*',
      ],
      rules: {
        'import/no-relative-package': 'off',
        'no-console': 'off',
      },
    },
  ],
});
