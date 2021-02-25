
'use strict';

const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

describe('Search', () => {


    let obj = {
        name: 'newUsser',
        password: 'user1234',
        email: "newUssser@ll.com"
    }

    let testObject = { name: 'testProduct', category: 'food', brand: 'food',countInStock: '10 ',price: '5',image: 'image/p.png',numReviews: '5',description: 'delicious',rating: 4};


    it('Can\'t search for products unless the user is authorized', () => {
        return mockRequest.get('/search').then((result) => {
            expect(result.status).toBe(404);
        });
    });

    
    // it('Can search for certain products', async() => {
    //     return await mockRequest.post('/signup').send(obj).then(record => {
    //         // expect(record.status).toEqual(200);
    //         return mockRequest.post('/api/products')
    //         .send(testObject)
    //         .then(data =>{
    //           let results = data.body;
    //           expect(typeof data).toBe('object');
    //           expect(data.status).toBe(401);
    //           return mockRequest.get('/search?category=food').then((result) => {
    //               expect(result.status).toBe(200);
    //           });
    //         });
            
    //     })
    // });
})