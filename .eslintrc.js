module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'simple-import-sort', 'prettier', 'jsx-a11y'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: '16.8.0',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/prop-types': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'], // side effect (E.g."import "normalize.css"")
          ['^react$'],
          ['^[^.]'], // Libs
          ['^../|^~/|^./'],
        ],
      },
    ],
  },
  overrides: [
    // Typescript related rules
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },

      rules: {
        // We should absolutely avoid using ts-ignore, but it"s not always possible.
        // particular when a dependencies types are incorrect.
        '@typescript-eslint/ban-ts-comment': [
          'warn',
          { 'ts-ignore': 'allow-with-description' },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },

    // Include website project
    {
      files: ['./website/*.ts', './website/*.tsx'],
      parserOptions: {
        project: ['./website/tsconfig.json'],
      },
    },

    // Include CodeSandbox project
    {
      files: [
        './templates/codesandbox/src/**/*.ts',
        './templates/codesandbox/src/**/*.tsx',
      ],
      parserOptions: {
        project: ['./templates/codesandbox/tsconfig.json'],
      },
    },

    // Track tree-shaking potential error in the lib
    {
      files: ['./src/**/!(*.test|*.spec).ts'],
      plugins: ['tree-shaking'],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 2,
      },
    },

    // Specials rules for testing
    {
      extends: ['plugin:jest/recommended'],
      files: ['**/*.test.ts'],
      plugins: ['jest'],
      env: {
        jest: true,
      },
      rules: {
        // you should turn the original rule off *only* for test files
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
}