module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': ['off', {endOfLine: 'auto'}],
    semi: 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'eslint.workingDirectories': [{mode: 'auto'}],
  },
};
