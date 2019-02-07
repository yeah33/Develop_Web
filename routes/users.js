const express = require('express');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const router = express.Router();
const catchErrors = require('../lib/async-error');
const request = require('request');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// router.post('/login', passport.authenticate('local-signin', {
//   successRedirect : '/home', // redirect to the secure profile section
//   failureRedirect : '/', // redirect back to the signup page if there is an error
//   failureFlash : true // allow flash messages
// }));


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  User.findOne({studentID: req.body.studentID}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user || user.password !== req.body.password) {
      req.flash('danger', 'Invalid username or password.');
      res.redirect('back');
    } else {
      req.session.user = user;
      req.flash('success', 'Welcome!');
      res.redirect('/home');
    }
  });
});


module.exports = router;
