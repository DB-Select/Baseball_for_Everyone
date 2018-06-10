var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('crowd-2', { title: 'Express' });
});
// 
router.get('/game_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('SELECT g.HOME_ID,\
        SUM(CASE WHEN hl.IS_HOME = TRUE THEN hl.RUN_SCORE ELSE 0 END) AS HOME_S, g.AWAY_ID,\
        SUM(CASE WHEN hl.IS_HOME = FALSE THEN hl.RUN_SCORE ELSE 0 END) AS AWAY_S\
        FROM baseball.Game g, baseball.HITTER_LINEUP hl\
        WHERE (g.ID = ?) AND (g.ID = hl.GAME_ID);', [req.query.game_id], function (err, rows) {
                if (err) {
                    return next(err, 'GET tables error.');
                }
                console.log(rows);
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

router.get('/home_pitcher_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('SELECT p.name, pl.WIN_LOSE_SAVE, pl.INNING_PITCHED, pl.BATS,\
        pl.EARNED_HIT, pl.EARNED_RUN, pl.ALLOWED_RUN, pl.WALK, pl.STRIKE_OUT, pl.EARNED_HOME_RUN, pl.EARNED_RUN_AVERAGE\
        FROM baseball.Game g, baseball.PITCHER_LINEUP pl, baseball.pitcher p WHERE (g.ID = ?) AND (pl.PLAYER_ID = p.PLAYER_ID)\
        AND (g.ID = pl.GAME_ID) AND (pl.IS_HOME = TRUE)\
        ORDER BY CASE\
           WHEN (pl.WIN_LOSE_SAVE IS NOT NULL) AND (pl.WIN_LOSE_SAVE = \'W\')\
           THEN\
              1\
           WHEN (pl.WIN_LOSE_SAVE IS NOT NULL) AND (pl.WIN_LOSE_SAVE = \'H\')\
           THEN\
              3\
           WHEN (pl.WIN_LOSE_SAVE IS NOT NULL) AND (pl.WIN_LOSE_SAVE = \'S\')\
           THEN\
              4\
           ELSE\
              2\
        END ASC;', [req.query.game_id], function (err, rows) {
                if (err) {
                    return next(err, 'GET tables error.');
                }
                console.log(rows);
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


router.get('/away_pitcher_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('', [req.query.game_id], function (err, rows) {
                if (err) {
                    return next(err, 'GET tables error.');
                }
                console.log(rows);
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

router.get('/home_hitter_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('', [req.query.game_id], function (err, rows) {
                if (err) {
                    return next(err, 'GET tables error.');
                }
                console.log(rows);
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

router.get('/away_hitter_record', function (req, res, next) {
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('', [req.query.game_id], function (err, rows) {
                if (err) {
                    return next(err, 'GET tables error.');
                }
                console.log(rows);
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
