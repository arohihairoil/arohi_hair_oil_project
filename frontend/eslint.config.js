import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 🚫 Ignore build output & dependencies
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // ✅ Main config for JS / React files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      // React 17+ (no need to import React)
      "react/react-in-jsx-scope": "off",

      // We are NOT using PropTypes
      "react/prop-types": "off",

      // Do not fail build for unused vars
      "no-unused-vars": "warn",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // ✅ Recommended base rules
  js.configs.recommended,
  react.configs.flat.recommended,
];
