const express = require('express');
const path = require('path');
const { generateId } = require('../utils/identifiers/generateId');
const { readFile } = require('../utils/fs/readFile');
const { writeFile } = require('../utils/fs/writeFile');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const validateNameMiddleware = require('../middlewares/valitdateNameMiddleware');
const validateAgeMiddleware = require('../middlewares/validateAgeMeddleware');
const validateTalkMiddleware = require('../middlewares/validateTalkMeddleware');
const validateWatchedAtMeddleware = require('../middlewares/validateWatchedAtMeddleware');
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
  validateTalkMiddleware, validateWatchedAtMeddleware, validateRateMiddleware, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  // const id = generateId();
  // console.log(id);
  const newUser = {
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
  res.status(200).json({ token: generateId() });
});

module.exports = talkerRoute;