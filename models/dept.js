const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    campus: {type: String, required: true, trim: true}, // 캠퍼스(인문, 자연)
    univ: {type: String, required: true, trim: true}, // 대학(인문대학, 경영대학, ict대학)
    department: {type: String, required: true, trim: true}, // 학과(디콘디과, 융소과)
    manager: {type: String, required: true, trim: true}, // 담당자 이름
    contact: {type: Number, required: true, trim: true} // 담당자 연락처(전화번호)
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var Dept = mongoose.model('Dept', schema);

module.exports = Dept;
