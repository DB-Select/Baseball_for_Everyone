var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('agent-1');
});

module.exports = router;