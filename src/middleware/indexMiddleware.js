const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;

    if (req.user.rol_id !== 1) {
      return res.status(403).send('Access Denied');
    }

    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

const checkAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null; // Si no hay token, establecer user como null
    return next(); // Continuar con la ejecución de la siguiente función
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      id: decoded.id,
      nombre: decoded.nombre,
      rol_id: decoded.rol_id
    };
    next(); // Continuar con la ejecución de la siguiente función
  } catch (error) {
    console.error(error);
    res.status(401).send("Token inválido");
  }
};

module.exports = { checkAdmin, checkAuthenticated , verifyToken};
