const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6af1d9115ecffda05a57deca',
  };

  next();
});

app.use('/users', usersRouter);
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

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/aroundb');
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
