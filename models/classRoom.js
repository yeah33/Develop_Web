const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
  depart: { type: Schema.Types.ObjectId, ref: 'Dept' }, //학과 참조
  room: { type: Number, required: true, trim: true } //강의실번호
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
var ClassRoom = mongoose.model('ClassRoom', schema);

module.exports = ClassRoom;
