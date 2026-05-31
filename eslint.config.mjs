import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
	{
		ignores: [".next/**", "*.mjs"],
	},
	...nextCoreWebVitals,
	...nextTypescript,
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "script",

			parserOptions: {
				project: "tsconfig.json",
			},
		},

		rules: {
			"no-plusplus": [
				"error",
				{
					allowForLoopAfterthoughts: true,
				},
			],

			"no-console": [
				"warn",
				{
					allow: ["error"],
				},
			],

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					args: "all",
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
				},
			],

			"@typescript-eslint/no-explicit-any": "off",
		},
	},
]);
