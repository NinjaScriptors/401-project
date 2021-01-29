'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // _id: Schema.Types.,
  name: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, index: true, dropDups: true,
  },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  isSeller: { type: Boolean, default: false, required: true },
  // role: { type: String, required: true, enum: ['admin', 'seller', 'buyer]},
  seller: {
    name: String,
    logo: String,
    description: String,
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
  },
},
  {
    timestamps: true,
  }
);




// return object of users that has id = ids  
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}



userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}


// userSchema.statics.createUser = async function (
//   firstName,
//   lastName,
//   type
// ) {
//   try {
//     const user = await this.create({ firstName, lastName, type });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// }




module.exports = mongoose.model('User', userSchema);