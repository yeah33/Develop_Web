const express = require('express');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const router = express.Router();
const catchErrors = require('../lib/async-error');
const request = require('request');
const passport = require('passport');
const classroom = require('../models/classroom');

function needAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/login');
  }
}


/* GET home page. */
router.get('/', catchErrors(async (req, res, next) => {
  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {roomInfo: {'$regex': term, '$options': 'i'}},  
      {booker: {'$regex': term, '$options': 'i'}},  
      {start: {'$regex': term, '$options': 'i' }},  
      {end: {'$regex': term, '$options': 'i'}}, 
      {date: {'$regex': term, '$options': 'i' }},  
      {createdAt: {'$regex': term, '$options': 'i'}}
    ]};
  }

  res.render('reservation');
}));

router.put('/:id', catchErrors(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    req.flash('danger', 'Not exist');
    return res.redirect('back');
  }
  reservation.date = req.body.date;
  reservation.roomInfo = req.body.q;

  await reservation.save();
  req.flash('success', 'Successfully updated');
  res.redirect('/index');
}));

router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.session.user;
  var reservation = new Reservation({
    date: req.body.date,
    roomInfo: req.body.q
  });
  await reservation.save();
  req.flash('success', 'Successfully posted');
  res.redirect('/upload');
}));


router.get('/suggest', (req, res, next) => {
  let q = User.departID-req.query ? User.departID-req.query.toLowerCase() : '';

  if (!q) {
    return res.json([]);
  }

  //user.departID 의 내용이 classroom.deptID에 포함된 deptID만 모아서 배열생성
  //JSON으로 결과를 return
  let p = 
  res.json(classroom.filter(deptID => {
    return deptID.toLowerCase().indexOf(q) > -1;
  }));

  //앞에서 걸러낸 deptID에 해당하는 roomnum을 모아서 배열생성
  //JSON으로 결과를 return
  res.json(classroom.filter(roomInfo => {
    return roomInfo.toLowerCase().indexOf(p) > -1;
  }));
  
});



module.exports = router;






