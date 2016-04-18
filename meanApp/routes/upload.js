/**
 * Created by Younes on 17/04/2016.
 */
var express = require('express');
var router = express.Router();

router.post('/product', function(req, res, next) {
    if(req.body != 'undefined'){
       console.log(req.files);
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;