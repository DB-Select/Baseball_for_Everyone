var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('player-2', { title: 'Express' });
});

router.get('/recent_pitches', function(req, res, next) {
    var sql_query = "SELECT  pl.EARNED_RUN_AVERAGE AS ERA, p.name, pl.player_id as ID, pl.* FROM baseball.pitcher_lineup pl , pitcher p \
    WHERE (p.player_id = ?) and p.player_id = pl.player_id GROUP BY pl.game_id LIMIT 10;";


    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error.');
            }
            console.log(rows);
            console.log(req.query.playerID);
            return next(err, null, rows);
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
    });
});

router.get('/season_pitches', function(req, res, next) {
    var sql_query = "SELECT pl.player_id as ID,  p.name as NAME, \
    sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'W') THEN 1 ELSE 0 END) AS WIN, \
    sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'L') THEN 1 ELSE 0 END) AS LOSE, \
    sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'S') THEN 1 ELSE 0 END) AS SAVE, \
    sum(CASE WHEN (pl.WIN_LOSE_SAVE = 'H') THEN 1 ELSE 0 END) AS HOLD, \
    sum(pl.earned_run) AS ER, sum(pl.inning_pitched) AS IP, p.number_of_pitching AS NP, \
        sum(CASE WHEN (pl.is_home = FALSE) AND (pl.inning_pitched >= 9) THEN 1 ELSE 0 END) \
    + sum(CASE WHEN (pl.is_home = TRUE) AND (pl.inning_pitched >= 8) THEN 1 ELSE 0 END) AS CG, \
    p.hit AS H, p.doble AS DOBLE, p.triple AS TRIPLE, sum(pl.EARNED_HOME_RUN) AS HR, \
    sum(pl.earned_run) / (sum(pl.inning_pitched) / 9) AS ERA, count(pl.player_id) AS G \
    FROM baseball.pitcher_lineup pl , pitcher p \
    WHERE (pl.player_id = ?) and (pl.player_id = p.player_id) \
    GROUP BY pl.player_id;";

    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error.');
            }
            console.log(rows);
            return next(err, null, rows);
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
    });
});

/*SELECT h.name, hl.*
FROM baseball.hitter_lineup hl, hitter h
WHERE (h.player_id = ?) and h.player_id = hl.player_id
GROUP BY pl.game_id
LIMIT 10;*/

router.get('/season_hits', function(req, res, next) {
    var sql_query = "SELECT h.*, SUM(CASE WHEN hl.hit is null THEN 0 ELSE hl.hit END) as H, \
    SUM(CASE WHEN hl.HOME_RUN is null THEN 0 ELSE hl.HOME_RUN END) AS HR, hl.BATTING_AVERAGE AS AVG, \
    SUM(CASE WHEN hl.RUN_BATTED_IN is null THEN 0 ELSE hl.RUN_BATTED_IN END) AS RBI, \
    SUM(CASE WHEN hl.RUN_SCORE is null THEN 0 ELSE hl.RUN_SCORE END) AS R, SUM(CASE WHEN hl.STRIKE_OUT is null THEN 0 ELSE hl.STRIKE_OUT END) AS SO, \
    SUM(CASE WHEN hl.WALK is null THEN 0 ELSE hl.WALK END) AS WK \
    FROM baseball.hitter_lineup hl, baseball.hitter h \
    WHERE (hl.player_id = ?) and (hl.player_id = h.player_id) \
    GROUP BY hl.player_id;";

    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error.');
            }
            console.log(rows);
            return next(err, null, rows);
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
    });
});

router.get('/recent_hits', function(req, res, next) {
    var sql_query = "SELECT h.name, hl.* FROM baseball.hitter_lineup hl, hitter h WHERE (h.player_id = ?) and h.player_id = hl.player_id \
    GROUP BY hl.game_id LIMIT 10;";

    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.player_id], function(err, rows) {
            if (err) {
                return next(err, 'GET tables error.');
            }
            console.log(rows);
            return next(err, null, rows);
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
    });
});

module.exports = router;