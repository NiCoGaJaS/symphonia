const { defineConfig } = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        ignores: ['.angular/**', 'dist/**', 'coverage/**'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...angular.configs.tsRecommended,
            eslintConfigPrettier,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                { type: 'attribute', prefix: 'app', style: 'camelCase' },
            ],
            '@angular-eslint/component-selector': [
                'error',
                { type: 'element', prefix: 'app', style: 'kebab-case' },
            ],

            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                { allowExpressions: true },
            ],

            eqeqeq: 'error', // enforces to use type-safe equality operators (=== and !== instead of == and !=)
            curly: 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'sort-imports': ['error'],
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
        rules: {
            '@angular-eslint/template/eqeqeq': 'error', // enforces to use type-safe equality operators (=== and !== instead of == and !=)
            '@angular-eslint/template/button-has-type': 'warn',
        },
    },
]);
