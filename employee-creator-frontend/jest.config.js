export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
    '^.+\\.tsx?$': 'ts-jest',
  },
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: "jest-environment-jsdom",
}