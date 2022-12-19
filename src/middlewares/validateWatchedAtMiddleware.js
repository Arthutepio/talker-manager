const validateWatchedAtMiddleware = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const date = regex.test(watchedAt);
  // console.log(date);
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!date) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchedAtMiddleware;