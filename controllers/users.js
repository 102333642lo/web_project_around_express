const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const createUser = (req, res) => {
  User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user data' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user data' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid avatar URL' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
