'use strict';

const express = require('express');
require('dotenv').config();
const userRouter = require('./auth/routes/userRoute.js');
const productRouter = require('./auth/routes/productsRoute.js');
const app = express();
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

// 3rd Party Resources
const cors = require('cors');

// Esoteric Resources
const oauth = require('./auth/middleware/fb-oauth/facebook');


// App Level MW
app.use(cors());

// Website Files
app.use(express.static('./auth/middleware/fb-oauth/public/index'));

// Routes
app.get('/oauth',oauth ,(req, res) => {
    
  res.status(200).send(req.token);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/error', (req, res) => {
    throw new Error('a test error');
});

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        })
    }
};