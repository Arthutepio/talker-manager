const express = require('express');

const loginRoute = require('./routes/login.route');
const talkerRoute = require('./routes/talker.route');
const talkerSearchRoute = require('./routes/talkerRouteSearch');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/', loginRoute);
app.use('/', talkerSearchRoute);
app.use('/', talkerRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;