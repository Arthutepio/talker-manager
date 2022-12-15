const express = require('express');
const { validateLogin } = require('../middlewares/validateLogin.middleware.js');
const { generateId } = require('../utils/identifiers/generateId');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, (_req, res) => {
  res.status(200).json({ token: generateId() });
});

module.exports = loginRoute;