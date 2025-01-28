import { defineConfig } from 'eslint-define-config';
import angularPlugin from '@angular-eslint/eslint-plugin';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';
import templateParser from '@angular-eslint/template-parser';

const commonRules = {
  '@angular-eslint/component-class-suffix': 'error',
  '@angular-eslint/contextual-lifecycle': 'error',
  '@angular-eslint/directive-class-suffix': 'error',
  '@angular-eslint/no-empty-lifecycle-method': 'error',
  '@angular-eslint/no-input-rename': 'error',
  '@angular-eslint/no-inputs-metadata-property': 'error',
  '@angular-eslint/no-output-native': 'error',
  '@angular-eslint/no-output-on-prefix': 'error',
  '@angular-eslint/no-output-rename': 'error',
  '@angular-eslint/no-outputs-metadata-property': 'error',
  '@angular-eslint/prefer-standalone': 'error',
  '@angular-eslint/use-pipe-transform-interface': 'error',
  '@angular-eslint/use-lifecycle-interface': 'warn',
  '@angular-eslint/component-selector': [
    'error',
    { type: 'element', prefix: 'app' },
  ],
  '@angular-eslint/directive-selector': [
    'error',
    { type: 'attribute', prefix: 'app' },
  ],
  'no-console': ['error', { allow: ['warn', 'error'] }],
  eqeqeq: ['error', 'always'],
  curly: 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  'eol-last': 'error',
  'no-multiple-empty-lines': 'error',
  semi: ['error', 'always'],
  'consistent-return': 'error',
  'no-eval': 'error',
  'prettier/prettier': ['error'],
  'max-depth': ['error', 4],
  complexity: ['error', { max: 20 }],
  'max-len': ['error', { code: 200 }],
  'max-lines-per-function': ['error', { max: 200 }],
  'max-lines': ['error', { max: 300 }],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
};

export default defineConfig([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: ['tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...commonRules,
      'no-implicit-globals': 'error',
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: templateParser, // Ensure this is being used for HTML files
      parserOptions: {
        project: [], // No TypeScript project config for HTML files
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...commonRules,
      'prettier/prettier': 'off',
    },
  },
  { ignores: ['.angular/**', '**/dist/**'] },
]);
