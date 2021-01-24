# 401-project

An e-commerce application built using Node.js, Express.js, MongoDB, Socket.io



## Index

- Demo
- Overview
- Features
- Installation
- How it works
- Manual Test
- Jest Test
- Postman Test



## Overview

In this website there are three types of user: Admin, Seller and Buyer. The Admin can manage the users and products, the Seller has a store connected to the seller id, and seller can add/update products of her/his own only, while the Buyer can add comments/ratings for products and have a chat with the Seller.


## Features

- Uses `Express` as the application Framework.
- Authenticates via username, password and email using `Bearer Authentication`.
- Passwords are hashed using `bcrypt` nodejs package.
- Social Authentication via Facebook and Google using `oAuth`
- Real-time communication between a client and a server using `Socket.io`.
- Uses `MongoDB` and `Mongoose` for storing and querying data.


## Installations and Setup

1. Install `Node.js` and `npm` on your local machine.

2. Clone or Download the repository

```
git clone 
```

3. Start the server

```
npm init -y
```

4. Start MongoDB

```
sudo service mongod start
```

5. Install Dependencies 

```
npm install 
```

6. Start the application

```
npm start base-64 bcryptjs dotenv express jsonwebtoken mongoose
```

7. In your `.env` file, add the following 

```
PORT
MONGODB_URL=mongodb://localhost/DB_Name
SECRET
```

Your app should now be running on `http://localhost:3000`.



## How it works

### Setup Configurations

The development configurations reside inside `.env` file.
The configurations on production will be assigned from **Environment Variables** on **Heroku**.


#### MongoDB

You need to create a database with the two main schemas (User and Product) and join them on the user_id to get the products in the store of each seller alone, then get the MongoDB URI, connect it to `mongoose`.


#### Facebook & Google

You need to register a new application on both Facebook and Google to get your tokens by which users can grant access to your application, and login using their social accounts.


##### Registering the app on Facebook

1. Go to [Facebook Developers](https://developers.facebook.com/)

2. Add new app, and fill the required information.

3. Get your `App ID`, `App Secret`.

4. Go to Add Product -> Facebook Login -> Valid OAuth redirect URIs

5. Add Valid Callback URIs

6. Go to App Review -> Make your application public.

Now, you can assign the `App ID` to `facebookClientID`, and App Secret to `facebookClientSecret`.


##### Registering the app on Google


##### The Callback URL

- It can point back to your localhost
[](http://localhost:3000/oauth)

- When deploy to Heroku, you will have something look like this 
[](http://my-chat-app.herokuapp.com/oauth)


### Database

`Mongoose` is used to interact with a `MongoDB`.

#### Schemas

There are three schemas; userSchema, productSchema and reviewSchema.

Each user has a name, email, password, isAdmin, isSeller, seller fields. isAdmin and isSeller are false by default and if the user wants to be a seller she/he can signup as seller using isSeller:true or update their profile to be a seller. The admin is the only one who can create admins, normal user can't set isAdmin to true.

Each product has name, image, brand, category, description, price, countInStock, rating, reviews which is a reference (join) to the reviewSchema ans seller which is a reference to userSchema. The product belongs to its own owner using the property *seller* and can not be updated but with its owner only.

For reviewSchem, it has name, rating and comment fields that are user to add reviews by the users on the products.

And all the schemas has `timestamps` to see the full date each record is created and updated at.


### Models

Each model wraps Mongoose Model object, overrides and provides some methods. There are two models; User and Product.


### User Authentication


### Socket



