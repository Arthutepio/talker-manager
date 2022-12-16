const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
};

module.exports = authorizationMiddleware;