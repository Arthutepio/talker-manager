const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const verify = regex.test(email);
  console.log(verify, password);

  if (!verify || password.length < 6) {
    return res.status(200).json({ message: 'isira email e senha' });
  }
  next();
 };

module.exports = { validateLogin };