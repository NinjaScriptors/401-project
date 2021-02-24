# 401-project

An e-commerce application built using Node.js, Express.js, MongoDB, Socket.io



## Index

- [Demo](#Demo)
- [Overview](##Overview)
- [Software Requirements and User Stories](##Software-Requirements-and-User-Stories)
- [Wireframe, Domain Modeling and ERD](##Wireframe,-Domain-Modeling-and-ERD)
- [Features](##Features)
- [Installation](##Installation)
- [How it works](##How-it-works)
- [Manual Test](##Manual-Test)
- [Jest Test](##Jest-Test)
- [Postman Test](##Postman-Test)


## Demo

## Overview

In this website there are three types of user: Admin, Seller and Buyer. The Admin can manage the users and products, the Seller has a store connected to the seller id, and seller can add/update products of her/his own only, while the Buyer can add comments/ratings for products, view products categories and have a chat with the Seller.


## Software Requirements and User Stories

You can see the Requirements and User Stories of our application from [here](./requirements.md)


## Wireframe, Domain Modeling and ERD

You can see the Wireframe and Domain Modeling of our application from [here](./wireframe.md)


## Features

- Uses `Express` as the application Framework.
- Authenticates via username, password and email using `Bearer Authentication`.
- Passwords are hashed using `bcrypt` nodejs package.
- Social Authentication via Facebook and Google using `OAuth`
- Real-time communication between a client and a server using `Socket.io`.
- Uses `MongoDB` and `Mongoose` for storing and querying data.


## Installations and Setup


### Running Locally


* Make sure that `Node.js` and `npm` are installed on your local machine.

1. Clone or Download the repository

```
git clone 
```

2. Start the server

```
npm init -y
```

3. Start MongoDB (for windows users)

```
sudo service mongod start
```

4. Install Dependencies 

```
npm install base-64 bcryptjs dotenv express jsonwebtoken mongoose
```

5. Start the application

```
node index.js 
```
or
```
nodemon
```

6. In your `.env` file, add the following 

```
PORT
MONGODB_URL=mongodb://localhost/DB_Name
SECRET
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).


### Deploying to Heroku

* Make sure that [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli) is installed on your local machine.

1. Go to [Heroku.com](https://www.heroku.com/)

2. Sign up then Sign in

3. Create new app form your heroku dashboard -> from `New`

4. Choose app name and region then `Create app`

5. Under `Resources` in the **Add-ons** choose `ObjectRocket for MongoDB`

And under `Settings` in **Config Vars** -> *Reveal Config Vars* add the variables that are in the `.env` and their values 

6. Deploy your app from your GitHub repo -> under `deployment` choose `GitHub` -> `connect to GitHub`

7. Choose the repo you want to connect (make sure everything is merged to main)

8. Click on `Connect`

9. `Enable Automatic Deploys` then `Deploy Branch`

10. Click on `View` to see the live deployemnt. 
The URL will look like the following: 
[https://your-app-name.herokuapp.com/](https://your-app-name.herokuapp.com/)



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

1. Go to Google APIs
2. Create new project
3. in credintials create api key from `+ create credintials`
4. in credintials create oauth client id from `+ create credintials`
5. choose the application type and name
6. Authorized JavaScript origins --> this is localhost:3000
7. Authorized redirect URIs --> localhost:3000/oauth
then `create`
8. then you will get client id and client secret


##### The Callback URL

- It can point back to your localhost

   [http://localhost:3000/oauth](http://localhost:3000/oauth)


- When deploy to Heroku, you will have something look like this 

   [http://your-app-name.herokuapp.com/oauth](http://your-app-name.herokuapp.com/oauth)



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

User can login using either a username, email and password, or login via a social account. User authentication is done using Bearer Authentication.

Bearer Authentication has good, and step-by-step [documentation](https://swagger.io/docs/specification/authentication/bearer-authentication/) on how to implement each way of authentication.

And for the AOuth, this is the [documentation]() for Google on how to implement this authentication, and this [documentation]() for Facebook.


### Socket

Having an active connection opened between the client and the server so client can send and receive data. This allows real-time communication using TCP sockets. This is made possible by [Socket.io](https://github.com/socketio/socket.io).

The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events.

The namespaces used are:


### License

Built under [MIT](https://opensource.org/licenses/mit-license.php) license.

