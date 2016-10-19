var express = require('express');
var router = express.Router();
var TClass = require('../application/Models/ClassModel');
/* GET home page. */
router.get('/', function(req, res, next) {
    TClass.findAndCountAll({}).then(function(result) {
        // console.log(result.rows);
        res.render('index', { title: 'Littel Flower', 'data': result.rows });
    });
});

module.exports = router;