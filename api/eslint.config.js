import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['build', 'docs', 'dist', 'bruno', '.git', '.github', '.vscode', '**/eslint.config.js', '**/.eslintrc.cjs']
  },
  ...fixupConfigRules(
    compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended')
  ),
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node
      }
    },
    settings: {
      'import/ignore': ['helmet'],
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.ts'],
          moduleDirectory: ['node_modules']
        }
      }
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*']
        }
      ]
    }
  }
]
