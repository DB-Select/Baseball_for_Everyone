var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin');
});

router.get('/tables', function (req, res, next) {
  var getRows;
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query('SHOW TABLES', function (err, rows) {
      if (err) {
        return next(err, 'GET tables error.');
      }
      getRows = rows;
      return next(err);
    });
  }, function (err, message) {
    console.log(getRows);
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'query error',
        'result': err
      });
    } else {
      res.status(200).json({
        'code': 0,
        'msg': 'suc',
        'result': getRows
      });
    }
  });
});

module.exports = router;