const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const usersPath = path.join(__dirname, 'data', 'users.json');
const cardsPath = path.join(__dirname, 'data', 'card.json');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const readJsonFile = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    try {
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
});

Promise.all([
  readJsonFile(usersPath),
  readJsonFile(cardsPath),
])
  .then(([users, cards]) => {
    app.locals.users = users;
    app.locals.cards = cards;

    app.use('/users', usersRouter);
    app.use('/card', cardsRouter);
    app.use('/cards', cardsRouter);

    app.use((req, res) => {
      res.status(404).json({
        message: 'Requested resource not found',
      });
    });

    app.use((err, req, res, next) => {
      if (res.headersSent) {
        next(err);
        return;
      }

      res.status(500).json({
        message: 'An error has occurred on the server',
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al leer los archivos de datos:', error);
    process.exitCode = 1;
  });
