const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const createCard = (req, res) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card data' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid card ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(500).send({
        message: 'An error has occurred on the server',
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
