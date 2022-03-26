const service = require("../services/user.service");
const boom = require("@hapi/boom");

function addUser(req, res, next) {
  service
    .addUser(req.body)
    .then(() => res.json("Su cuenta se a creado con exito"))
    .catch((err) => next(boom.conflict(err)));
}

module.exports = {
  addUser,
};
