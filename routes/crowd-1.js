var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('crowd-1', { title: 'Express' });
});

//teamID and oppID (opponents)
router.get('/versus_this_team', function(req, res, next) {
    var sql_query = "SELECT tbl1.gid as gameID, tbl1.HOME_ID as homeID, tbl1.AWAY_ID as awayID, t1.name AS HOME_TEAM, SUM(CASE WHEN hl.IS_HOME = TRUE THEN hl.RUN_SCORE ELSE 0 END) AS HOME_S,\
    t2.name AS AWAY_TEAM, SUM(CASE WHEN hl.IS_HOME = FALSE THEN hl.RUN_SCORE ELSE 0 END) AS AWAY_S, DATE_FORMAT(tbl1.GDATE, '%d/%m/%Y') AS DATE \
    FROM (SELECT g.ID AS GID, g.DATE AS GDATE, g.home_id AS HOME_ID, g.away_id AS AWAY_ID \
        FROM baseball.game g WHERE    ((g.home_id = ?) AND (g.away_id = ?)) OR ((g.home_id = ?) AND (g.away_id = ?))) AS tbl1 \
        INNER JOIN baseball.hitter_lineup hl ON tbl1.GID = hl.GAME_ID,baseball.team t1, baseball.team t2 \
            WHERE (t1.id = tbl1.home_id and t2.id = tbl1.away_id) \
    GROUP BY tbl1.GID \
    ORDER BY DATE DESC;";
    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.teamID, req.query.oppID, req.query.oppID, req.query.teamID], function(err, rows) {
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
router.get('/recent_record', function(req, res, next) {
    var sql_query = "SELECT tbl1.GID as gameID, tbl1.HOME_TEAM AS homeID, tbl1.AWAY_TEAM AS awayID, DATE_FORMAT(GDATE, '%d/%m/%Y') AS GADATE, t1.name AS HOME, SUM(CASE WHEN hl.IS_HOME = TRUE THEN hl.RUN_SCORE ELSE 0 END) AS HOME_S,\
     t2.name AS AWAY, SUM(CASE WHEN hl.IS_HOME = FALSE THEN hl.RUN_SCORE ELSE 0 END) AS AWAY_S \
     FROM( SELECT g.id as GID, g.home_id as HOME_TEAM, g.away_id as AWAY_TEAM, g.DATE as GDATE FROM game g \
        WHERE ((g.home_id = ?) or (g.away_id = ?)) LIMIT 5) as tbl1 \
        INNER JOIN hitter_lineup hl ON tbl1.GID = hl.GAME_ID,baseball.team t1, baseball.team t2 \
    WHERE (t1.id = tbl1.HOME_TEAM and t2.id = tbl1.AWAY_TEAM) GROUP BY GID;";
    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.teamID, req.query.teamID], function(err, rows) {
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