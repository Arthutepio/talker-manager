const express = require('express');
const path = require('path');
const { readFile } = require('./utils/fs/readFile');

const filePath = path.resolve('src', 'talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const dataTalker = await readFile(filePath);
  if (!dataTalker) {
    return response.status(HTTP_OK_STATUS).json([]);
  } 
  return response.status(HTTP_OK_STATUS).json(dataTalker);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
