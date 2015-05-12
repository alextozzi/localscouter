var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Local Scouter' });
});

router.get('/main', function(req, res , next){
    res.render('main',{ title: 'Main'})
});

router.get('/top10region', function(req, res , next){
    res.render('top10region',{ title: 'Top 10 Region'})
});

router.get('/top10Overal', function(req, res , next){
    res.render('top10Overal',{ title: 'Top 10 Overal'})
});


router.get('/uploadfoto', function(req, res , next){
    res.render('uploadfoto',{ title: 'Upload a foto'})
});

module.exports = router;
