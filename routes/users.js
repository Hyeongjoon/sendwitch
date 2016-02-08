var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('users', {title : '진짜 모르겠다'});
});

module.exports = router;
