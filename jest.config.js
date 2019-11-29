module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/__tests__/**/*.ts'],
};
