'use strict';

const http = require("http");
const express = require('express');
require('dotenv').config();
const userRouter = require('./auth/routes/userRoute.js');
const productRouter = require('./auth/routes/productsRoute.js');
const app = express();
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const logger = require("morgan");
const cors = require("cors");
const { isAuth } = require('./auth/middleware/util')
const fs = require('fs');

// 3rd Party Resources


// Esoteric Resources
const oauth = require('./auth/middleware/google-oauth/google');

// App Level MW
app.use(cors());

// Website Files
app.use(express.static('./auth/middleware/google-oauth/public/index'));

// Routes
app.get('/oauth', oauth, (req, res) => {

    res.status(200).send(req.token);
});


// routes
const indexRouter = require("./chatApp/server/routes/indexRoutes");
const userRouterChat = require("./chatApp/server/routes/user.js");
const chatRoomRouter = require("./chatApp/server/routes/chatroom.js");
const deleteRouter = require("./chatApp/server/routes/delete.js");
// middlewares
const { decode } = require('./chatApp/server/middlewares/jwt');



// socket configuration
const WebSockets = require("./chatApp/server/utils/WebSockets");

/** Create HTTP server. */
const server = http.createServer(app);
global.io = require("socket.io")(server)
global.io.on('connection', WebSockets.connection)



//users and products routes
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// chat routes
app.use("/", indexRouter);
app.use("/users", userRouterChat);
app.use("/room", isAuth, chatRoomRouter);
app.use("/delete", deleteRouter);

app.get('/error', (req, res) => {
    throw new Error('a test error');
});







app.use('*', notFound);
app.use(errorHandler);




module.exports = {
    server: server,
    start: (port) => {
        let PORT = port || process.env.PORT || 3000
        server.listen(PORT, () => console.log("listening on port ",PORT))
    }
};