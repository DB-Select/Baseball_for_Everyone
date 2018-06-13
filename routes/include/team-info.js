var express = require('express');
var router = express.Router();
var dbModule = require('../../config/db.js');

router.get('/:teamID', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
      var queryStr =
        'select * from \
        (select sum(run_score) as sumScore, game_id as SumID from hitter_lineup\
        where game_id in\
          (select id from game where home_id = ? or away_id = ? order by game_id)\
        group by game_id) as sumTable,\
        (select sum(run_score) as homeScore, game_id as HomeID, sum(Hit) as Hit, sum(Home_Run) as Home_Run \
        from hitter_lineup \
        where game_id in \
          (select id from game where home_id = ? or away_id = ?) and player_id in (select player_id from hitter where team_id = 1041)\
        group by game_id) as homeTable,\
        (select name from team where id = ?) as teamTable,\
        (select DATE_FORMAT(date, "%d/%l/%Y") as date, id from game where home_id = ? or away_id = ?) as dateTable\
    where SumID = HomeID and dateTable.id = HomeID\
    order by date desc;';
      var teamID = req.params.teamID;
      connection.query(queryStr, [teamID, teamID, teamID, teamID, teamID, teamID, teamID], function (err, rows) {
        if (err) {
          return next(err, 'GET select team error.');
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

module.exports = router;