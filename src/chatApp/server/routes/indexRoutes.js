const users =require('../controllers/user');
// middlewares
const { encode } = require('../middlewares/jwt.js');
const express = require('express')
const router = express.Router();

router.post('/login/:userId', (req, res, next) => { });

module.exports = router;