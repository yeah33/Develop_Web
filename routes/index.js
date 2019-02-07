var express = require('express');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/');
  }
}


/* GET home page. */
// router.get('/', needAuth, function(req, res, next) {
//   res.render('index');
// });

router.get('/', function(req, res, next) {
  res.render('index');
});

// router.get('/signout', (req, res) => {
//   req.logout();
//   req.flash('success', 'Successfully signed out');
//   res.redirect('/');
// });
module.exports = router;
