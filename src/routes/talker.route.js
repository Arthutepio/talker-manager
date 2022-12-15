const express = require('express');

const talkerRoute = express.Router();

talkerRoute.post('/', (req, res) => {
  res.status(200).json({ message: 'rota talker ok' });
});

module.exports = talkerRoute;