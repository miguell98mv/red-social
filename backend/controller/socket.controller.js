const service = require("../services/socket.service");
const boom = require("@hapi/boom");
const myUser = require("../model/myUser.model");
require("../utils/middleware/strategyLocal");

function addComentarios(req, res, next) {
  service
    .addComentarios(req.body, req.cookies.token)
    .then((result) => {
      let io = req.app.get("socketio");
      io.emit(`${req.body.idPost}-comentario`, result);
      io.emit(`${req.body.idUser}-myNotificaciones`, "");
      res.json();
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function getComentarios(req, res, next) {
  service
    .getComentarios(req.params)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function addLike(req, res, next) {
  service
    .addLike(req.body, req.cookies.token)
    .then((result) => {
      myUser
        .getLikes(req.body.idPost)
        .then((data) => {
          let io = req.app.get("socketio");
          io.emit(`${req.body.idPost}-likes`, data);
          if (result.length) {
            io.emit(`${req.body.idUser}-myNotificaciones`, "");
          }

          res.json(result);
        })
        .catch((err) => {
          next(boom.conflict(err));
        });
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

function inactivo(req, res, next) {
  service
    .inactivo(req.cookies.token)
    .then((result) => {
      let io = req.app.get("socketio");
      result.forEach((e) => {
        service
          .getAmigosActivos(e.id)
          .then((data) => {
            io.emit(`${e.id}-amigosActivos`, data);
          })
          .catch((err) => next(boom.conflict(err)));
      });
      res.clearCookie("token");
      res.json(result);
    })
    .catch((err) => {
      next(boom.conflict(err));
    });
}

module.exports = {
  addComentarios,
  getComentarios,
  addLike,
  inactivo,
};
