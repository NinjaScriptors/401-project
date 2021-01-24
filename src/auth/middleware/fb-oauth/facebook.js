'use strict';

require('dotenv').config()
const superagent = require('superagent');
const users = require('../../models/users/user-collection');
// const { generateToken, isAdmin, isAuth } = require('../util');
const axios = require('axios')
const tokenUrl = process.env.tokenUrl;
const userUrl = process.env.userUrl;
const CLIENT_ID = process.env.CLIENT_ID
const SECRET_ID = process.env.SECRET_ID;
const API_SERVER = process.env.API_SERVER;

module.exports = async function(req, res, next) {
    // 1. get the code from the query 
    let code = req.query.code; // form code
    console.log('(1) CODE ====== ', code);
    // 2. get token 
    let remoteToken = await exchangeCodeWithToken(code);
    console.log('(2) remoteToken =====> ', remoteToken);
    // 3. get user object by the token
    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log("(3) remoteUser.login-----> ", remoteUser.first_name);

    let [localUser, localToken] = await getUser(remoteUser); 
    console.log("(4) localUser -----> ", localUser, " localToken ===> ", localToken);
    req.name = localUser;
    req.token = localToken;
    next();
}

async function exchangeCodeWithToken(code) {
    // tokenUrl


    let tokenResponse = await superagent.post(tokenUrl).send({
        code : code, 
        client_id: CLIENT_ID,
        client_secret : SECRET_ID,
        redirect_uri: API_SERVER
    });
    return tokenResponse.body.access_token;
}

async function getRemoteUserInfo(access_token) {
    const { data } = await axios({
      url: userUrl,
      method: 'get',
      params: {
        fields: ['id', 'email', 'first_name', 'last_name'].join(','),
        access_token: access_token,
      },
    });
    console.log(data); // { id, email, first_name, last_name }
    return data;
  };


async function getUser(userObj) {
    let userRecord = {
        name: userObj.first_name,
        email: userObj.email,
        password: 'ouathpass'
    };
    let user = await users.save(userRecord);
    let token = await users.generateToken(user);
    return [user, token];
}