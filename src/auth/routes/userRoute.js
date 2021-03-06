'use strict';

const express = require('express');
const User = require('../models/users/user-schema.js');
const { generateToken, isAdmin, isAuth } = require('../middleware/util');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
const basicAuth = require('../middleware/basic-auth.js');


userRouter.post('/signin', basicAuth, isAuth, async (req, res) => {
  console.log("header>>>", req.header);
  res.set('token', req.token);
  res.cookie('token', req.token);
  res.status(200).send({ token: req.token, user: req.user });
});

userRouter.post('/signup', async (req, res) => {

  const user = new User({
    fullName: req.body.fullName,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin,
    isSeller: req.body.isSeller
  
  });
  if (user.email == 'admin@herfa.com'){
    user.isAdmin = true;
  }
  const createdUser = await user.save();
  console.log('Created User >>>', user);
  res.send({
    _id: createdUser._id,
    fullName: createdUser.fullName,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    isSeller: user.isSeller,
    token: generateToken(createdUser),
  });
  console.log('TOKEN >>>', generateToken(createdUser));
});

// userRouter.get('/signout',(req,res)=>{
//   req.logout();

//   // destroy session data
//   req.session = null;

//   // redirect to homepage
 
//     res.send(' Logged out Successful')
// });

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log('User get/:id >>>', user);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.delete('/:id', isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    //if (user.isAdmin === true)
    if (user.email === 'admin@herfa.com') {
      res.status(400).send({ message: 'Can Not Delete Admin User' });
      return;
    }
    const deleteUser = await user.remove();
    console.log('Deleted User >>>', deleteUser);
    res.send({ message: 'User Deleted', user: deleteUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

// userRouter.put(
//   '/profile',
//   isAuth,
//   async (req, res) => {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       // user.isSeller = Boolean(req.body.isSeller);
//       if (user.isSeller) {
//         user.seller.name = req.body.sellerName || user.seller.name;
//         user.seller.logo = req.body.sellerLogo || user.seller.logo;
//         user.seller.description =
//           req.body.sellerDescription || user.seller.description;
//       }
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }
//       const updatedUser = await user.save();
//       res.send({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         isAdmin: updatedUser.isAdmin,
//         isSeller: user.isSeller,
//         token: generateToken(updatedUser),
//       });
//     }
//   })

//Update from buyer to seller by User
userRouter.put('/:id', isAuth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isSeller = Boolean(req.body.isSeller);
    if (user.isSeller) {
      user.seller.name = req.body.sellerName || user.seller.name;
      user.seller.logo = req.body.sellerLogo || user.seller.logo;
      user.seller.description =
        req.body.sellerDescription || user.seller.description;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(updatedUser),
    });
  }

});

// //Update from buyer to seller by User
// userRouter.put('/:id', isAuth, async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isSeller = Boolean(req.body.isSeller);
//     // req.user.isSeller = true;
//     // user.isAdmin = Boolean(req.body.isAdmin);
//     // user.isAdmin = req.body.isAdmin || user.isAdmin;
//     const updatedUser = await user.save();
//     console.log('Updated User >>>', updatedUser);
//     res.send({ message: 'User Updated', user: updatedUser });
//   } else {
//     res.status(404).send({ message: 'User Not Found' });
//   }
// });



//Update from buyer to admin by Admin
userRouter.put('/:id/admin', isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.isSeller = Boolean(req.body.isSeller);
    user.isAdmin = Boolean(req.body.isAdmin);
    // user.isAdmin = req.body.isAdmin || user.isAdmin;
    const updatedUser = await user.save();
    console.log('Updated to Admin >>>', updatedUser);
    res.send({ message: 'User Updated', user: updatedUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});


module.exports = userRouter;