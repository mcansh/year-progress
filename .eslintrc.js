module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
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
