'use strict';

const { server } = require('../src/server.js');
const supergose = require('@code-fellows/supergoose');
const mockRequest = supergose(server);
const bcrypt = require('bcryptjs');

describe('users route ', () => {


    it('SIGN UP -> should create a new user by using post()', async () => {
        let testObject = {
            name: 'test',
            email: 'test7@test.com',
            password: '122333'
        };
        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                console.log('using hash sync', result.body);
                let hashPass = bcrypt.hashSync(testObject.password, result.body.password);
                console.log(hashPass);
                expect(result.body.name).toEqual(testObject.name);
                expect(result.body.email).toEqual(testObject.email);
                expect(result.status).toBe(200);
                expect(hashPass).toBeTruthy();
            });
    });

    it('SIGN UP --> isSeller:F isAdmin:F', async () => {
        let testObject = {
            name: 'test',
            email: 'test@test.com',
            password: '122333'
        };
        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                console.log(result);
                let hashPass = bcrypt.hashSync(testObject.password, result.body.password);
                console.log(hashPass);
                expect(result.body.isSeller).toBeFalsy();
                expect(result.body.isAdmin).toBeFalsy();
                expect(result.body.name).toEqual(testObject.name);
                expect(result.body.email).toEqual(testObject.email);
                expect(result.status).toBe(200);
                expect(hashPass).toBeTruthy();
            });
    });

    it('SIGN UP  -->  isAdmin:F and isSeller:T', async () => {
        let testObject = {
            name: 'test',
            email: 'test6@test.com',
            password: '122333',
            isSeller: true
        };
        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                //   console.log(result);
                let hashPass = bcrypt.hashSync(testObject.password, result.body.password);
                console.log(hashPass);
                expect(result.body.isSeller).toBeTruthy();
                expect(result.body.isAdmin).toBeFalsy();

                expect(result.body.name).toEqual(testObject.name);
                expect(result.body.email).toEqual(testObject.email);
                expect(result.status).toBe(200);
                expect(hashPass).toBeTruthy();
            });
    });


    it('SIGN IN using Bearer Auth', () => {
        let testObject = {
            name: 'test',
            email: 'test5@test.com',
            password: '122333'
        };

        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                mockRequest
                    .post('/api/users/signin')
                    .send(testObject)
                    .then((data) => {
                        console.log('dataaaaaaaaaaaaa RESULT', data.body);
                        let hashPass = bcrypt.compareSync(
                            testObject.password,
                            result.body.password
                        );
                        expect(result.body.name).toEqual(testObject.name);
                        expect(data.body.email).toEqual(testObject.email);
                        expect(data.status).toBe(200);
                        expect(data.token).toBeTruthy();
                        expect(hashPass).toBeTruthy();
                    });
            });
    });

    it('SIGN IN --> isSeller:F  isAdmin:F', () => {
        let testObject = {
            name: 'test',
            email: 'test@test.com',
            password: '122333'
        };

        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                mockRequest
                    .post('/api/users/signin')
                    .send(testObject)
                    .then((data) => {
                        console.log('dataaaaaaaaaaaaa', data.body);
                        let hashPass = bcrypt.hashSync(
                            testObject.password,
                            data.body.password
                        );
                        expect(data.body.name).toEqual(testObject.name);
                        expect(data.body.email).toEqual(testObject.email);
                        expect(data.status).toBe(200);
                        expect(data.token).toBeTruthy();
                        expect(hashPass).toBeTruthy();
                        expect(result.body.isSeller).toBeFalsy();
                        expect(result.body.isAdmin).toBeFalsy();
                    });
            });
    });

    it('SIGN IN --> isSeller:T  isAdmin:T', () => {
        let testObject = {
            name: 'test',
            email: 'test6@test.com',
            password: '122333'
        };

        mockRequest
            .post('/api/users/signup')
            .send(testObject)
            .then((result) => {
                mockRequest
                    .post('/api/users/signin')
                    .send(testObject)
                    .then((data) => {
                        console.log('dataaaaaaaaaaaaa', data.user);
                        let hashPass = bcrypt.hashSync(
                            testObject.password,
                            data.user.password
                        );
                        expect(result.body.isSeller).toBeTruthy();
                        expect(result.body.isAdmin).toBeFalsy();
                        expect(data.body.name).toEqual(testObject.name);
                        expect(data.body.email).toEqual(testObject.email);
                        expect(data.status).toBe(200);
                        expect(data.token).toBeTruthy();
                        expect(hashPass).toBeTruthy();

                    });
            });
    });



})


describe('Fail case in Sign-in/up', () => {

    let obj = {
        name: 'newUsser',
        password: 'user1234',
        email: "newUssser@ll.com"
    }
    it('Should give 404 error if we insert a non existing route', async () => {
        obj = {
            name: 'nonexisting',
            password: 'user1234',
            email: "ussser@ll.com"
        }
        return await mockRequest.post('/signup').send(obj).then(record => {
            expect(record.status).toEqual(404);
        })
    })

   

    

});
