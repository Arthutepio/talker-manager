const express = require('express');
const path = require('path');
const authorizationMiddleware = require('./middlewares/authorizationMiddleware');

const loginRoute = require('./routes/login.route');
const talkerRoute = require('./routes/talker.route');
const { readFile } = require('./utils/fs/readFile');

const filePath = path.resolve('src', 'talker.json');
// const talkerSearchRoute = require('./routes/talkerRouteSeach');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', authorizationMiddleware, async (req, res) => {
  const users = await readFile(filePath);
  const { q } = req.query;
  const resultSearch = users.filter((person) => person.name.includes(q));
  res.status(200).json(resultSearch);
});

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);
// app.use('/talker/search', talkerSearchRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;