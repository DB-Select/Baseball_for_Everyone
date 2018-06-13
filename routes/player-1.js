var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('player-1', { title: 'Express' });
});

router.get('/pitcher_list', function (req, res, next) {

  var query = "SELECT	p1.player_id,\
                      p1.name,\
                      sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'W') THEN 1 ELSE 0 END) AS WIN,\
                      sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'L') THEN 1 ELSE 0 END) AS LOSE,\
                      sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'S') THEN 1 ELSE 0 END) AS SAVE,\
                      sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'H') THEN 1 ELSE 0 END) AS HOLD,\
                      sum(p1.earned_run) AS ER,\
                      sum(p1.inning_pitched) AS IP,\
                      sum(case when (p1.is_home = FALSE) AND (p1.inning_pitched >= 9) then 1 else 0 end) +sum(case when (p1.is_home = TRUE) AND (p1.inning_pitched >= 8) then 1 else 0 end) AS CG,\
                      p1.hit AS H,\
                      p1.number_of_pitching AS NP,\
                      ROUND(sum(p1.earned_run)/(sum(p1.inning_pitched)/9),2) AS ERA,\
                      p1.doble AS DOBLE,\
                      p1.triple AS TRIPLE,\
                      count(p1.player_id) as G,\
                      concat(p1.salary ,'만원')AS SALARY\
                    FROM	(SELECT	*\
                      FROM	pitcher p natural join pitcher_lineup pl) as p1\
                    WHERE	p1.team_id =?\
                    GROUP BY p1.player_id;"
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(query, [req.query.team_id], function (err, rows) {
      if (err) {
        return next(err, 'GET tables error');
      } else {
        return next(err, null, rows);
      }
    });
  }, function (err, message, rows) {
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'query error',
        'result': err
      });
    }
    else {
      res.status(200).json({

        'code': 0,
        'msg': 'suc',
        'result': rows
      });
    }
  });

});

router.get('/hitter_list', function (req, res, next) {
  var query = "SELECT 	h.player_id, \
                        h.name AS NAME,\
                        h.plate_appearance AS PA,\
                        h.at_bat AS AB,\
                        h.double AS DOBLE,\
                        h.triple AS TRIPLE,\
                        h.stolen_base AS SB,\
                        h.caught_stealing AS CS,\
                        h.sacrifice_hit AS SH,\
                        h.sacrifice_fly AS SF,\
                        concat(h.salary , '만원') AS SALARY,\
                        coalesce((sum(hl.hit)/sum(h.at_bat)),0) AS AVG\
                FROM	hitter h, hitter_lineup hl\
                WHERE	(h.player_id = hl.player_id) AND (h.team_id = ?)\
                GROUP BY h.player_id\
                ORDER BY h.name;"
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(query, [req.query.team_id], function (err, rows) {
      if (err) {
        return next(err, 'GET tables error');
      } else {
        return next(err, null, rows);
      }
    });
  }, function (err, message, rows) {
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'query error',
        'result': err
      });
    }
    else {
      res.status(200).json({
        'code': 0,
        'msg': 'suc',
        'result': rows
      });
    }
  });

});


router.get('/pitcher', function (req, res, next) {
  var query = "SELECT	p1.player_id,\
  p1.name,\
  sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'W') THEN 1 ELSE 0 END) AS WIN,\
  sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'L') THEN 1 ELSE 0 END) AS LOSE,\
  sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'S') THEN 1 ELSE 0 END) AS SAVE,\
  sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'H') THEN 1 ELSE 0 END) AS HOLD,\
  sum(p1.earned_run) AS ER,\
  sum(p1.inning_pitched) AS IP,\
  sum(case when (p1.is_home = FALSE) AND (p1.inning_pitched >= 9) then 1 else 0 end) +sum(case when (p1.is_home = TRUE) AND (p1.inning_pitched >= 8) then 1 else 0 end) AS CG,\
  p1.hit AS H,\
  p1.number_of_pitching AS NP,\
  ROUND(sum(p1.earned_run)/(sum(p1.inning_pitched)/9),2) AS ERA,\
  p1.doble AS DOBLE,\
  p1.triple AS TRIPLE,\
  count(p1.player_id) as G,\
  concat(p1.salary ,'만원')AS SALARY \
FROM	(SELECT	* FROM	pitcher p natural join pitcher_lineup pl) as p1 \
WHERE	p1.player_id = ?";
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(query, [req.query.player_id], function (err, rows) {
      if (err) {
        return next(err, 'GET tables error');
      } else {
        return next(err, null, rows);
      }
    });
  }, function (err, message, rows) {
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'query error',
        'result': err
      });
    }
    else {
      res.status(200).json({
        'code': 0,
        'msg': 'suc',
        'result': rows
      });
    }
  });

});




router.get('/pithit', function (req, res, next) {
  var query = "select distinct hname as Hitter_name, pname as Pitcher_name, PLATE_APPEARANCE AS PA, AT_BAT AS AB, HIT AS H, BATTING_AVERAGE AS BA from (select name as hname, player_id from hitter) as hitterN, (select name as pname, player_id from pitcher) as pitcherN, ((SELECT player_id FROM (SELECT g.id as GID FROM game g WHERE (g.away_id = ?) or (g.home_id = ?)) as tbl1 INNER JOIN hitter_lineup hl ON tbl1.GID = hl.GAME_ID) as tbl2\
              INNER JOIN pithit_table pht ON pht.hitter_id = tbl2.player_id)\
              where pht.pitcher_id = ? and hitterN.player_id = pht.hitter_id and pitcherN.player_id = pht.pitcher_id;"
  dbModule.withConnection(dbModule.pool, function (connection, next) {
    connection.query(query, [req.query.team_id, req.query.team_id,req.query.player_id], function (err, rows) {
      if (err) {
        return next(err, 'GET tables error');
      } else {
        return next(err, null, rows);
      }
    });
  }, function (err, message, rows) {
    console.log(err);
    if (err) {
      res.status(400).json({
        'code': -1,
        'msg': 'query error',
        'result': err
      });
    }
    else {
      res.status(200).json({
        'code': 0,
        'msg': 'suc',
        'result': rows
      });
    }
  });

});


module.exports = router;
