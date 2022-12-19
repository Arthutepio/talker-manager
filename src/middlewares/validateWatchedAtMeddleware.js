const talker = require('../talker.json');

const validateWatchedAtMeddleware = (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const regex = /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/;
  const date = regex.test(watchedAt);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!date) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return res.status(201).json({
    id: talker.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
   });
};

module.exports = validateWatchedAtMeddleware;