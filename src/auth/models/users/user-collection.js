'use strict';

const jwt = require('jsonwebtoken');
const schema = require('./user-schema.js');
const bcrypt = require('bcrypt');
const Model = require('../mongo-model.js');
const SECRET = process.env.SECRET || 'somethingsecret';

class User extends Model {
  constructor() {
    super(schema);
  }
  async save(record) {
    let userObj = await this.get({ name: record.name });
    console.log('__User Object__ ', userObj);
    console.log('Record >>>>', record);

    if (userObj.length == 0) {
      record.password = await bcrypt.hash(record.password, 5);
      console.log('Record >>>>', record);

      await this.create(record);
      return record;
    } else {
      console.log('This username exists');
      return Promise.reject();
    }
  }

  async authenticateBasic(user, password) {
    let userObj = await this.get({ name: user });
    console.log('__User Object__ ', userObj);
    const valid = await bcrypt.compare(password, userObj[0].password);
    console.log('Is valid? >>>>', valid);
    return valid ? userObj[0] : Promise.reject();
  }

  //send the capabilities
  generateTokenBasic(user) {
    try{
        const token =  jwt.sign({ _id: user._id }, SECRET);
        console.log('token in generateToken()',token);
        return token;
      }catch(err){
        console.log(err);
      }
}
}
module.exports = new User()