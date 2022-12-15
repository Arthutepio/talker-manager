const express = require('express');
const path = require('path');
const { readFile } = require('./utils/fs/readFile');

const loginRoute = require('./routes/login.route');
const talkerRoute = require('./routes/talker.route');

const filePath = path.resolve('src', 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dataTalker = await readFile(filePath);
  if (!dataTalker) {
    return res.status(HTTP_OK_STATUS).json([]);
  } 
  return res.status(HTTP_OK_STATUS).json(dataTalker);
});

app.get('/talker/:id', async (req, res) => {
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

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;