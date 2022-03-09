import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  // coverageThreshold: { global: { branches: 100, functions: 100, lines: 100, statements: 100 } },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  roots: ['<rootDir>/tests/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
};

export default config;
