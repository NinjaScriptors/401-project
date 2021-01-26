'use strict';

const server = require('../src/server');

const supertest = require('supertest');
const mockRequest = supertest(server.server);

describe('500 middleware', () => {
  it('should response 500',  () => {
    return mockRequest.get('/error').then((result) => {
      expect(result.status).toBe(500);
    });
  });
});