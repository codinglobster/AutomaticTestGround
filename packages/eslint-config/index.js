let hasReduxSaga = false;
try {
  require.resolve('redux-saga');
  hasReduxSaga = true;
} catch (e) {}
let hasReact = false;
try {
  require.resolve('react');
  hasReact = true;
} catch (e) {}
let hasTypescript = false;
try {
  require.resolve('@typescript-eslint/parser');
  hasTypescript = true;
} catch (e) {}

module.exports = {
  extends: [
    ...(hasReact ? ['eslint-config-airbnb'] : ['eslint-config-airbnb-base']),
    ...(hasReduxSaga ? ['plugin:redux-saga/recommended'] : []),
    'prettier',
    ...(hasReact ? ['prettier/react'] : []),
    ...(hasTypescript
      ? ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint']
      : []),
  ],
  ...(hasTypescript && {
    parser: '@typescript-eslint/parser',
    settings: { 'import/resolver': { typescript: {} } },
  }),
  rules: {
    // Allow modules with a single export to use named exports
    'import/prefer-default-export': 'off',

    // Have a line between class members, except class fields
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    // strict equals for everything except null checks
    eqeqeq: ['error', 'always', { null: 'never' }],

    // Eslint error when doesn't match prettier format
    'prettier/prettier': 'error',

    ...(hasReact && {
      // Allow jsx syntax in .js and .jsx files
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
      // Hooks lint rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    }),

    ...(hasTypescript && {
      // replacement for rule that typescript-eslint breaks
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      // explicit public specifier is noisy, members are public by default
      '@typescript-eslint/explicit-member-accessibility': 'off',

      // allow function hoisting
      '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

      // restore airbnb config for replaced rule
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
    }),

    ...(hasReact &&
      hasTypescript && {
        // you probably dont use prop-types in typescript
        'react/prop-types': ['error', { skipUndeclared: true }],
      }),
  },
  plugins: [
    'prettier',
    ...(hasReact ? ['react-hooks'] : []),
    ...(hasReduxSaga ? ['redux-saga'] : []),
    ...(hasTypescript ? ['@typescript-eslint'] : []),
  ],
};
