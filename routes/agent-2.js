var express = require('express');
var router = express.Router();
var dbModule = require('../config/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('agent-2', { title: 'Express' });
});

router.get('/pitcher_salary_list', function(req, res, next){
  
  
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
        sum(pl.earned_run)/(sum(pl.inning_pitched)/9) AS ERA,\
        tbl1.doble AS DOBLE,\
        tbl1.triple AS TRIPLE,\
        sum(pl.EARNED_HOME_RUN) AS HR,\
        tbl1.salary AS SALARY \
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

  dbModule.withConnection(dbModule.pool, function(connection, next){
    connection.query(query, [req.query.player_id,req.query.player_id], function(err, rows){
      if(err){
        return next(err,'GET tables error');
      } else {
          return next(err, null, rows);
        }
      });
    }, function(err, message, rows){
      if(err){
        console.log(req.query.player_id);
        
        res.status(400).json({
          'code': -1,
          'msg': 'query error',
          'result': err
        });
      }
      else {
        console.log(rows);
        
        res.status(200).json({
          'code': 0,
          'msg': 'suc',
          'result': rows
        });
      }
    })
});

module.exports = router;
