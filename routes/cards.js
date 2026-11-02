const router = require('express').Router();

router.get('/', (req, res) => {
  res.json(req.app.locals.cards);
});

router.get('/:cardId', (req, res) => {
  const card = req.app.locals.cards.find(
    (item) => item._id === req.params.cardId,
  );

  if (!card) {
    res.status(404).json({ message: 'Card ID not found' });
    return;
  }

  res.json(card);
});

module.exports = router;
