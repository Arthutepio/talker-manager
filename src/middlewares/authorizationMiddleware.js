const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'não autorizado' });
  }
  next();
};

module.exports = authorizationMiddleware;