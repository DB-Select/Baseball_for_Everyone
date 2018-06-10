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

router.get('/tables/:table', function (req, res, next) {
  var tableInfo, tableRows;
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query('describe ' + req.params.table, function (err, tableInfoP) {
      if (err) {
        return next(err, 'DESCRIBE table error.');
      }
      tableInfo = tableInfoP;
      connection.query('select * from ' + req.params.table, function (err, tableRowsP) {
        if (err) {
          return next(err, 'SELECT table error');
        }
        tableRows = tableRowsP;
        return next(err);
      });
    });
  }, function (err, message) {
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
        'result': {
          tableInfo: tableInfo,
          tableRows: tableRows
        }
      });
    }
  });
});

module.exports = router;