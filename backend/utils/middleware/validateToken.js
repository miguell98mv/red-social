const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const boom = require("@hapi/boom");

function validarToken(req, res, next) {
  if (req.cookies.token) {
    return next();
  } else {
    next(boom.unauthorized("No hay token"));
  }
}

module.exports = validarToken;
