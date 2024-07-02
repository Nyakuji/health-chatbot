module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(chai)/)', // Transform all node_modules except chai
    ],
    globals: {
      'ts-jest': {
        diagnostics: {
          warnOnly: true,
        },
      },
    },
    verbose: true, // Enable verbose output
  }
  