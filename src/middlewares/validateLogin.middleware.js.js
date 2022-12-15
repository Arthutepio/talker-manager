const validateEmail = (req, res) => {
  try {
    const { email } = req.body;
    const regex = /\S+@\S+\.\S+/;
    const verify = regex.test(email);

    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!verify) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
 };

 const validatePassword = (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
 };

const validateLogin = (req, res, next) => {
  validateEmail(req, res);
  validatePassword(req, res);
  next();
};

module.exports = { validateLogin };