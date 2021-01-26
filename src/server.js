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
const socketio = require("socket.io")(server)
socketio.on('connection', WebSockets.connection)



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
    start: () => {
        server.listen(3000, () => console.log("listening on port 3000"))
    }
};