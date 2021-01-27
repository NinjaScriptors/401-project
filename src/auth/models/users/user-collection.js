'use strict';
require('dotenv').config();
const schema = require('./user-schema');
const Model = require('../mongo-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;


class Users extends Model {
    constructor() {
        super(schema);
    }

    async save(record) {
        
        let data = await this.get({ _id: record.id });

        if (data.length === 0) {
            console.log('inside if------->')
            record.password = await bcrypt.hash(record.password, 5);
            console.log('record after hash', record);
            return await this.create(record)
        }
        console.log('outside if------->')
        return Promise.reject('this user is already signUp');
    }

    generateToken(user) {
        console.log('inside getToken()');
        return jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              isSeller: user.isSeller,
            },
            process.env.SECRET || 'somethingsecret',
            {
              expiresIn: '30d',
            }
          );
    }
  

}
module.exports = new Users();