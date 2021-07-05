module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'camelcase': 'off',
    'no-throw-literal' : 'off',
    'no-undef' : 'off',
    'semi' : 'off',
    'quote-props': 'off',
    'key-spacing': 'off',
    'node/handle-callb': 'off'
  }
}
