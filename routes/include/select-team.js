var express = require('express');
var router = express.Router();
var dbModule = require('../../config/db.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    var getRows;
    dbModule.withConnection(dbModule.pool, function (connection, next) {
        connection.query('select name, id from team', function (err, rows) {
            if (err) {
                return next(err, 'GET select team error.');
            }
            getRows = rows;
            return next(err);
        });
    }, function (err, message) {
        console.log(getRows);
        if (err) {
            res.status(400).json({
                'code': -1,
                'msg': 'query error',
                'result': err
            });
        } else {
            res.status(200).send(getRows);
        }
    });
});

module.exports = router;