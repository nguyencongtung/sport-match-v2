const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SwipeSchema = new Schema({
  swiper: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  swiped: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  direction: { type: String, enum: ['left', 'right'], required: true }, // 'left' for dislike, 'right' for like
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Swipe', SwipeSchema);
