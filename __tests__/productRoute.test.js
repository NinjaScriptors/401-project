'use strict';

const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);

describe('Products API', ()=>{

    it('Should return all products data by using get()',()=> {
      return mockRequest.get('/api/products')
        .then(data =>{
          expect(typeof data).toBe('object');
          expect(data.status).toBe(200);
        });
    }); 

    it('Should return all products categories by using get()',()=> {
        return mockRequest.get('/api/products/categories')
          .then(data =>{
            expect(typeof data).toBe('object');
            expect(data.status).toBe(200);
          });
      });
  
      it('Registered users can add a product', async () => {
        let obj = {
            name: 'newUsser',
            password: 'user1234',
            email: "newUssser@ll.com"
        }

        let testObject = { name: 'test product', category: 'eastern food', brand: '1pam-1am',countInStock: '10 pesorn',price: '1pam-1am',image: '1pam-1am',brand: '1pam-1am',numReviews: '1pam-1am',description: '1pam-1am',rating: 'test product'};

        return await mockRequest.post('/signup').send(obj).then(record => {
            // expect(record.status).toEqual(200);
            return mockRequest.post('/api/products')
            .send(testObject)
            .then(data =>{
              let results = data.body;
              expect(typeof data).toBe('object');
              expect(data.status).toBe(401);
            });
            
        })
    })
    it('Can\'t create product if not authorized',()=> {
      let testObject = { name: 'test product', category: 'eastern food', brand: '1pam-1am',countInStock: '10 pesorn',price: '1pam-1am',image: '1pam-1am',brand: '1pam-1am',numReviews: '1pam-1am',description: '1pam-1am',rating: 'test product'};
      return mockRequest.post('/api/products')
        .send(testObject)
        .then(data =>{
          let results = data.body;
          expect(typeof data).toBe('object');
          expect(data.status).toBe(401);
        });
    });  
  
    it('Return 404 if the product deosn\'t exist ',()=> {
        let testObject = { name: 'test product', category: 'eastern food', brand: '1pam-1am',countInStock: '10 pesorn',price: '1pam-1am',image: '1pam-1am',brand: '1pam-1am',numReviews: '1pam-1am',description: '1pam-1am',rating: 'test product'};
        return mockRequest.post('/api/products')
        .send(testObject)
        .then(data =>{
          return mockRequest.get(`/api/products${data.body._id}`)
            .then(data => {
              let results = data.body;
              expect(typeof data).toBe('object');
              expect(data.status).toBe(404);
            });
        });
    });  
  
  
    it('Can\'t update product if not authorized ',()=> {
        let testObject = { name: 'test product', category: 'eastern food', brand: '1pam-1am',countInStock: '10 pesorn',price: '1pam-1am',image: '1pam-1am',brand: '1pam-1am',numReviews: '1pam-1am',description: '1pam-1am',rating: 'test product'};
      return mockRequest.post('/api/products')
        .send(testObject)
        .then(data =>{
          let updatetest = { name: 'testUpdate', type: 'eastern food', available_time: '1pam-1am',amount: '10 pesorn'};
          return mockRequest.put(`/api/products/${data.body._id}`)
            .send(updatetest)
            .then(data => {
              let results = data.body;
              expect(typeof data).toBe('object');
              expect(data.status).toBe(401);
            });
        });
    });  
  
    it('Can\'t delete product if not authorized',()=> {
        let testObject = { name: 'test product', category: 'eastern food', brand: '1pam-1am',countInStock: '10 pesorn',price: '1pam-1am',image: '1pam-1am',brand: '1pam-1am',numReviews: '1pam-1am',description: '1pam-1am',rating: 'test product'};
      return mockRequest.post('/api/products')
        .send(testObject)
        .then(data =>{
          return mockRequest.delete(`/api/products/${data.body._id}`)
            .then(data => {
              expect(typeof data.body).toBe('object');
              expect(data.status).toBe(401);
              expect(data.body).toStrictEqual({ "message": "No Token"});
            });
        });
    }); 
  
  });