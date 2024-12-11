import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: ['**/*.{ts,tsx}', 'translator.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',
      'react/no-unused-prop-types': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-misused-promises': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
        },
      ],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // src/app can import from src/features but not the other way around
            {
              target: './src/features',
              from: './src/app',
            },

            // src/features and src/app can import from these shared modules but not the other way around
            {
              target: [
                './src/assets',
                './src/components',
                './src/hooks',
                './src/lib',
                './src/store',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
            // disables cross-feature imports
            {
              target: './src/features/auth',
              from: './src/features',
              except: ['./auth'],
            },
          ],
        },
      ],
    },
  },
  {
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/no-index': 'error',
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          // all folders within src (except __tests__)should be named in kebab-case
          'src/**/!(__tests__)': 'KEBAB_CASE',
        },
      ],
    },
  },
);
