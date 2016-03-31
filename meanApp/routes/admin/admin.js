var express = require('express');
var router = express.Router();
var logger = require('winston');
var Admin = require("../../models/admin/admin.js").Admin;
var AdminModule    = require('../../modules/admin');




router.post('/subscribe',function(req, res) {
  if(req.body != 'undefined'){
    AdminModule.setAdmin(req, res)
   }else{
     res.sendStatus(500);
   }
});


router.get('/unvalidate', function(req, res, next) {
  AdminModule.getUsers(req, res);
});

router.get('/', function(req, res, next) {
  Admin.find({}, function(err, users) {
    if(err){
      console.log(err);
      logger.log('error', err);
      res.res.json({success: false, message:error});
    }
    res.json({success: true, message:"User List Find with success", data: users});
  });
});








module.exports = router;


