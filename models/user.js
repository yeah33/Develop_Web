const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  studentID: {type: String, required: true, trim: true},
  password: {type: String},
  depart: { type: Schema.Types.ObjectId, ref: 'Dept' },
  grade: {type: String, default: 'normal'}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

// 아래를 사용하면 해쉬맵을 이용해서 비밀번호가 변경됨
// schema.methods.generateHash = function(password) {
//   return bcrypt.hash(password, 10); // return Promise
// };

// schema.methods.validatePassword = function(password) {
//   return bcrypt.compare(password, this.password); // return Promise
// };

schema.methods.comparePassword = function(inputPassword, cb) {
  if (inputPassword === this.password) {
    alert("asdf");
    cb(null, true);
  } else {
    alert("sdfa");
    cb('error');
  }
};

var User = mongoose.model('User', schema);

module.exports = User;