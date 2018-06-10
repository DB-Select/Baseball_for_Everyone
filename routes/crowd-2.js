var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('crowd-2', { title: 'Express' });
});
// 
router.get('/game_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
      connection.query('SELECT g.HOME_ID,\
      SUM(CASE WHEN hl.IS_HOME = TRUE THEN hl.RUN_SCORE ELSE 0 END) AS HOME_S,\
      g.AWAY_ID,\
      SUM(CASE WHEN hl.IS_HOME = FALSE THEN hl.RUN_SCORE ELSE 0 END) AS AWAY_S\
      FROM baseball.Game g, baseball.HITTER_LINEUP hl\
      WHERE (g.ID = ?) AND (g.ID = hl.GAME_ID);',req.params.game_id, function (err, rows) {
      //
        if (err) {
          return next(err, 'GET tables error.');
        }
        return next(err, null, rows);
      });
    }, function (err, message, rows) {
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
          'result': rows
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
        connection.query(selectSql, function (err, tableRowsP) {
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
