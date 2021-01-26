
'use struct';

const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);


describe('API test', () => {

    it('Get results from users API successfully', () => {
        return mockRequest.get('/api/users').then((result) => {
            expect(result.status).toBe(200);
        });
    });
    it('Get results from products API successfully', () => {
        return mockRequest.get('/api/products').then((result) => {
            expect(result.status).toBe(200);
        });
    });

 
})
