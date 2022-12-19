const validateRateMiddleware = (req, res) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate !== Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

module.exports = validateRateMiddleware;