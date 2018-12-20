module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    //'plugin:vue/essential',
    //'eslint:recommended',
    "plugin:adoptapet/base", // For JS linting
    "plugin:adoptapet/vue" // For Vue linting (if using Vue)
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
