'use strict';

const express = require('express');
require('dotenv').config();
const userRouter = require('./auth/routes/userRoute.js');
const productRouter = require('./auth/routes/productsRoute.js');
const app = express();
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');


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