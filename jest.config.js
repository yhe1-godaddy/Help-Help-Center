module.exports = {
  coverageDirectory: './coverage',
  preset: 'ts-jest',
  cacheDirectory: './tmp/jest',
  testMatch: ['**/test/**/*.*(test|spec).ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/coverage/'],
  coverageReporters: ['cobertura', 'text', 'text-summary', 'html'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['./test/setup.ts'],
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!(redux-persist)/)'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.jest.json'
    }
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'd.ts'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': '<rootDir>/uxCssConfig.js'
  }
};
