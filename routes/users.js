const router = require('express').Router();

router.get('/', (req, res) => {
  res.json(req.app.locals.users);
});

router.get('/:userId', (req, res) => {
  const user = req.app.locals.users.find(
    (item) => item._id === req.params.userId,
  );

  if (!user) {
    res.status(404).json({ message: 'User ID not found' });
    return;
  }

  res.json(user);
});

module.exports = router;
