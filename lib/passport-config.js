// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    User.findById(id, (err, user) => {
      done(null, user); // 여기의 user가 req.user가 됨
    });
  });

  passport.use('local-signin', new LocalStrategy({ // local 전략을 세움
    usernameField: 'stuendID',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: true,
  }, (req, studentID, password, done) => {
    console.log("여기 1");
    User.findOne({ studentID: studentID }, (findError, user) => {
      console.log("여기 2");
      if (findError) return done(findError, console.log("server error?")); // 서버 에러 처리
      if (!user) return done(null, false, req.flash('danger', 'Invalid studentID')); // 임의 에러 처리
      return user.comparePassword(password, (passError, isMatch) => {
        if (isMatch) {
          console.log("성공");
          return done(null, user, req.flash('success', 'Welcome!')); //검증 성공
        }
        console.log("실패");
        return done(null, false, req.flash('danger', 'Invalid studentID or password')); //에러
      });
    });
  }));
};

