const express = require('express');
const path = require('path');
const talker = require('../talker.json');
const { readFile } = require('../utils/fs/readFile');
const { writeFile } = require('../utils/fs/writeFile');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const validateNameMiddleware = require('../middlewares/valitdateNameMiddleware');
const validateAgeMiddleware = require('../middlewares/validateAgeMiddleware');
const validateTalkMiddleware = require('../middlewares/validateTalkMiddliware');
const validateWatchedAtMiddleware = require('../middlewares/validateWatchedAtMiddleware');
const validateRateMiddleware = require('../middlewares/validateRateMiddleware');

const talkerRoute = express.Router();

const filePath = path.resolve('src', 'talker.json');

talkerRoute.get('/', async (_req, res) => {
  const dataTalker = await readFile(filePath, 'utf-8');
  if (!dataTalker) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(dataTalker);
});

talkerRoute.get('/:id', async (req, res) => {
  try {
    const dataTalker = await readFile(filePath, 'utf-8');
    const result = dataTalker.find(({ id }) => id === Number(req.params.id));
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    console.log(error.message);
  }
});

talkerRoute.post('/', authorizationMiddleware,
  validateNameMiddleware, validateAgeMiddleware,
  validateTalkMiddleware, validateWatchedAtMiddleware, 
  validateRateMiddleware, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  // const id = generateId();
  // console.log(id);
  const newUser = {
    id: talker.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const user = await readFile(filePath, 'utf-8');
  console.log(user);
  user.push(newUser);
  await writeFile(user, filePath);
  res.status(201).json(newUser); 
});

module.exports = talkerRoute;