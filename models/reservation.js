const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  classR: { type: Schema.Types.ObjectId, ref: 'ClassRoom' }, //강의실 정보
  booker: { type: Schema.Types.ObjectId, ref: 'User' }, //예약자 정보
  start: { type: Number, required: true, trim: true }, //시작시간
  end: { type: Number, required: true, trim: true }, //종료시간
  date: { type: Date, required: true, trim: true }, //예약날짜
  createdAt: {type: Date, default: Date.now} //예약한 순간의 날짜 및 시간
  // 들어있는 메모( 디비 )를 확인해 주세요
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var LikeLog = mongoose.model('LikeLog', schema);

module.exports = LikeLog;
