const mongoose = require('mongoose');

const URL_REGEX = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_REGEX.test(value),
      message: 'Invalid avatar URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
