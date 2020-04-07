module.exports = {
	coverageDirectory: 'coverage',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
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
