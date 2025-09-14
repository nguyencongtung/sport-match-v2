const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    sports: [{ type: String }],
    skillLevel: { type: String },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    availability: [{ type: String }], // e.g., ['Monday Evening', 'Weekend Mornings']
    profilePicture: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
