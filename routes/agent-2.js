var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('agent-2', { title: 'Express' });
});

router.get('/pitcher_salary_list', function(req, res, next) {
    var query = "SELECT tbl1.name,\
        count(pl.player_id) as G,\
        sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'W') THEN 1 ELSE 0 END) AS WIN,\
        sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'L') THEN 1 ELSE 0 END) AS LOSE,\
        sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'S') THEN 1 ELSE 0 END) AS SAVE,\
        sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'H') THEN 1 ELSE 0 END) AS HOLD,\
        sum(pl.earned_run) AS ER,\
        sum(pl.inning_pitched) AS IP,\
        sum(case when (pl.is_home = FALSE) AND (pl.inning_pitched >= 9) then 1 else 0 end) +sum(case when (pl.is_home = TRUE) AND (pl.inning_pitched >= 8) then 1 else 0 end) AS CG,\
        tbl1.hit AS H,\
        tbl1.number_of_pitching AS NP,\
        round(sum(pl.earned_run)/(sum(pl.inning_pitched)/9),2) AS ERA,\
        tbl1.doble AS DOBLE,\
        tbl1.triple AS TRIPLE,\
        sum(pl.EARNED_HOME_RUN) AS HR,\
        concat(tbl1.salary,'만원') AS SALARY \
  FROM (SELECT    p3.* \
        FROM   baseball.pitcher p3 \
        WHERE   p3.salary BETWEEN (SELECT p2.salary-2000 \
                             FROM baseball.pitcher p2 \
                             WHERE p2.player_id = ?) AND (SELECT p2.salary+2000 \
                                                     FROM baseball.pitcher p2 \
                                                     WHERE p2.player_id = ?)) as tbl1 \
                                                     INNER JOIN baseball.pitcher_lineup pl ON tbl1.player_id = pl.player_id \
  GROUP BY tbl1.player_id \
  ORDER BY SALARY ASC;";

    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(query, [req.query.player_id, req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error');
            } else {
                return next(err, null, rows);
            }
        });
    }, function(err, message, rows) {
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
    })
});

router.get('/hitter_salary_list', function(req, res, next) {
    var sql_query = "SELECT tbl1.*, SUM(CASE WHEN hl.hit is null THEN 0 ELSE hl.hit END) as H, \
SUM(CASE WHEN hl.HOME_RUN is null THEN 0 ELSE hl.HOME_RUN END) AS HR,	hl.BATTING_AVERAGE AS AVG,\
SUM(CASE WHEN hl.RUN_BATTED_IN is null THEN 0 ELSE hl.RUN_BATTED_IN END) AS RBI,\
SUM(CASE WHEN hl.RUN_SCORE is null THEN 0 ELSE hl.RUN_SCORE END) AS R, SUM(CASE WHEN hl.STRIKE_OUT is null THEN 0 ELSE hl.STRIKE_OUT END) AS SO,\
SUM(CASE WHEN hl.WALK is null THEN 0 ELSE hl.WALK END) AS WK \
FROM (SELECT h3.* \
FROM baseball.hitter h3 \
WHERE h3.salary BETWEEN (SELECT h2.salary - 2000 \
                             FROM baseball.hitter h2 \
                            WHERE h2.player_id = ?) \
                      AND (SELECT h2.salary + 2000 \
                             FROM baseball.hitter h2 \
                            WHERE h2.player_id = ?)) AS tbl1 \
INNER JOIN baseball.hitter_lineup hl ON tbl1.player_id = hl.player_id \
GROUP BY tbl1.player_id \
ORDER BY SALARY ASC;";

    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.player_id, req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error');
            } else {
                return next(err, null, rows);
            }
        });
    }, function(err, message, rows) {
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
    })
});

module.exports = router;