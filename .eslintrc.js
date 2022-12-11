module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: 'standard-with-typescript',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json'
	},
	rules: {
		'no-tabs': 'off',
		indent: ['warn', 'tab'],
		'@typescript-eslint/indent': ['warn', 'tab'],
		'@typescript-eslint/space-before-function-paren': 'off',
		'space-before-function-paren': 'off',
		'import/first': 'off'
	}
}
