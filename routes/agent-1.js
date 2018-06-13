var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('agent-1');
});


router.get('/team_pitcher_record', function(req, res, next) {
    var sql_query = "SELECT	p1.player_id as pid,\
                    p1.name,\
                    sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'W') THEN 1 ELSE 0 END) AS WIN,\
                    sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'L') THEN 1 ELSE 0 END) AS LOSE,\
                    sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'S') THEN 1 ELSE 0 END) AS SAVE,\
                    sum(CASE WHEN (p1.WIN_LOSE_SAVE = 'H') THEN 1 ELSE 0 END) AS HOLD,\
                    sum(p1.earned_run) AS ER,\
                    sum(p1.inning_pitched) AS IP,\
                    sum(case when (p1.is_home = FALSE) AND (p1.inning_pitched >= 9) then 1 else 0 end) +sum(case when (p1.is_home = TRUE) AND (p1.inning_pitched >= 8) then 1 else 0 end) AS CG,\
                    p1.hit AS H,\
                    p1.number_of_pitching AS NP, \
                    ROUND(sum(p1.earned_run)/(sum(p1.inning_pitched)/9),2) AS ERA, \
                    p1.doble AS DOBLE,\
                    p1.triple AS TRIPLE,\
                    count(p1.player_id) as G,\
                    concat(p1.salary ,'만원')AS SALARY \
                  FROM	(SELECT	* \
                  FROM	pitcher p natural join pitcher_lineup pl) as p1 \
                  WHERE	p1.team_id =? \
                  GROUP BY p1.player_id;";
    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.teamID], function(err, rows) {
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

router.get('/team_hitter_record', function(req, res, next) {
    var sql_query = "SELECT 	h.player_id as pid, h.name AS NAME, h.plate_appearance AS PA,\
    h.at_bat AS AB,\
    h.doble AS DOBLE,\
    h.triple AS TRIPLE, \
    h.stolen_base AS SB, \
    h.caught_stealing AS CS, \
    h.sacrifice_hit AS SH, \
    h.sacrifice_fly AS SF, \
    concat(h.salary , '만원') AS SALARY, \
    convert((sum(CASE WHEN hl.hit IS NOT NULL THEN hl.hit ELSE 0 END) / (CASE WHEN h.at_bat IS NOT NULL THEN h.at_bat ELSE 0 END)), decimal(4,3) ) AS AVG \
FROM	hitter h, hitter_lineup hl \
WHERE	(h.player_id = hl.player_id) AND (h.team_id = ?) \
GROUP BY h.player_id \
ORDER BY h.name;"
    dbModule.withConnection(dbModule.pool, function(connection, next) {
        connection.query(sql_query, [req.query.teamID], function(err, rows) {
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
    });
});
module.exports = router;