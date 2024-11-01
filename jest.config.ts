import { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jest-fixed-jsdom',
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		'^uuid$': require.resolve('uuid'),
	},
	testEnvironmentOptions: {
		customExportConditions: [''],
	},
};

export default config;
