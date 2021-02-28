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
      // return await this.create(record)

      console.log('outside if------->')
      // return Promise.reject('this user is already signUp');
      await this.create(record);
      return record;
    } else {
      console.log('This username exists');
      return Promise.reject();
    }
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

  generateTokenBasic(user) {
    try{
        const token =  jwt.sign({ _id: user._id }, SECRET);
        console.log('token in generateToken()',token);
        return token;
      }catch(err){
        console.log(err);
      }
}

  async authenticateBasic(user, password) {
    let userObj = await this.get({ name: user });
    console.log('__User Object__ ', userObj);
    const valid = await bcrypt.compare(password, userObj[0].password);
    console.log('Is valid? >>>>', valid);
    return valid ? userObj[0] : Promise.reject();
  }

  async authenticateToken(token) {
    try {
      const tokenObject = jwt.verify(token, SECRET);
      console.log('__TOKEN OBJECT__', tokenObject);
      if (tokenObject.name) {
        console.log('Authentic user');
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      console.log('Invalid user');
      return Promise.reject(e);
    }
  }

  

}
module.exports = new Users();