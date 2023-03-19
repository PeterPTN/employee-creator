// src/setupTests.js
import { QueryCache } from 'react-query'
import { server } from './src/mocks/server.js'
import 'whatwg-fetch'

const queryCache = new QueryCache();
// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    queryCache.clear()
    server.resetHandlers()
})

// Clean up after the tests are finished.
afterAll(() => server.close())