const boom = require("@hapi/boom");

function boomThrow(req, res, next) {
  next(boom.notFound(new Error("Error 404")));
}

function catchError(err, req, res, next) {
  if (!err.isBoom) err = boom.badImplementation(err);
  if (process.env.NODE_ENV !== "development")
    return res.status(err.output.statusCode).json(err.output);
  return res.status(err.output.statusCode).json({ stack: err.stack, ...err });
}

module.exports = {
  boomThrow,
  catchError,
};
