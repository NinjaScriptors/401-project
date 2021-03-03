'use strict';

const mongoose = require('mongoose'); 

const reviewSchema = new mongoose.Schema(
    {
        name: { type: String },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const prodctSchema =  mongoose.Schema({
    name: { type: String, required: true },
    // user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, default: "" },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
});

module.exports = mongoose.model('Product', prodctSchema);