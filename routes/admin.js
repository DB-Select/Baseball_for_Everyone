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
  //var tableInfo, tableRows;
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query('describe ' + req.params.table, function (err, tableInfo) {
      if (err) {
        return next(err, 'DESCRIBE table error.');
      }
      //tableInfo = tableInfoP;
      var selectSql = 'select ';
      tableInfo.forEach(element => {
        if (element.Type == "date") {
          selectSql += 'DATE_FORMAT(' + element.Field + ', "%d-%l-%Y") as ' + element.Field + ', ';
        } else {
          selectSql += element.Field + ', ';
        }
      });
      selectSql = selectSql.substring(0, selectSql.length - 2);
      selectSql += ' from ' + req.params.table;
      console.log(selectSql);
      connection.query(selectSql, function (err, tableRows) {
        if (err) {
          return next(err, 'SELECT table error');
        }
        //tableRows = tableRowsP;
        return next(err, null, {tableInfo:tableInfo, tableRows:tableRows});
      });
    });
  }, function (err, message, result) {
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
        'result': result
      });
    }
  });
});

router.post('/tables/:table', function (req, res, next) {
  
  var row = req.body;
  var insert = 'INSERT INTO ' + req.params.table 
             + '(PLAYER_ID,NAME, TEAM_ID, PLATE_APPEARANCE, AT_BAT, DOBLE, TRIPLE, STOLEN_BASE, CAUGHT_STEALING, SACRIFICE_HIT, SACRIFICE_FLY, SALARY) VALUES '
             + '(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' 
              
  var value = 
    [
     row.PLAYER_ID,
     row.NAME,
     row.TEAM_ID,
     row.PLATE_APPEARANCE,
     row.AT_BAT,
     row.DOBLE,
     row.TRIPLE,
     row.STOLEN_BASE,
     row.CAUGHT_STEALING,
     row.SACRIFICE_HIT,
     row.SACRIFICE_FLY,
     row.SALARY];

  console.log(row)
  console.log(insert)
  console.log('aaaaa')
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(insert, value, function(result){
      console.log('Insert Hitter')
      res.status(200).json('insert success');
    }, function(err){
      res.status(400).json('insert fail');
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
        'result': getRows
      });
    }
  });
});

router.put('/tables/:table', function (req, res, next) {
  
  var row = req.body;
  var sql = 'UPDATE ' + req.params.table+' SET '+'? = ?' +' WHERE ? = ?' ;   
  var value2=[]
  console.log(row);
  //console.log(row['changedData[0][player_id]']);
  console.log(sql);

  res.status(200).json('insert success');
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(insert, value, function(result){
      console.log('Insert Hitter')
      res.status(200).json('insert success');
    }, function(err){
      res.status(400).json('insert fail');
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
        'result': getRows
      });
    }
  });
});

router.delete('/tables/:table', function (req, res, next) {
  
  var hitter_id = req.body.hitter_id;
  var sql = 'DELETE FROM ' + req.params.table + ' WHERE PLAYER_ID = ?';
              
  var value = [hitter_id];

  console.log(value)
  console.log(sql)
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(sql, value, function(result){
      console.log('Delete Hitter')
      res.status(200).json('delete success');
    }, function(err){
      res.status(400).json('delete fail');
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
        'result': getRows
      });
    }
  });
});

module.exports = router;