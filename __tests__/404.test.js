'use strict';

const server = require('../src/server');

const supertest = require('supertest');
const mockRequest = supertest(server.server);

xdescribe('404 middleware', () => {
  it('route:/stores method:get >> should response 404', () => {
    return mockRequest.get('/stores').then((result) => {
      expect(result.status).toBe(404);
    });
  });
});