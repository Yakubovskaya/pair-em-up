import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ["js/recommended", "prettier"],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
