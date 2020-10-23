module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    /**
     * thanks to the new react jsx transform
     * https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
     * `react/jsx-uses-react` and `react/react-in-jsx-scope` can be disabled
     */
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '__tests__/**/*',
          '@types/jest-dom.d.ts',
          'next.config.js',
          'prettier.config.js',
          'lint-staged.config.js',
        ],
      },
    ],
  },
};
