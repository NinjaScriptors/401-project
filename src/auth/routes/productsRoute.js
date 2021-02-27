'use strict';

const express = require('express');
const { isAdmin, isAuth, isSellerOrAdmin, isSeller } = require('../middleware/util');
const Product = require('../models/products/product-schema.js');
const productRouter = express.Router();

 
  productRouter.get('/', async (req, res) => {
    const products = await Product.find({
    })
    res.send(products);
 
  })


productRouter.get('/categories', async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'seller',
    'seller.name seller.logo seller.rating seller.numReviews'
  );
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.post('/', isAuth, isSellerOrAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name ,
    seller: req.user._id,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
    countInStock: req.body.countInStock,
    rating: 0,
    numReviews: 0,
    description: req.body.description,
  });
  console.log('Created Product >>>>', product);
  const createdProduct = await product.save();
  res.send({ message: 'Product Created', product: createdProduct });
});

//Can an Admin update other users' products ?
productRouter.put('/:id', isAuth, isSellerOrAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if(req.user._id == product.seller  ){

      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      console.log('Updated Product >>>>', updatedProduct);
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found / You can not update this product' });
    }

    }
});

//make a notification sent to the admin for if user wants to delete a product

productRouter.delete('/:id', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    console.log('Deleted Product >>>>', deleteProduct);
    res.send({ message: 'Product Deleted', product: deleteProduct });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


productRouter.get('/search', async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name || '';
  const category = req.query.category || '';
  const seller = req.query.seller || '';
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;

  const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
  const sellerFilter = seller ? { seller } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  
  const count = await Product.estimatedDocumentCount({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  const products = await Product.find({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate('seller', 'seller.name seller.logo')
    // .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ products, page, pages: Math.ceil(count / pageSize) });
})

productRouter.post('/:id/reviews', isAuth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    if (product.reviews.find((x) => x.name === req.user.name)) {
      return res.status(400).send({ message: 'You already submitted a review' });
    }
    //http://localhost:3000/api/products/600c838b8eb6ad2450052af9/reviews
    /*
     "productId" : "600c838b8eb6ad2450052af9",
     "name":"USER21",
     "rating":"4",
     "comment":"nice product"
    */
    const review = {
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    console.log('Review for product',productId, ' is', review);
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: 'Review Created',
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

module.exports = productRouter;