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
  const dataTalker = await readFile(filePath);
  if (!dataTalker) {
    return res.status(200).json([]);
  } 
  return res.status(200).json(dataTalker);
});

talkerRoute.get('/:id', async (req, res) => {
  try {
    const dataTalker = await readFile(filePath);
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
  const newUser = {
    id: talker[talker.length - 1].id + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  const user = await readFile(filePath);
  user.push(newUser);
  await writeFile(user, filePath);
  res.status(201).json(newUser); 
});

talkerRoute.put('/:id', authorizationMiddleware,
validateNameMiddleware, validateAgeMiddleware,
validateTalkMiddleware, validateWatchedAtMiddleware,
validateRateMiddleware, async (req, res) => {
  const users = await readFile(filePath);
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const index = users.findIndex((person) => person.id === Number(id)); 
  const editedUser = {
    id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  users[index] = editedUser;
  await writeFile(users, filePath);
  console.log(users);
  res.status(200).json(editedUser);
});

talkerRoute.delete('/:id', authorizationMiddleware,
 async (req, res) => {
  const users = await readFile(filePath);
  const { id } = req.params;
  const user = users.filter((person) => person.id !== Number(id));
  await writeFile(user, filePath);
  res.status(204).json();
});

module.exports = talkerRoute;