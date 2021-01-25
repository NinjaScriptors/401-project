const base64 = require('base-64');
const users = require('../models/users/user-collection.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    console.log('__Headers__', req.headers);
    const basicAuth = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basicAuth).split(':');
    console.log('__BasicAuth__', user, pass);
    users
      .authenticateBasic(user, pass)
      .then((validUser) => {
        console.log('__ValidUser__', validUser);
        req.token = users.generateTokenBasic(validUser);
        console.log('BASIC TOKEN >>',users.generateTokenBasic(validUser));
        next();
      })
      .catch((err) => next(`Invalid Login ${err}`));
  }
};