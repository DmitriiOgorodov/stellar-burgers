/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.svg$': 'jest-svg-transformer',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
