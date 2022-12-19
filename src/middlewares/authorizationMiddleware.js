const authorizationMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
  // console.log('aqui', authorization);
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (!authorization) {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
};

module.exports = authorizationMiddleware;