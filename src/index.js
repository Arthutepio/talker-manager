const express = require('express');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/talker', (req, res) => {
  res.status(200).json()
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
