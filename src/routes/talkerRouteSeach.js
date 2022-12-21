// const express = require('express');
// const path = require('path');

// const { readFile } = require('../utils/fs/readFile');
// const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

// const filePath = path.resolve('src', 'talker.json');

// const talkerSearchRoute = express.Router();

// talkerSearchRoute.get('/', authorizationMiddleware, async (req, res) => {
//   const users = await readFile(filePath);
//   const { q } = req.query;
//   const resultSearch = users.filter((person) => person.name.includes(q));
//   res.status(200).json(resultSearch);
// });

//   module.exports = talkerSearchRoute;
