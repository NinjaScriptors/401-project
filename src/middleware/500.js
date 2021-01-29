'use strict';

module.exports = (err,req,res,next)=>{
    res.status(500);
    res.json({error: 'We have an issue we will fix it soon!'});
}