'use strict';

const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);
const bcrypt = require('bcrypt')

describe('users route signup sign in ', () => {

    it('should create a new user by using post()', async () => {
        const testObject = { name: 'test', email: 'test@test.com', password: '122333' };
        return await mockRequest.post('/api/users/signup')
            .send(testObject)
            .then(data => {
                expect(data.body.name).toEqual(testObject.name);
                expect(data.body.email).toEqual(testObject.email);
                expect(data.status).toBe(200);

            });
    });

    it('should return a particular user data by using get() , by using ID ', () => {
        let testObject = {
            name: 'test',
            email: 'test@test.com',
            password: '122333'
        };
        return mockRequest.post('/api/users/signup')
            .send(testObject)
            .then(data => {
                return mockRequest.get(`/api/users/${data.body._id}`)
                    .then(data => {

                        expect(data.status).toBe(200);

                    });
            });
    });  
    it('should return a all users data by using get()  ', () => {
        let testObject = {
            name: 'test',
            email: 'test@test.com',
            password: '122333'
        };
        return mockRequest.post('/api/users/signup')
            .send(testObject)
            .then(data => {
                return mockRequest.get(`/api/users/`)
                    .then(data => {

                        expect(data.status).toBe(200);

                    });
            });
    });  

    //   it('should update a particular user data by using update() , by using ID ',()=> {
    //     let testObject = { name: 'test', email: 'test@test.com',password: '122333'};
    //     return mockRequest.post('/api/users/')
    //       .send(testObject)
    //       .then(data =>{
    //         let updatetest = { name: 'testUpdate', email: 'test@test.com',password: '122333'};
    //         return mockRequest.put(`/api/users/${data.body._id}`)
    //           .send(updatetest)
    //           .then(data => {
    //             let results = data.body;
    //             expect(typeof data).toBe('object');
    //             expect(data.status).toBe(200);
    //             Object.keys(updatetest).forEach(value => {
    //               expect(results[value]).toEqual(updatetest[value]);
    //             });
    //           });
    //       });
    //   }); 

    //   it('should delete a particular donor data by using delete() , by using ID ',()=> {
    //     let testObject = { name: 'test', email: 'test@test.com',password: '122333', isAdmin : true};
    //     return mockRequest.post('/api/users/')
    //       .send(testObject)
    //       .then(data =>{
    //         return mockRequest.delete(`/api/users/${data.body._id}/admin`)
    //           .then(data => {
    //             expect(typeof data.body).toBe('object');
    //             expect(data.status).toBe(200);
    //             expect(data.body).toStrictEqual({});
    //           });
    //       });
    //   });  
})



