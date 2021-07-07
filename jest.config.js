module.exports = {
	coverageDirectory: 'coverage',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	coverageThreshold: {
		global: {
			branches: 83,
			functions: 83,
			lines: 83,
			statements: 83,
		},
	},
	testPathIgnorePatterns: ['<rootDir>/__tests__/__fixtures__/'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.css$': 'jest-transform-css',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
